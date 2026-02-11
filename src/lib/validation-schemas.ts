import { z } from "zod";

export const lineItemSchema = z.object({
    description: z.string().min(1, "Description is required").max(200, "Description too long"),
    quantity: z.number().min(0.01, "Quantity must be greater than 0"),
    unitPrice: z.number().min(0, "Unit price cannot be negative"),
});

// Common fields for all
const commonFields = {
    customerName: z.string().min(1, "Customer name is required"),
    customerEmail: z.string().email("Invalid customer email"),
    documentNumber: z.string().min(1, "Document number is required"),
    issueDate: z.string().min(1, "Issue date is required"),
    currency: z.string().min(1, "Currency is required"),
    items: z.array(lineItemSchema).min(1, "At least one item is required"),
    taxPercent: z.number().min(0).max(100),
    discount: z.number().min(0).optional(),
};

// Invoice (Strict)
const invoiceSchema = z.object({
    ...commonFields,
    documentType: z.literal("invoice"),
    businessName: z.string().min(1, "Business name is required"),
    businessAddress: z.string().min(1, "Business address is required"),
    businessEmail: z.string().email("Invalid business email"),
    businessPhone: z.string().min(1, "Business phone is required"),
    taxId: z.string().optional(),
    customerAddress: z.string().min(1, "Customer address is required"),
    dueDate: z.string().min(1, "Due date is required"),
    paymentTerms: z.string().optional(),
    notes: z.string().optional(),
    signature: z.string().optional(),
    paymentMethod: z.string().optional(),
    // Pass-through from other types
    expiryDate: z.string().optional(),
    validityPeriod: z.string().optional(),
    scopeLimitations: z.string().optional(),
    expectedShipmentDate: z.string().optional(),
    shippingCost: z.number().optional(),
    bankDetails: z.string().optional(),
    termsOfSale: z.string().optional(),
    deliveryTerms: z.string().optional(),
});

// Receipt (Required Business Info & Payment Method)
const receiptSchema = z.object({
    ...commonFields,
    documentType: z.literal("receipt"),
    businessName: z.string().min(1, "Business name is required"),
    businessAddress: z.string().min(1, "Business address is required"),
    businessEmail: z.string().email("Invalid business email").or(z.literal("")),
    businessPhone: z.string().min(1, "Business phone is required"),
    paymentMethod: z.string().min(1, "Payment Method is required"),
    // Optionals
    taxId: z.string().optional(),
    customerAddress: z.string().optional(),
    dueDate: z.string().optional(),
    paymentTerms: z.string().optional(),
    notes: z.string().optional(),
    signature: z.string().optional(),
    // Pass-through from other types
    expiryDate: z.string().optional(),
    validityPeriod: z.string().optional(),
    scopeLimitations: z.string().optional(),
    expectedShipmentDate: z.string().optional(),
    shippingCost: z.number().optional(),
    bankDetails: z.string().optional(),
    termsOfSale: z.string().optional(),
    deliveryTerms: z.string().optional(),
});

// Quotation (Price Offer — requires business info & expiry date, NO due date)
const quotationSchema = z.object({
    ...commonFields,
    documentType: z.literal("quotation"),

    // Business info required
    businessName: z.string().min(1, "Business name is required"),
    businessAddress: z.string().optional(),
    businessEmail: z.string().email("Invalid business email").or(z.literal("")),
    businessPhone: z.string().min(1, "Business phone is required"),

    // Client
    customerAddress: z.string().optional(),

    // Quotation-specific
    expiryDate: z.string().min(1, "Expiry date is required"),
    validityPeriod: z.string().optional(),
    scopeLimitations: z.string().optional(),
    signature: z.string().optional(),

    // Not applicable but allow pass-through
    taxId: z.string().optional(),
    dueDate: z.string().optional(),
    paymentTerms: z.string().optional(),
    notes: z.string().optional(),
    paymentMethod: z.string().optional(),
    expectedShipmentDate: z.string().optional(),
    shippingCost: z.number().optional(),
    bankDetails: z.string().optional(),
    termsOfSale: z.string().optional(),
    deliveryTerms: z.string().optional(),
});

// Proforma Invoice (Preliminary Invoice — international trade, customs)
const proformaSchema = z.object({
    ...commonFields,
    documentType: z.literal("proforma"),

    // Business info required (full legal details for customs)
    businessName: z.string().min(1, "Full legal business name is required"),
    businessAddress: z.string().min(1, "Business address is required"),
    businessEmail: z.string().email("Invalid business email").or(z.literal("")),
    businessPhone: z.string().min(1, "Business phone is required"),
    taxId: z.string().min(1, "Tax ID is required for proforma invoices"),

    // Customer full details
    customerAddress: z.string().min(1, "Customer address is required"),

    // Proforma-specific
    expectedShipmentDate: z.string().optional(),
    shippingCost: z.number().min(0, "Shipping cost cannot be negative").optional(),
    bankDetails: z.string().optional(),
    termsOfSale: z.string().optional(),
    deliveryTerms: z.string().optional(),

    // Pass-through (not used by proforma but may be sent)
    dueDate: z.string().optional(),
    paymentTerms: z.string().optional(),
    notes: z.string().optional(),
    signature: z.string().optional(),
    paymentMethod: z.string().optional(),
    expiryDate: z.string().optional(),
    validityPeriod: z.string().optional(),
    scopeLimitations: z.string().optional(),
});

// Use discriminated union for better performance and error messages
export const documentPayloadSchema = z.discriminatedUnion("documentType", [
    invoiceSchema,
    receiptSchema,
    quotationSchema,
    proformaSchema,
]);

export type DocumentPayload = z.infer<typeof documentPayloadSchema>;

export const contactFormSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

export function formatZodErrors(error: z.ZodError) {
    return error.issues.map((issue) => ({
        field: issue.path.join(".") || "general",
        message: issue.message,
    }));
}
