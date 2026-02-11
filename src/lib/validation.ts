import { DocumentPayload, DocumentType, ValidationError } from "@/types/invoice";

const validDocumentTypes: DocumentType[] = ["invoice", "receipt", "quotation", "proforma"];

export function validateDocumentPayload(payload: unknown): {
    valid: boolean;
    errors: ValidationError[];
    data?: DocumentPayload;
} {
    const errors: ValidationError[] = [];

    if (!payload || typeof payload !== "object") {
        return {
            valid: false,
            errors: [{ field: "payload", message: "Invalid payload format" }],
        };
    }

    const data = payload as Record<string, unknown>;

    // Validate documentType
    if (
        !data.documentType ||
        typeof data.documentType !== "string" ||
        !validDocumentTypes.includes(data.documentType as DocumentType)
    ) {
        errors.push({
            field: "documentType",
            message: "Valid document type is required (invoice, receipt, quotation, proforma)",
        });
    }

    // Validate customerName
    if (
        !data.customerName ||
        typeof data.customerName !== "string" ||
        data.customerName.trim().length === 0
    ) {
        errors.push({
            field: "customerName",
            message: "Customer name is required",
        });
    }

    // Validate customerEmail
    if (
        !data.customerEmail ||
        typeof data.customerEmail !== "string" ||
        !isValidEmail(data.customerEmail)
    ) {
        errors.push({
            field: "customerEmail",
            message: "Valid customer email is required",
        });
    }

    // Validate documentNumber
    if (
        !data.documentNumber ||
        typeof data.documentNumber !== "string" ||
        data.documentNumber.trim().length === 0
    ) {
        errors.push({
            field: "documentNumber",
            message: "Document number is required",
        });
    }

    // Validate items
    if (!Array.isArray(data.items) || data.items.length === 0) {
        errors.push({
            field: "items",
            message: "At least one item is required",
        });
    } else {
        data.items.forEach((item: unknown, index: number) => {
            if (!item || typeof item !== "object") {
                errors.push({
                    field: `items[${index}]`,
                    message: `Item ${index + 1} is invalid`,
                });
                return;
            }

            const itemData = item as Record<string, unknown>;

            if (
                !itemData.description ||
                typeof itemData.description !== "string" ||
                itemData.description.trim().length === 0
            ) {
                errors.push({
                    field: `items[${index}].description`,
                    message: `Item ${index + 1} description is required`,
                });
            }

            if (
                typeof itemData.quantity !== "number" ||
                itemData.quantity <= 0 ||
                !Number.isFinite(itemData.quantity)
            ) {
                errors.push({
                    field: `items[${index}].quantity`,
                    message: `Item ${index + 1} quantity must be a positive number`,
                });
            }

            if (
                typeof itemData.unitPrice !== "number" ||
                itemData.unitPrice < 0 ||
                !Number.isFinite(itemData.unitPrice)
            ) {
                errors.push({
                    field: `items[${index}].unitPrice`,
                    message: `Item ${index + 1} unit price must be a non-negative number`,
                });
            }
        });
    }

    // Validate taxPercent
    if (
        typeof data.taxPercent !== "number" ||
        data.taxPercent < 0 ||
        data.taxPercent > 100 ||
        !Number.isFinite(data.taxPercent)
    ) {
        errors.push({
            field: "taxPercent",
            message: "Tax percentage must be between 0 and 100",
        });
    }

    if (errors.length > 0) {
        return { valid: false, errors };
    }

    const validatedData: DocumentPayload = {
        customerName: (data.customerName as string).trim(),
        customerEmail: (data.customerEmail as string).trim().toLowerCase(),
        documentNumber: (data.documentNumber as string).trim(),
        issueDate: (data.issueDate as string) || new Date().toISOString().split('T')[0],
        currency: (data.currency as string) || 'USD',
        items: (data.items as Array<Record<string, unknown>>).map((item) => ({
            id: (item.id as string) || crypto.randomUUID(),
            description: (item.description as string).trim(),
            quantity: item.quantity as number,
            unitPrice: item.unitPrice as number,
        })),
        taxPercent: data.taxPercent as number,
        documentType: data.documentType as DocumentType,
        businessName: data.businessName as string,
        businessAddress: data.businessAddress as string,
        businessEmail: data.businessEmail as string,
        businessPhone: data.businessPhone as string,
        paymentMethod: data.paymentMethod as string,
        notes: data.notes as string,
        paymentTerms: data.paymentTerms as string,
        expiryDate: data.expiryDate as string,
        validityPeriod: data.validityPeriod as string,
        scopeLimitations: data.scopeLimitations as string,
        expectedShipmentDate: data.expectedShipmentDate as string,
        shippingCost: data.shippingCost as number,
        bankDetails: data.bankDetails as string,
        termsOfSale: data.termsOfSale as string,
        deliveryTerms: data.deliveryTerms as string,
    };

    return { valid: true, errors: [], data: validatedData };
}

function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
