"use client";

import { useState, FormEvent } from "react";
import { DocumentFormData, DocumentItem, DocumentType, DOCUMENT_CONFIG } from "@/types/invoice";

function generateId(): string {
    return Math.random().toString(36).substring(2, 11);
}

function generateDocumentNumber(prefix: string): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const random = Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, "0");
    return `${prefix}-${year}${month}-${random}`;
}

interface DocumentFormProps {
    documentType: DocumentType;
}

export default function DocumentForm({ documentType }: DocumentFormProps) {
    const config = DOCUMENT_CONFIG[documentType];

    const [formData, setFormData] = useState<DocumentFormData>({
        // Business
        businessName: "",
        businessAddress: "",
        businessEmail: "",
        businessPhone: "",
        taxId: "",

        // Customer
        customerName: "",
        customerEmail: "",
        customerAddress: "",

        // Details
        documentNumber: generateDocumentNumber(config.prefix),
        issueDate: new Date().toISOString().split("T")[0],
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        currency: "USD",

        // Items
        items: [{ id: generateId(), description: "", quantity: 1, unitPrice: 0 }],

        // Financial
        taxPercent: 0,
        discount: 0,

        // Other
        paymentTerms: "",
        notes: "",
        signature: "",
        paymentMethod: "Cash",

        // Quotation-specific
        expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        validityPeriod: "30 days",
        scopeLimitations: "",

        // Proforma-specific
        expectedShipmentDate: "",
        shippingCost: 0,
        bankDetails: "",
        termsOfSale: "",
        deliveryTerms: "",

        documentType: documentType,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleInputChange = (field: keyof DocumentFormData, value: string | number) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    };

    const handleItemChange = (
        id: string,
        field: keyof DocumentItem,
        value: string | number
    ) => {
        setFormData((prev) => ({
            ...prev,
            items: prev.items.map((item) =>
                item.id === id ? { ...item, [field]: value } : item
            ),
        }));
    };

    const addItem = () => {
        setFormData((prev) => ({
            ...prev,
            items: [
                ...prev.items,
                { id: generateId(), description: "", quantity: 1, unitPrice: 0 },
            ],
        }));
    };

    const removeItem = (id: string) => {
        if (formData.items.length <= 1) return;
        setFormData((prev) => ({
            ...prev,
            items: prev.items.filter((item) => item.id !== id),
        }));
    };

    const calculateSubtotal = (): number => {
        return formData.items.reduce(
            (sum, item) => sum + item.quantity * item.unitPrice,
            0
        );
    };

    const calculateTax = (): number => {
        return (calculateSubtotal() * formData.taxPercent) / 100;
    };

    const calculateTotal = (): number => {
        const subtotal = calculateSubtotal();
        const tax = calculateTax();
        const discount = formData.discount || 0;
        const shipping = (documentType === "proforma" && formData.shippingCost) ? formData.shippingCost : 0;
        return subtotal + tax - discount + shipping;
    };

    const formatCurrency = (amount: number): string => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: formData.currency || "USD",
        }).format(amount);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors({});

        // --- Client-side validation ---
        const validationErrors: Record<string, string> = {};

        if (!formData.customerName.trim()) {
            validationErrors.customerName = "Customer name is required";
        }
        if (!formData.customerEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customerEmail)) {
            validationErrors.customerEmail = "Valid customer email is required";
        }
        if (!formData.documentNumber.trim()) {
            validationErrors.documentNumber = "Document number is required";
        }

        // Business info required for invoice, receipt, quotation & proforma
        if (documentType === "invoice" || documentType === "receipt" || documentType === "quotation" || documentType === "proforma") {
            if (!formData.businessName.trim()) validationErrors.businessName = "Business name is required";
            if (!formData.businessPhone.trim()) validationErrors.businessPhone = "Business phone is required";
        }
        if (documentType === "invoice" || documentType === "receipt" || documentType === "proforma") {
            if (!formData.businessAddress.trim()) validationErrors.businessAddress = "Business address is required";
        }

        if (documentType === "invoice") {
            if (!formData.customerAddress.trim()) validationErrors.customerAddress = "Customer address is required";
            if (!formData.dueDate) validationErrors.dueDate = "Due date is required";
            if (formData.businessEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.businessEmail)) {
                validationErrors.businessEmail = "Valid business email is required";
            }
        }

        // Quotation-specific validation
        if (documentType === "quotation") {
            if (!formData.expiryDate) validationErrors.expiryDate = "Expiry date is required";
        }

        // Proforma-specific validation
        if (documentType === "proforma") {
            if (!formData.taxId?.trim()) validationErrors.taxId = "Tax ID is required for proforma invoices";
            if (!formData.customerAddress.trim()) validationErrors.customerAddress = "Customer address is required";
        }

        // Item validation
        formData.items.forEach((item, index) => {
            if (!item.description.trim()) {
                validationErrors[`items.${index}.description`] = "Description is required";
            }
            if (item.quantity <= 0) {
                validationErrors[`items.${index}.quantity`] = "Quantity must be > 0";
            }
            if (item.unitPrice < 0) {
                validationErrors[`items.${index}.unitPrice`] = "Price cannot be negative";
            }
        });

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setIsSubmitting(false);
            return;
        }
        // --- End client-side validation ---

        try {
            const response = await fetch("/api/invoice/generate-pdf", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                let errorData;
                try {
                    errorData = await response.json();
                } catch {
                    setErrors({ general: `Server error (${response.statusText || response.status}). Please try again.` });
                    return;
                }

                // Use console.warn instead of console.error to avoid triggering
                // the Next.js dev error overlay for expected validation responses
                if (process.env.NODE_ENV === "development") {
                    console.warn("Server validation response:", errorData);
                }

                if (errorData && errorData.errors && Array.isArray(errorData.errors) && errorData.errors.length > 0) {
                    const newErrors: Record<string, string> = {};
                    errorData.errors.forEach(
                        (err: { field: string; message: string }) => {
                            newErrors[err.field] = err.message;
                        }
                    );
                    setErrors(newErrors);
                } else if (errorData && errorData.error) {
                    // Handle single error field (like rate limit)
                    setErrors({ general: errorData.error });
                } else {
                    setErrors({ general: "An unexpected error occurred. Please check your inputs and try again." });
                }
                return;
            }

            // Download the PDF
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `${documentType}-${formData.documentNumber}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

            // Generate new document number
            setFormData((prev) => ({
                ...prev,
                documentNumber: generateDocumentNumber(config.prefix),
            }));
        } catch (error) {
            console.error("Failed to generate document:", error);
            setErrors({ general: "Failed to generate document. Please try again." });
        } finally {
            setIsSubmitting(false);
        }
    };

    const primaryColorClass = {
        invoice: "from-indigo-600 to-violet-600",
        receipt: "from-emerald-500 to-teal-600",
        quotation: "from-amber-500 to-orange-600",
        proforma: "from-fuchsia-600 to-pink-600",
    }[documentType];

    const shadowClass = {
        invoice: "shadow-[0_10px_20px_-10px_#4f46e580] hover:shadow-[0_20px_25px_-5px_#4f46e566]",
        receipt: "shadow-[0_10px_20px_-10px_#10b98180] hover:shadow-[0_20px_25px_-5px_#10b98166]",
        quotation: "shadow-[0_10px_20px_-10px_#f59e0b80] hover:shadow-[0_20px_25px_-5px_#f59e0b66]",
        proforma: "shadow-[0_10px_20px_-10px_#db277780] hover:shadow-[0_20px_25px_-5px_#db277766]",
    }[documentType];

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {errors.general && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg animate-in fade-in slide-in-from-top-2">
                    {errors.general}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* section: Business Info (All types) */}
                {(documentType === "invoice" || documentType === "receipt" || documentType === "quotation" || documentType === "proforma") && (
                    <div className="glass-card">
                        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                            {documentType === "proforma" ? "Business / Legal Information" : "Business Information"}
                        </h2>
                        <div className="space-y-4">
                            <Input label={documentType === "proforma" ? "Full Legal Business Name" : "Business Name"} id="businessName" value={formData.businessName} onChange={(v) => handleInputChange("businessName", v)} error={errors.businessName} />
                            <Input label="Business Phone" id="businessPhone" value={formData.businessPhone} onChange={(v) => handleInputChange("businessPhone", v)} error={errors.businessPhone} />
                            <Input label="Business Email" id="businessEmail" type="email" value={formData.businessEmail} onChange={(v) => handleInputChange("businessEmail", v)} error={errors.businessEmail} />
                            {(documentType === "invoice" || documentType === "receipt" || documentType === "proforma") && (
                                <Input label="Business Address" id="businessAddress" value={formData.businessAddress} onChange={(v) => handleInputChange("businessAddress", v)} error={errors.businessAddress} />
                            )}
                            {(documentType === "invoice" || documentType === "proforma") && (
                                <Input label={documentType === "proforma" ? "Tax ID (Required)" : "Tax ID (Optional)"} id="taxId" value={formData.taxId || ""} onChange={(v) => handleInputChange("taxId", v)} error={errors.taxId} />
                            )}
                        </div>
                    </div>
                )}

                {/* section: Client / Customer Info */}
                <div className="glass-card">
                    <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                        {documentType === "quotation" ? "Client Information" : "Customer Information"}
                    </h2>
                    <div className="space-y-4">
                        <Input label={documentType === "quotation" ? "Client Name" : "Customer Name"} id="customerName" value={formData.customerName} onChange={(v) => handleInputChange("customerName", v)} error={errors.customerName} />
                        {(documentType === "invoice" || documentType === "proforma") && (
                            <Input label="Customer Address" id="customerAddress" value={formData.customerAddress} onChange={(v) => handleInputChange("customerAddress", v)} error={errors.customerAddress} />
                        )}
                        <Input label={documentType === "quotation" ? "Client Email" : "Customer Email"} id="customerEmail" type="email" value={formData.customerEmail} onChange={(v) => handleInputChange("customerEmail", v)} error={errors.customerEmail} />
                    </div>
                </div>
            </div>

            {/* section: Details */}
            <div className="glass-card">
                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    Document Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Input label={documentType === "receipt" ? "Receipt Number" : `${config.title} Number`} id="documentNumber" value={formData.documentNumber} onChange={(v) => handleInputChange("documentNumber", v)} error={errors.documentNumber} />
                    <Input label={documentType === "receipt" ? "Payment Date" : "Issue Date"} id="issueDate" type="date" value={formData.issueDate} onChange={(v) => handleInputChange("issueDate", v)} error={errors.issueDate} />

                    {documentType === "invoice" && <Input label="Due Date" id="dueDate" type="date" value={formData.dueDate} onChange={(v) => handleInputChange("dueDate", v)} error={errors.dueDate} />}

                    {documentType === "quotation" && <Input label="Expiry Date" id="expiryDate" type="date" value={formData.expiryDate || ""} onChange={(v) => handleInputChange("expiryDate", v)} error={errors.expiryDate} />}

                    {documentType === "proforma" && <Input label="Expected Shipment Date (Optional)" id="expectedShipmentDate" type="date" value={formData.expectedShipmentDate || ""} onChange={(v) => handleInputChange("expectedShipmentDate", v)} />}

                    {documentType === "receipt" && (
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Payment Method</label>
                            <select
                                value={formData.paymentMethod}
                                onChange={(e) => handleInputChange("paymentMethod", e.target.value)}
                                className="input-field"
                            >
                                <option value="Cash">Cash</option>
                                <option value="Card">Card</option>
                                <option value="Bank Transfer">Bank Transfer</option>
                                <option value="UPI">UPI</option>
                                <option value="Cheque">Cheque</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Currency</label>
                        <select
                            value={formData.currency}
                            onChange={(e) => handleInputChange("currency", e.target.value)}
                            className="input-field"
                        >
                            <option value="USD">USD ($)</option>
                            <option value="EUR">EUR (€)</option>
                            <option value="GBP">GBP (£)</option>
                            <option value="CAD">CAD ($)</option>
                            <option value="AUD">AUD ($)</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* section: Items */}
            <div className="glass-card">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                        <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
                        Items
                    </h2>
                    <button type="button" onClick={addItem} className="text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
                        + Add Item
                    </button>
                </div>
                {errors.items && <p className="mb-4 text-sm text-red-600">{errors.items}</p>}

                <div className="space-y-4">
                    {formData.items.map((item, index) => (
                        <div key={item.id} className="bg-slate-50/50 rounded-xl p-4 border border-slate-200/60 flex gap-4 items-start group hover:border-indigo-200 transition-colors">
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-4">
                                <div className="md:col-span-6">
                                    <Input
                                        label="Description"
                                        id={`desc-${item.id}`}
                                        value={item.description}
                                        onChange={(v) => handleItemChange(item.id, "description", v)}
                                        placeholder="Item description"
                                        noLabel
                                        error={errors[`items.${index}.description`]}
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <Input
                                        label="Qty"
                                        id={`qty-${item.id}`}
                                        type="number"
                                        value={item.quantity}
                                        onChange={(v) => handleItemChange(item.id, "quantity", Number(v))}
                                        noLabel
                                        error={errors[`items.${index}.quantity`]}
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <Input
                                        label="Price"
                                        id={`price-${item.id}`}
                                        type="number"
                                        value={item.unitPrice}
                                        onChange={(v) => handleItemChange(item.id, "unitPrice", Number(v))}
                                        noLabel
                                        error={errors[`items.${index}.unitPrice`]}
                                    />
                                </div>
                                <div className="md:col-span-2 py-3.5 text-right font-semibold text-slate-700">
                                    {formatCurrency(item.quantity * item.unitPrice)}
                                </div>
                            </div>
                            <button type="button" onClick={() => removeItem(item.id)} className="text-slate-400 hover:text-red-500 mt-3 transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* section: Summary & Financials */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {documentType === "invoice" ? (
                    <div className="glass-card">
                        <h2 className="text-xl font-bold text-slate-900 mb-6">Additional Info</h2>
                        <div className="space-y-4">
                            <Input label="Payment Terms" id="paymentTerms" value={formData.paymentTerms || ""} onChange={(v) => handleInputChange("paymentTerms", v)} placeholder="e.g. Net 30" />
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Notes</label>
                                <textarea
                                    value={formData.notes || ""}
                                    onChange={(e) => handleInputChange("notes", e.target.value)}
                                    className="input-field min-h-[100px]"
                                    placeholder="Additional notes for the customer..."
                                />
                            </div>
                            <Input label="Signature (Typed Name)" id="signature" value={formData.signature || ""} onChange={(v) => handleInputChange("signature", v)} />
                        </div>
                    </div>
                ) : documentType === "quotation" ? (
                    <div className="glass-card">
                        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                            Quotation Terms
                        </h2>
                        <div className="space-y-4">
                            <Input label="Validity Period" id="validityPeriod" value={formData.validityPeriod || ""} onChange={(v) => handleInputChange("validityPeriod", v)} placeholder="e.g. 30 days from issue date" />
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Scope &amp; Limitations</label>
                                <textarea
                                    value={formData.scopeLimitations || ""}
                                    onChange={(e) => handleInputChange("scopeLimitations", e.target.value)}
                                    className="input-field min-h-[100px]"
                                    placeholder="Describe what is included/excluded from this quotation..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Notes</label>
                                <textarea
                                    value={formData.notes || ""}
                                    onChange={(e) => handleInputChange("notes", e.target.value)}
                                    className="input-field min-h-[80px]"
                                    placeholder="Additional notes for the client..."
                                />
                            </div>
                            <Input label="Acceptance Signature (Typed Name)" id="signature" value={formData.signature || ""} onChange={(v) => handleInputChange("signature", v)} placeholder="Authorized signatory name" />
                        </div>
                    </div>
                ) : documentType === "proforma" ? (
                    <div className="glass-card">
                        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <svg className="w-5 h-5 text-fuchsia-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>
                            Trade &amp; Payment Terms
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Bank Details</label>
                                <textarea
                                    value={formData.bankDetails || ""}
                                    onChange={(e) => handleInputChange("bankDetails", e.target.value)}
                                    className="input-field min-h-[80px]"
                                    placeholder="Bank name, account number, SWIFT/BIC, IBAN..."
                                />
                            </div>
                            <Input label="Terms of Sale" id="termsOfSale" value={formData.termsOfSale || ""} onChange={(v) => handleInputChange("termsOfSale", v)} placeholder="e.g. CIF, FOB, EXW" />
                            <Input label="Delivery Terms" id="deliveryTerms" value={formData.deliveryTerms || ""} onChange={(v) => handleInputChange("deliveryTerms", v)} placeholder="e.g. Within 30 days after confirmation" />
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Notes</label>
                                <textarea
                                    value={formData.notes || ""}
                                    onChange={(e) => handleInputChange("notes", e.target.value)}
                                    className="input-field min-h-[80px]"
                                    placeholder="Additional notes or customs information..."
                                />
                            </div>
                            <Input label="Signature (Typed Name)" id="signature" value={formData.signature || ""} onChange={(v) => handleInputChange("signature", v)} />
                        </div>
                    </div>
                ) : (
                    <div />
                )}

                <div className="glass-card">
                    <h2 className="text-xl font-bold text-slate-900 mb-6">Summary</h2>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center text-slate-600">
                            <span>Subtotal</span>
                            <span>{formatCurrency(calculateSubtotal())}</span>
                        </div>

                        <div className="flex items-center justify-between gap-4">
                            <span className="text-slate-600">Tax Rate (%)</span>
                            <div className="w-24">
                                <Input id="taxPercent" type="number" value={formData.taxPercent} onChange={(v) => handleInputChange("taxPercent", Number(v))} noLabel />
                            </div>
                        </div>
                        <div className="flex justify-end text-sm text-slate-500">
                            {formatCurrency(calculateTax())}
                        </div>

                        {(documentType === "invoice" || documentType === "quotation") && (
                            <div className="flex items-center justify-between gap-4">
                                <span className="text-slate-600">Discount ({formData.currency})</span>
                                <div className="w-24">
                                    <Input id="discount" type="number" value={formData.discount || 0} onChange={(v) => handleInputChange("discount", Number(v))} noLabel />
                                </div>
                            </div>
                        )}

                        {documentType === "proforma" && (
                            <div className="flex items-center justify-between gap-4">
                                <span className="text-slate-600">Shipping Cost ({formData.currency})</span>
                                <div className="w-24">
                                    <Input id="shippingCost" type="number" value={formData.shippingCost || 0} onChange={(v) => handleInputChange("shippingCost", Number(v))} noLabel />
                                </div>
                            </div>
                        )}

                        <div className="h-px bg-slate-200 my-4" />

                        <div className="flex justify-between text-xl font-bold text-slate-900">
                            <span>Total</span>
                            <span className="text-indigo-600">{formatCurrency(calculateTotal())}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`inline-flex items-center gap-3 px-8 py-4 text-lg font-bold text-white rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 bg-gradient-to-r ${primaryColorClass} ${shadowClass}`}
                >
                    {isSubmitting ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Generating PDF...
                        </>
                    ) : (
                        <>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                            Download PDF
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}

// Helper Input Component
function Input({
    label,
    id,
    type = "text",
    value,
    onChange,
    error,
    placeholder,
    className = "",
    noLabel = false
}: {
    label?: string;
    id: string;
    type?: string;
    value: string | number;
    onChange: (val: string | number) => void;
    error?: string;
    placeholder?: string;
    className?: string;
    noLabel?: boolean;
}) {
    return (
        <div className={className}>
            {!noLabel && label && <label htmlFor={id} className="block text-sm font-semibold text-slate-700 mb-2">{label}</label>}
            <input
                type={type}
                id={id}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={`input-field ${error ? "border-red-500 focus:ring-red-500" : ""}`}
                placeholder={placeholder}
            />
            {error && <p className="mt-1 text-sm text-red-600 font-medium">{error}</p>}
        </div>
    );
}
