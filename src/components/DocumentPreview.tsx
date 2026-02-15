"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { DocumentFormData, DocumentType, DOCUMENT_CONFIG } from "@/types/invoice";
import { getTemplate } from "@/lib/templates";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

interface DocumentPreviewProps {
    formData: DocumentFormData;
    documentType: DocumentType;
    templateId: string;
    onFormDataChange: (data: DocumentFormData) => void;
    onDownloadComplete: () => void;
    onClose: () => void;
}

interface DragState {
    id: string;
    startX: number;
    startY: number;
    offsetX: number;
    offsetY: number;
}

interface ElementPosition {
    x: number;
    y: number;
}

function formatCurrency(amount: number, currency: string = "USD"): string {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
    }).format(amount);
}

function formatDate(dateStr: string): string {
    if (!dateStr) return "";
    try {
        return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    } catch {
        return dateStr;
    }
}

// Editable text component
function EditableText({
    value,
    onChange,
    className = "",
    tag: Tag = "span",
    placeholder = "Click to edit",
    multiline = false,
}: {
    value: string;
    onChange: (val: string) => void;
    className?: string;
    tag?: "span" | "p" | "h1" | "h2" | "h3" | "div";
    placeholder?: string;
    multiline?: boolean;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const [editing, setEditing] = useState(false);
    const [editValue, setEditValue] = useState(value);

    useEffect(() => {
        setEditValue(value);
    }, [value]);

    const handleBlur = () => {
        setEditing(false);
        if (editValue !== value) {
            onChange(editValue);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !multiline) {
            e.preventDefault();
            (e.target as HTMLElement).blur();
        }
        if (e.key === "Escape") {
            setEditValue(value);
            setEditing(false);
        }
    };

    if (editing) {
        if (multiline) {
            return (
                <textarea
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    className={`${className} bg-blue-50/80 border border-blue-300 rounded px-1.5 py-0.5 outline-none focus:ring-2 focus:ring-blue-400 resize-none min-h-[60px] w-full`}
                    style={{ font: "inherit" }}
                />
            );
        }
        return (
            <input
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                autoFocus
                className={`${className} bg-blue-50/80 border border-blue-300 rounded px-1.5 py-0.5 outline-none focus:ring-2 focus:ring-blue-400`}
                style={{ font: "inherit", width: Math.max(60, editValue.length * 8 + 30) + "px" }}
            />
        );
    }

    return (
        <Tag
            ref={ref as React.Ref<never>}
            onClick={() => setEditing(true)}
            className={`${className} cursor-text hover:bg-blue-50/60 hover:outline-dashed hover:outline-1 hover:outline-blue-300 rounded px-0.5 transition-colors group/edit relative ${!value ? "italic text-gray-400" : ""}`}
            title="Click to edit"
        >
            {value || placeholder}
            <svg className="w-3 h-3 inline-block ml-1 opacity-0 group-hover/edit:opacity-60 text-blue-400 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
        </Tag>
    );
}

// Draggable wrapper
function DraggableElement({
    id,
    children,
    positions,
    onPositionChange,
    className = "",
}: {
    id: string;
    children: React.ReactNode;
    positions: Record<string, ElementPosition>;
    onPositionChange: (id: string, pos: ElementPosition) => void;
    className?: string;
}) {
    const elementRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const dragStart = useRef<DragState | null>(null);

    const pos = positions[id] || { x: 0, y: 0 };

    const handleMouseDown = useCallback(
        (e: React.MouseEvent) => {
            if ((e.target as HTMLElement).tagName === "INPUT" || (e.target as HTMLElement).tagName === "TEXTAREA") return;
            e.preventDefault();
            setIsDragging(true);
            dragStart.current = {
                id,
                startX: e.clientX,
                startY: e.clientY,
                offsetX: pos.x,
                offsetY: pos.y,
            };
        },
        [id, pos.x, pos.y]
    );

    useEffect(() => {
        if (!isDragging) return;

        const handleMouseMove = (e: MouseEvent) => {
            if (!dragStart.current) return;
            const dx = e.clientX - dragStart.current.startX;
            const dy = e.clientY - dragStart.current.startY;
            onPositionChange(id, {
                x: dragStart.current.offsetX + dx,
                y: dragStart.current.offsetY + dy,
            });
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            dragStart.current = null;
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging, id, onPositionChange]);

    return (
        <div
            ref={elementRef}
            onMouseDown={handleMouseDown}
            className={`${className} ${isDragging ? "z-50 scale-[1.02] shadow-xl opacity-90" : "hover:outline-dashed hover:outline-1 hover:outline-indigo-300"} transition-shadow cursor-grab active:cursor-grabbing relative group/drag`}
            style={{
                transform: `translate(${pos.x}px, ${pos.y}px)`,
                transition: isDragging ? "none" : "box-shadow 0.15s",
            }}
        >
            {/* Drag handle indicator */}
            <div className="absolute -left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover/drag:opacity-40 transition-opacity pointer-events-none">
                <svg className="w-4 h-4 text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="9" cy="5" r="1.5" />
                    <circle cx="15" cy="5" r="1.5" />
                    <circle cx="9" cy="12" r="1.5" />
                    <circle cx="15" cy="12" r="1.5" />
                    <circle cx="9" cy="19" r="1.5" />
                    <circle cx="15" cy="19" r="1.5" />
                </svg>
            </div>
            {children}
        </div>
    );
}

export default function DocumentPreview({
    formData,
    documentType,
    templateId,
    onFormDataChange,
    onDownloadComplete,
    onClose,
}: DocumentPreviewProps) {
    const config = DOCUMENT_CONFIG[documentType];
    const template = getTemplate(templateId);
    const [positions, setPositions] = useState<Record<string, ElementPosition>>({});
    const [scale, setScale] = useState(1);
    const [isGenerating, setIsGenerating] = useState(false);
    const previewRef = useRef<HTMLDivElement>(null);
    const pageRef = useRef<HTMLDivElement>(null);

    // Auto-scale to fit container
    useEffect(() => {
        const updateScale = () => {
            if (previewRef.current) {
                const containerWidth = previewRef.current.parentElement?.clientWidth || 800;
                const pageWidth = 794; // A4 width at 96dpi
                const newScale = Math.min(1, (containerWidth - 40) / pageWidth);
                setScale(newScale);
            }
        };
        updateScale();
        window.addEventListener("resize", updateScale);
        return () => window.removeEventListener("resize", updateScale);
    }, []);

    const handlePositionChange = useCallback((id: string, pos: ElementPosition) => {
        setPositions((prev) => ({ ...prev, [id]: pos }));
    }, []);

    const handleFieldChange = (field: keyof DocumentFormData, value: string | number) => {
        onFormDataChange({ ...formData, [field]: value });
    };

    const handleItemChange = (index: number, field: string, value: string | number) => {
        const newItems = [...formData.items];
        newItems[index] = { ...newItems[index], [field]: value };
        onFormDataChange({ ...formData, items: newItems });
    };

    // Calculations
    const subtotal = formData.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
    const tax = (subtotal * formData.taxPercent) / 100;
    const discount = formData.discount || 0;
    const shipping = documentType === "proforma" && formData.shippingCost ? formData.shippingCost : 0;
    const total = subtotal + tax - discount + shipping;

    // Template-driven colors
    const hdr = template.style.headerColor;
    const acc = template.style.accentColor;
    const headerColorCSS = `rgb(${Math.round(hdr.r * 255)}, ${Math.round(hdr.g * 255)}, ${Math.round(hdr.b * 255)})`;
    const accentColorCSS = `rgb(${Math.round(acc.r * 255)}, ${Math.round(acc.g * 255)}, ${Math.round(acc.b * 255)})`;

    const fontClass = {
        sans: "font-sans",
        serif: "font-serif",
        mono: "font-mono",
    }[template.style.fontFamily];

    const resetPositions = () => setPositions({});

    // Generate PDF directly from the preview HTML — WYSIWYG
    const handleDownloadFromPreview = async () => {
        if (!pageRef.current || isGenerating) return;
        setIsGenerating(true);

        try {
            // Temporarily hide edit indicators for a clean capture
            pageRef.current.classList.add("pdf-capture-mode");

            // Reset scale for full-resolution capture
            const originalScale = scale;
            if (previewRef.current) {
                previewRef.current.style.transform = "scale(1)";
            }

            // Wait for reflow
            await new Promise((r) => setTimeout(r, 100));

            const canvas = await html2canvas(pageRef.current, {
                scale: 2, // High-res
                useCORS: true,
                backgroundColor: "#ffffff",
                logging: false,
                width: 794,
                windowWidth: 794,
            });

            // Restore scale
            if (previewRef.current) {
                previewRef.current.style.transform = `scale(${originalScale})`;
            }
            pageRef.current.classList.remove("pdf-capture-mode");

            // Create PDF (A4: 210mm x 297mm)
            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "mm",
                format: "a4",
            });

            const imgData = canvas.toDataURL("image/png");
            const pdfWidth = 210;
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, Math.min(pdfHeight, 297));

            // If content overflows A4, add more pages
            if (pdfHeight > 297) {
                let remainingHeight = pdfHeight - 297;
                let yOffset = -297;
                while (remainingHeight > 0) {
                    pdf.addPage();
                    pdf.addImage(imgData, "PNG", 0, yOffset, pdfWidth, pdfHeight);
                    remainingHeight -= 297;
                    yOffset -= 297;
                }
            }

            pdf.save(`${documentType}-${formData.documentNumber}.pdf`);

            // Track document creation (best-effort)
            try {
                const subtotal = formData.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
                const taxAmt = (subtotal * formData.taxPercent) / 100;
                const discountAmt = formData.discount || 0;
                const shippingAmt = documentType === "proforma" && formData.shippingCost ? formData.shippingCost : 0;
                const totalAmt = subtotal + taxAmt - discountAmt + shippingAmt;

                await fetch("/api/documents/track", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        documentType,
                        documentNumber: formData.documentNumber,
                        customerName: formData.customerName,
                        customerEmail: formData.customerEmail,
                        totalAmount: totalAmt,
                        currency: formData.currency,
                    }),
                });
            } catch {
                // Tracking failure should not affect user experience
            }

            onDownloadComplete();
        } catch (error) {
            console.error("PDF generation failed:", error);
            // Restore UI in case of error
            if (pageRef.current) pageRef.current.classList.remove("pdf-capture-mode");
            if (previewRef.current) previewRef.current.style.transform = `scale(${scale})`;
            alert("Failed to generate PDF. Please try again.");
        } finally {
            setIsGenerating(false);
        }
    };

    return createPortal(
        <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex flex-col animate-fade-in">
            {/* Toolbar */}
            <div className="bg-white/95 backdrop-blur-md border-b border-gray-200 px-4 py-3 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-4">
                    <button
                        onClick={onClose}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        <span className="text-sm font-medium">Back to Editor</span>
                    </button>
                    <div className="h-5 w-px bg-gray-300" />
                    <h2 className="text-sm font-bold text-gray-900">Live Preview</h2>
                    <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-medium">
                        Click text to edit • Drag sections to rearrange
                    </span>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={resetPositions}
                        className="text-xs text-gray-500 hover:text-gray-700 font-medium px-3 py-1.5 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        Reset Layout
                    </button>
                    <button
                        onClick={handleDownloadFromPreview}
                        disabled={isGenerating}
                        className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl hover:scale-[1.02] transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:scale-100"
                    >
                        {isGenerating ? (
                            <>
                                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Generating...
                            </>
                        ) : (
                            <>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Download PDF
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Preview Area */}
            <div className="flex-1 overflow-auto bg-gray-100/80 p-6 flex justify-center">
                <div
                    ref={previewRef}
                    style={{
                        transform: `scale(${scale})`,
                        transformOrigin: "top center",
                    }}
                >
                    {/* A4 Page */}
                    <div
                        ref={pageRef}
                        className={`bg-white shadow-2xl ${fontClass} relative preview-page`}
                        style={{
                            width: "794px",
                            minHeight: "1123px",
                            padding: "48px",
                            borderRadius: "4px",
                            border: template.style.showBorder ? `2px solid ${accentColorCSS}` : "1px solid #e5e7eb",
                        }}
                    >
                        {/* Accent Line */}
                        {template.style.showAccentLine && (
                            <div
                                className="absolute top-0 left-0 right-0"
                                style={{
                                    height: "5px",
                                    background: `linear-gradient(90deg, ${headerColorCSS}, ${accentColorCSS})`,
                                    borderRadius: "4px 4px 0 0",
                                }}
                            />
                        )}

                        {/* ── HEADER ── */}
                        <DraggableElement id="header" positions={positions} onPositionChange={handlePositionChange}>
                            <div
                                className="flex justify-between items-start mb-10 pb-6"
                                style={{
                                    borderBottom: `2px solid ${accentColorCSS}20`,
                                    ...(template.style.headerBgFill
                                        ? {
                                            background: `linear-gradient(135deg, ${headerColorCSS}, ${accentColorCSS})`,
                                            margin: "-48px -48px 40px -48px",
                                            padding: "48px",
                                            borderRadius: template.style.showBorder ? "0" : "4px 4px 0 0",
                                            color: "white",
                                        }
                                        : {}),
                                }}
                            >
                                <div className="flex-1">
                                    {/* Logo placeholder */}
                                    {formData.logoBase64 && (
                                        <img
                                            src={formData.logoBase64}
                                            alt="Logo"
                                            className="max-h-16 max-w-[180px] object-contain mb-3"
                                        />
                                    )}
                                    <EditableText
                                        value={formData.businessName}
                                        onChange={(v) => handleFieldChange("businessName", v)}
                                        tag="h2"
                                        className={`text-xl font-bold`}
                                        placeholder="Business Name"
                                    />
                                    {formData.businessAddress && (
                                        <EditableText
                                            value={formData.businessAddress}
                                            onChange={(v) => handleFieldChange("businessAddress", v)}
                                            tag="p"
                                            className="text-sm mt-1 opacity-80"
                                            placeholder="Business Address"
                                        />
                                    )}
                                    {formData.businessPhone && (
                                        <EditableText
                                            value={formData.businessPhone}
                                            onChange={(v) => handleFieldChange("businessPhone", v)}
                                            tag="p"
                                            className="text-sm opacity-70"
                                            placeholder="Phone"
                                        />
                                    )}
                                    {formData.businessEmail && (
                                        <EditableText
                                            value={formData.businessEmail}
                                            onChange={(v) => handleFieldChange("businessEmail", v)}
                                            tag="p"
                                            className="text-sm opacity-70"
                                            placeholder="Email"
                                        />
                                    )}
                                </div>
                                <div className="text-right">
                                    <h1
                                        className="text-3xl font-extrabold tracking-wider"
                                        style={{ color: template.style.headerBgFill ? "white" : headerColorCSS }}
                                    >
                                        {config.title}
                                    </h1>
                                    {documentType === "receipt" && (
                                        <span
                                            className="inline-block mt-2 px-3 py-1 text-xs font-bold rounded-full"
                                            style={{
                                                backgroundColor: template.style.headerBgFill ? "rgba(255,255,255,0.25)" : `${headerColorCSS}15`,
                                                color: template.style.headerBgFill ? "white" : headerColorCSS,
                                            }}
                                        >
                                            PAID
                                        </span>
                                    )}
                                </div>
                            </div>
                        </DraggableElement>

                        {/* ── DOCUMENT DETAILS ── */}
                        <DraggableElement id="details" positions={positions} onPositionChange={handlePositionChange} className="mb-8">
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                                            {documentType === "quotation" ? "Client" : "Bill To"}
                                        </p>
                                        <EditableText
                                            value={formData.customerName}
                                            onChange={(v) => handleFieldChange("customerName", v)}
                                            tag="p"
                                            className="font-semibold text-gray-900"
                                            placeholder="Customer Name"
                                        />
                                        {formData.customerAddress && (
                                            <EditableText
                                                value={formData.customerAddress}
                                                onChange={(v) => handleFieldChange("customerAddress", v)}
                                                tag="p"
                                                className="text-sm text-gray-600"
                                                placeholder="Customer Address"
                                            />
                                        )}
                                        <EditableText
                                            value={formData.customerEmail}
                                            onChange={(v) => handleFieldChange("customerEmail", v)}
                                            tag="p"
                                            className="text-sm text-gray-500"
                                            placeholder="Email"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2 text-right">
                                    <div className="inline-block text-left">
                                        <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
                                            <span className="text-gray-400 font-medium">{config.title} #</span>
                                            <EditableText
                                                value={formData.documentNumber}
                                                onChange={(v) => handleFieldChange("documentNumber", v)}
                                                className="font-semibold text-gray-900"
                                                placeholder="DOC-001"
                                            />
                                            <span className="text-gray-400 font-medium">
                                                {documentType === "receipt" ? "Payment Date" : "Issue Date"}
                                            </span>
                                            <span className="text-gray-700">{formatDate(formData.issueDate)}</span>
                                            {documentType === "invoice" && formData.dueDate && (
                                                <>
                                                    <span className="text-gray-400 font-medium">Due Date</span>
                                                    <span className="text-gray-700">{formatDate(formData.dueDate)}</span>
                                                </>
                                            )}
                                            {documentType === "quotation" && formData.expiryDate && (
                                                <>
                                                    <span className="text-gray-400 font-medium">Expires</span>
                                                    <span className="text-gray-700">{formatDate(formData.expiryDate)}</span>
                                                </>
                                            )}
                                            {documentType === "receipt" && formData.paymentMethod && (
                                                <>
                                                    <span className="text-gray-400 font-medium">Payment</span>
                                                    <span className="text-gray-700">{formData.paymentMethod}</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </DraggableElement>

                        {/* ── ITEMS TABLE ── */}
                        <DraggableElement id="items-table" positions={positions} onPositionChange={handlePositionChange} className="mb-8">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr
                                        style={{
                                            backgroundColor:
                                                template.style.tableStyle === "filled" || template.style.tableStyle === "bold"
                                                    ? `${headerColorCSS}12`
                                                    : "transparent",
                                            borderBottom: `2px solid ${accentColorCSS}30`,
                                        }}
                                    >
                                        <th className="text-left py-3 px-3 text-xs font-bold uppercase tracking-wider text-gray-500">#</th>
                                        <th className="text-left py-3 px-3 text-xs font-bold uppercase tracking-wider text-gray-500">Description</th>
                                        <th className="text-center py-3 px-3 text-xs font-bold uppercase tracking-wider text-gray-500">Qty</th>
                                        <th className="text-right py-3 px-3 text-xs font-bold uppercase tracking-wider text-gray-500">Price</th>
                                        <th className="text-right py-3 px-3 text-xs font-bold uppercase tracking-wider text-gray-500">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {formData.items.map((item, idx) => (
                                        <tr
                                            key={item.id}
                                            className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors"
                                            style={
                                                template.style.tableStyle === "filled" && idx % 2 === 1
                                                    ? { backgroundColor: `${headerColorCSS}06` }
                                                    : {}
                                            }
                                        >
                                            <td className="py-3 px-3 text-gray-400 text-center">{idx + 1}</td>
                                            <td className="py-3 px-3">
                                                <EditableText
                                                    value={item.description}
                                                    onChange={(v) => handleItemChange(idx, "description", v as string)}
                                                    className="text-gray-800"
                                                    placeholder="Item description"
                                                />
                                            </td>
                                            <td className="py-3 px-3 text-center text-gray-700">{item.quantity}</td>
                                            <td className="py-3 px-3 text-right text-gray-700">
                                                {formatCurrency(item.unitPrice, formData.currency)}
                                            </td>
                                            <td className="py-3 px-3 text-right font-semibold text-gray-900">
                                                {formatCurrency(item.quantity * item.unitPrice, formData.currency)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </DraggableElement>

                        {/* ── TOTALS ── */}
                        <DraggableElement id="totals" positions={positions} onPositionChange={handlePositionChange} className="mb-8">
                            <div className="flex justify-end">
                                <div className="w-72 space-y-2">
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>Subtotal</span>
                                        <span>{formatCurrency(subtotal, formData.currency)}</span>
                                    </div>
                                    {formData.taxPercent > 0 && (
                                        <div className="flex justify-between text-sm text-gray-600">
                                            <span>Tax ({formData.taxPercent}%)</span>
                                            <span>{formatCurrency(tax, formData.currency)}</span>
                                        </div>
                                    )}
                                    {discount > 0 && (
                                        <div className="flex justify-between text-sm text-gray-600">
                                            <span>Discount</span>
                                            <span>-{formatCurrency(discount, formData.currency)}</span>
                                        </div>
                                    )}
                                    {shipping > 0 && (
                                        <div className="flex justify-between text-sm text-gray-600">
                                            <span>Shipping</span>
                                            <span>{formatCurrency(shipping, formData.currency)}</span>
                                        </div>
                                    )}
                                    <div
                                        className="flex justify-between pt-3 mt-2 text-lg font-bold"
                                        style={{
                                            borderTop: `2px solid ${accentColorCSS}40`,
                                            color: headerColorCSS,
                                        }}
                                    >
                                        <span>Total</span>
                                        <span>{formatCurrency(total, formData.currency)}</span>
                                    </div>
                                </div>
                            </div>
                        </DraggableElement>

                        {/* ── FOOTER ── */}
                        <DraggableElement id="footer" positions={positions} onPositionChange={handlePositionChange}>
                            <div className="mt-8 pt-6" style={{ borderTop: `1px solid ${accentColorCSS}20` }}>
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        {/* Payment Terms / Quotation Terms / Trade Terms */}
                                        {documentType === "invoice" && formData.paymentTerms && (
                                            <div>
                                                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Payment Terms</p>
                                                <EditableText
                                                    value={formData.paymentTerms}
                                                    onChange={(v) => handleFieldChange("paymentTerms", v)}
                                                    tag="p"
                                                    className="text-sm text-gray-700"
                                                    placeholder="e.g. Net 30"
                                                />
                                            </div>
                                        )}
                                        {documentType === "quotation" && formData.validityPeriod && (
                                            <div>
                                                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Validity</p>
                                                <p className="text-sm text-gray-700">{formData.validityPeriod}</p>
                                            </div>
                                        )}
                                        {documentType === "proforma" && formData.termsOfSale && (
                                            <div>
                                                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Terms of Sale</p>
                                                <p className="text-sm text-gray-700">{formData.termsOfSale}</p>
                                            </div>
                                        )}
                                        {documentType === "proforma" && formData.deliveryTerms && (
                                            <div>
                                                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Delivery Terms</p>
                                                <p className="text-sm text-gray-700">{formData.deliveryTerms}</p>
                                            </div>
                                        )}
                                        {documentType === "proforma" && formData.bankDetails && (
                                            <div>
                                                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Bank Details</p>
                                                <p className="text-sm text-gray-700 whitespace-pre-line">{formData.bankDetails}</p>
                                            </div>
                                        )}
                                        {formData.notes && (
                                            <div>
                                                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Notes</p>
                                                <EditableText
                                                    value={formData.notes}
                                                    onChange={(v) => handleFieldChange("notes", v)}
                                                    tag="p"
                                                    className="text-sm text-gray-600"
                                                    placeholder="Additional notes..."
                                                    multiline
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <div className="text-right">
                                        {formData.signature && (
                                            <div className="inline-block text-left">
                                                <div
                                                    className="text-2xl italic mb-1"
                                                    style={{
                                                        fontFamily: "'Segoe Script', 'cursive', serif",
                                                        color: headerColorCSS,
                                                    }}
                                                >
                                                    {formData.signature}
                                                </div>
                                                <div
                                                    className="w-40 mb-1"
                                                    style={{ borderBottom: `1px solid ${accentColorCSS}40` }}
                                                />
                                                <p className="text-xs text-gray-400 font-medium">Authorized Signature</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </DraggableElement>

                        {/* Tax ID */}
                        {formData.taxId && (
                            <p className="text-xs text-gray-400 mt-6">Tax ID: {formData.taxId}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}
