export type DocumentType = "invoice" | "receipt" | "quotation" | "proforma";

export interface DocumentItem {
    id: string;
    description: string;
    quantity: number;
    unitPrice: number;
}

export interface DocumentFormData {
    // Business Info (Optional for non-invoices)
    businessName: string;
    businessAddress: string;
    businessEmail: string;
    businessPhone: string;
    taxId?: string;

    // Customer Info
    customerName: string;
    customerEmail: string;
    customerAddress: string; // Optional for non-invoices logically, keep string but can be empty

    // Details
    documentNumber: string;
    issueDate: string;
    dueDate: string; // Optional for non-invoices
    currency: string;

    // Items
    items: DocumentItem[];

    // Financial
    taxPercent: number;
    discount?: number;

    // Other
    paymentTerms?: string;
    notes?: string;
    signature?: string;
    paymentMethod?: string;

    // Quotation-specific
    expiryDate?: string;
    validityPeriod?: string;
    scopeLimitations?: string;

    // Proforma-specific
    expectedShipmentDate?: string;
    shippingCost?: number;
    bankDetails?: string;
    termsOfSale?: string;
    deliveryTerms?: string;

    documentType: DocumentType;
    templateId?: string;
    logoBase64?: string;
}

export interface DocumentPayload {
    businessName?: string;
    businessAddress?: string;
    businessEmail?: string;
    businessPhone?: string;
    taxId?: string;

    customerName: string;
    customerEmail: string;
    customerAddress?: string;

    documentNumber: string;
    issueDate: string;
    dueDate?: string;
    currency: string;

    items: {
        description: string;
        quantity: number;
        unitPrice: number;
    }[];

    taxPercent: number;
    discount?: number;

    paymentTerms?: string;
    notes?: string;
    signature?: string;
    paymentMethod?: string;

    // Quotation-specific
    expiryDate?: string;
    validityPeriod?: string;
    scopeLimitations?: string;

    // Proforma-specific
    expectedShipmentDate?: string;
    shippingCost?: number;
    bankDetails?: string;
    termsOfSale?: string;
    deliveryTerms?: string;

    documentType: DocumentType;
    templateId?: string;
    logoBase64?: string;
}

export interface ValidationError {
    field: string;
    message: string;
}

export const DOCUMENT_CONFIG: Record<
    DocumentType,
    {
        title: string;
        prefix: string;
        color: { r: number; g: number; b: number };
        watermark: string;
    }
> = {
    invoice: {
        title: "INVOICE",
        prefix: "INV",
        color: { r: 0.145, g: 0.388, b: 0.922 },
        watermark: "invoices-at-best.com",
    },
    receipt: {
        title: "RECEIPT",
        prefix: "RCP",
        color: { r: 0.133, g: 0.545, b: 0.133 },
        watermark: "invoices-at-best.com",
    },
    quotation: {
        title: "QUOTATION",
        prefix: "QUO",
        color: { r: 0.545, g: 0.271, b: 0.075 },
        watermark: "invoices-at-best.com",
    },
    proforma: {
        title: "PROFORMA INVOICE",
        prefix: "PRO",
        color: { r: 0.502, g: 0.0, b: 0.502 },
        watermark: "invoices-at-best.com",
    },
};
