import { PDFDocument, StandardFonts, rgb, degrees } from "pdf-lib";
import { DocumentPayload, DOCUMENT_CONFIG } from "@/types/invoice";

export async function generateDocumentPDF(
    document: DocumentPayload,
    isPremium: boolean = false
): Promise<Uint8Array> {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([612, 792]); // Letter size

    const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    const { width, height } = page.getSize();
    const config = DOCUMENT_CONFIG[document.documentType];

    // Apply watermark ONLY if NOT premium
    if (!isPremium) {
        await addWatermark(page, helveticaBold, width, height, config.watermark);
    }

    // Colors
    const primaryColor = rgb(config.color.r, config.color.g, config.color.b);
    const textColor = rgb(0.11, 0.11, 0.11);
    const lightGray = rgb(0.4, 0.4, 0.4);
    const tableHeaderBg = primaryColor;
    const tableHeaderText = rgb(1, 1, 1);

    let y = height - 50;
    const margin = 50;

    // --- HEADER ---
    page.drawText(config.title, {
        x: margin,
        y: y,
        size: 28,
        font: helveticaBold,
        color: primaryColor,
    });

    // Document Number & Dates (Right Aligned)
    const dateFontSize = 10;
    const dateLineHeight = 14;

    const drawRightAlignedNode = (label: string, value: string, yPos: number) => {
        const valueWidth = helveticaBold.widthOfTextAtSize(value, dateFontSize);
        const labelWidth = helvetica.widthOfTextAtSize(label, dateFontSize);
        const totalWidth = Math.max(valueWidth + labelWidth + 10, 150);

        page.drawText(label, {
            x: width - margin - totalWidth,
            y: yPos,
            size: dateFontSize,
            font: helvetica,
            color: lightGray,
        });

        page.drawText(value, {
            x: width - margin - valueWidth,
            y: yPos,
            size: dateFontSize,
            font: helveticaBold,
            color: textColor,
        });
    }

    drawRightAlignedNode("Reference #:", document.documentNumber, y);
    y -= dateLineHeight * 1.5;

    // Receipt Specific: Payment Date label
    const dateLabel = document.documentType === "receipt" ? "Payment Date:" : "Issue Date:";
    drawRightAlignedNode(dateLabel, document.issueDate, y);

    // Due date for invoice only
    if (document.dueDate && document.documentType === "invoice") {
        y -= dateLineHeight;
        drawRightAlignedNode("Due Date:", document.dueDate, y);
    }

    // Expiry date for quotation
    if (document.documentType === "quotation" && document.expiryDate) {
        y -= dateLineHeight;
        drawRightAlignedNode("Expiry Date:", document.expiryDate, y);
    }

    // Expected shipment date for proforma
    if (document.documentType === "proforma" && document.expectedShipmentDate) {
        y -= dateLineHeight;
        drawRightAlignedNode("Expected Shipment:", document.expectedShipmentDate, y);
    }

    // Receipt Specific: Payment Method
    if (document.documentType === "receipt" && document.paymentMethod) {
        y -= dateLineHeight;
        drawRightAlignedNode("Payment Method:", document.paymentMethod, y);
    }

    y = height - 130; // Move down for addresses

    // --- ADDRESSES ---
    const drawAddressBlock = (
        title: string,
        name: string,
        address?: string,
        email?: string,
        phone?: string,
        taxId?: string,
        xPos: number = margin
    ) => {
        let currentY = y;
        page.drawText(title, { x: xPos, y: currentY, size: 10, font: helvetica, color: lightGray });
        currentY -= 15;
        page.drawText(name, { x: xPos, y: currentY, size: 12, font: helveticaBold, color: textColor });
        currentY -= 14;

        if (address) {
            page.drawText(truncateText(address, 45), { x: xPos, y: currentY, size: 10, font: helvetica, color: textColor });
            currentY -= 12;
        }

        if (email) {
            page.drawText(email, { x: xPos, y: currentY, size: 10, font: helvetica, color: textColor });
            currentY -= 12;
        }

        if (phone) {
            page.drawText(phone, { x: xPos, y: currentY, size: 10, font: helvetica, color: textColor });
            currentY -= 12;
        }

        if (taxId) {
            page.drawText(`Tax ID: ${taxId}`, { x: xPos, y: currentY, size: 10, font: helvetica, color: textColor });
        }
    };

    // From (Business) - Only render if businessName provided
    if (document.businessName) {
        drawAddressBlock("From:", document.businessName, document.businessAddress, document.businessEmail, document.businessPhone, document.taxId, margin);
    }

    // Bill To / Quote To (Customer/Client)
    const billToLabel = document.documentType === "quotation" ? "Quote To:" : "Bill To:";
    drawAddressBlock(billToLabel, document.customerName, document.customerAddress, document.customerEmail, undefined, undefined, width / 2 + 20);

    // --- PAID STAMP FOR RECEIPTS ---
    if (document.documentType === "receipt") {
        const stampText = "PAID";
        const stampSize = 40;
        const stampWidth = helveticaBold.widthOfTextAtSize(stampText, stampSize);
        // Position stamp on top right or center
        page.drawRectangle({
            x: width - margin - stampWidth - 20,
            y: height - 120,
            width: stampWidth + 20,
            height: stampSize + 10,
            color: rgb(0.9, 1, 0.9), // Light green bg
            borderColor: rgb(0, 0.6, 0),
            borderWidth: 2,
        });
        page.drawText(stampText, {
            x: width - margin - stampWidth - 10,
            y: height - 110,
            size: stampSize,
            font: helveticaBold,
            color: rgb(0, 0.6, 0), // Green text
            rotate: degrees(0),
        });
    }

    y -= 100; // Space for table

    // --- TABLE HEADER ---
    const colX = { desc: margin + 10, qty: width - 230, price: width - 160, total: width - 80 };

    page.drawRectangle({
        x: margin,
        y: y - 5,
        width: width - (margin * 2),
        height: 25,
        color: tableHeaderBg,
    });

    const drawHeaderCol = (text: string, x: number) => {
        page.drawText(text, { x, y: y + 2, size: 10, font: helveticaBold, color: tableHeaderText });
    };

    drawHeaderCol("Description", colX.desc);
    drawHeaderCol("Qty", colX.qty);
    drawHeaderCol("Unit Price", colX.price);
    drawHeaderCol("Amount", colX.total);

    y -= 25;

    // --- TABLE ROWS ---
    let subtotal = 0;
    const currencyFormatter = new Intl.NumberFormat("en-US", { style: "currency", currency: document.currency });

    for (const item of document.items) {
        const lineTotal = item.quantity * item.unitPrice;
        subtotal += lineTotal;

        // Draw Row
        page.drawText(truncateText(item.description, 50), { x: colX.desc, y, size: 10, font: helvetica, color: textColor });
        page.drawText(item.quantity.toString(), { x: colX.qty, y, size: 10, font: helvetica, color: textColor });
        page.drawText(currencyFormatter.format(item.unitPrice), { x: colX.price, y, size: 10, font: helvetica, color: textColor });
        page.drawText(currencyFormatter.format(lineTotal), { x: colX.total, y, size: 10, font: helvetica, color: textColor });

        // Line separator
        y -= 5;
        page.drawLine({
            start: { x: margin, y },
            end: { x: width - margin, y },
            thickness: 0.5,
            color: rgb(0.9, 0.9, 0.9),
        });
        y -= 20;

        // Page break check (simple)
        if (y < 100) break;
    }

    y -= 10;

    // --- TOTALS ---
    const totalsX = width - 200;
    const drawTotalLine = (label: string, value: string, isBold: boolean = false) => {
        page.drawText(label, {
            x: totalsX,
            y,
            size: isBold ? 12 : 10,
            font: isBold ? helveticaBold : helvetica,
            color: textColor
        });
        page.drawText(value, {
            x: totalsX + 100,
            y,
            size: isBold ? 12 : 10,
            font: isBold ? helveticaBold : helvetica,
            color: textColor
        });
        y -= 20;
    };

    drawTotalLine("Subtotal:", currencyFormatter.format(subtotal));

    // Tax - always show if strictly positive, even for non-invoices if set (default 0)
    const taxAmount = (subtotal * document.taxPercent) / 100;
    if (document.taxPercent > 0) {
        drawTotalLine(`Tax (${document.taxPercent}%):`, currencyFormatter.format(taxAmount));
    }

    if (document.discount && document.discount > 0) {
        drawTotalLine("Discount:", `-${currencyFormatter.format(document.discount)}`);
    }

    // Shipping cost for proforma
    const shippingCost = (document.documentType === "proforma" && document.shippingCost) ? document.shippingCost : 0;
    if (shippingCost > 0) {
        drawTotalLine("Shipping:", currencyFormatter.format(shippingCost));
    }

    // Divider
    y += 5;
    page.drawLine({ start: { x: totalsX, y }, end: { x: width - margin, y }, thickness: 1, color: primaryColor });
    y -= 20;

    const total = subtotal + taxAmount - (document.discount || 0) + shippingCost;
    drawTotalLine("Total:", currencyFormatter.format(total), true);

    // --- FOOTER INFO (Notes, Terms, Signature) ---
    // Move Y back up to where totals started, but on the Left side
    let footerY = y + 80; // Approximate
    if (footerY < 100) footerY = 100; // Safety

    // Quotation-specific footer: Validity, Scope & Limitations
    if (document.documentType === "quotation") {
        if (document.validityPeriod) {
            page.drawText("Validity Period:", { x: margin, y: footerY, size: 10, font: helveticaBold, color: textColor });
            footerY -= 15;
            page.drawText(document.validityPeriod, { x: margin, y: footerY, size: 9, font: helvetica, color: textColor });
            footerY -= 25;
        }

        if (document.scopeLimitations) {
            page.drawText("Scope & Limitations:", { x: margin, y: footerY, size: 10, font: helveticaBold, color: textColor });
            footerY -= 15;
            // Split long scope text into multiple lines
            const scopeLines = document.scopeLimitations.split("\n");
            for (const line of scopeLines) {
                if (footerY < 50) break;
                page.drawText(truncateText(line, 90), { x: margin, y: footerY, size: 9, font: helvetica, color: textColor });
                footerY -= 12;
            }
            footerY -= 10;
        }

        if (document.notes) {
            page.drawText("Notes:", { x: margin, y: footerY, size: 10, font: helveticaBold, color: textColor });
            footerY -= 15;
            page.drawText(truncateText(document.notes, 80), { x: margin, y: footerY, size: 9, font: helvetica, color: textColor });
            footerY -= 25;
        }

        // Acceptance Signature Section
        if (footerY > 70) {
            footerY -= 10;
            page.drawText("Client Acceptance:", { x: margin, y: footerY, size: 10, font: helveticaBold, color: textColor });
            footerY -= 20;
            if (document.signature) {
                page.drawText(document.signature, { x: margin, y: footerY, size: 16, font: helvetica, color: primaryColor });
            }
            page.drawLine({ start: { x: margin, y: footerY - 5 }, end: { x: margin + 180, y: footerY - 5 }, thickness: 1, color: textColor });
            page.drawText("Signature", { x: margin, y: footerY - 18, size: 8, font: helvetica, color: lightGray });

            page.drawLine({ start: { x: margin + 220, y: footerY - 5 }, end: { x: margin + 380, y: footerY - 5 }, thickness: 1, color: textColor });
            page.drawText("Date", { x: margin + 220, y: footerY - 18, size: 8, font: helvetica, color: lightGray });
        }
    } else if (document.documentType === "proforma") {
        // Proforma footer: Bank details, Terms of Sale, Delivery Terms
        if (document.bankDetails) {
            page.drawText("Bank Details:", { x: margin, y: footerY, size: 10, font: helveticaBold, color: textColor });
            footerY -= 15;
            const bankLines = document.bankDetails.split("\n");
            for (const line of bankLines) {
                if (footerY < 50) break;
                page.drawText(truncateText(line, 90), { x: margin, y: footerY, size: 9, font: helvetica, color: textColor });
                footerY -= 12;
            }
            footerY -= 10;
        }

        if (document.termsOfSale) {
            page.drawText("Terms of Sale:", { x: margin, y: footerY, size: 10, font: helveticaBold, color: textColor });
            footerY -= 15;
            page.drawText(document.termsOfSale, { x: margin, y: footerY, size: 9, font: helvetica, color: textColor });
            footerY -= 25;
        }

        if (document.deliveryTerms) {
            page.drawText("Delivery Terms:", { x: margin, y: footerY, size: 10, font: helveticaBold, color: textColor });
            footerY -= 15;
            page.drawText(document.deliveryTerms, { x: margin, y: footerY, size: 9, font: helvetica, color: textColor });
            footerY -= 25;
        }

        if (document.notes) {
            page.drawText("Notes:", { x: margin, y: footerY, size: 10, font: helveticaBold, color: textColor });
            footerY -= 15;
            page.drawText(truncateText(document.notes, 80), { x: margin, y: footerY, size: 9, font: helvetica, color: textColor });
            footerY -= 25;
        }

        if (document.signature && footerY > 60) {
            footerY -= 10;
            page.drawText(document.signature, { x: margin, y: footerY, size: 16, font: helvetica, color: primaryColor });
            page.drawLine({ start: { x: margin, y: footerY - 5 }, end: { x: margin + 150, y: footerY - 5 }, thickness: 1, color: textColor });
            page.drawText("Authorized Signature", { x: margin, y: footerY - 18, size: 8, font: helvetica, color: lightGray });
        }
    } else {
        // Invoice / Receipt / Proforma footer
        if (document.notes) {
            page.drawText("Notes:", { x: margin, y: footerY, size: 10, font: helveticaBold, color: textColor });
            footerY -= 15;
            page.drawText(truncateText(document.notes, 80), { x: margin, y: footerY, size: 9, font: helvetica, color: textColor });
            footerY -= 25;
        }

        if (document.paymentTerms) {
            page.drawText("Payment Terms:", { x: margin, y: footerY, size: 10, font: helveticaBold, color: textColor });
            footerY -= 15;
            page.drawText(document.paymentTerms, { x: margin, y: footerY, size: 9, font: helvetica, color: textColor });
            footerY -= 30;
        }

        if (document.signature) {
            footerY -= 10;
            page.drawText(document.signature, { x: margin, y: footerY, size: 16, font: helvetica, color: primaryColor });
            page.drawLine({ start: { x: margin, y: footerY - 5 }, end: { x: margin + 150, y: footerY - 5 }, thickness: 1, color: textColor });
            page.drawText("Authorized Signature", { x: margin, y: footerY - 18, size: 8, font: helvetica, color: lightGray });
        }
    }

    // --- BRANDING ---
    // Branding - only for free users
    if (!isPremium) {
        page.drawText("Generated by invoices-at-best.com", {
            x: width - 180,
            y: 30,
            size: 9,
            font: helvetica,
            color: lightGray,
        });
    }

    return pdfDoc.save();
}

async function addWatermark(
    page: ReturnType<PDFDocument["addPage"]>,
    font: Awaited<ReturnType<PDFDocument["embedFont"]>>,
    width: number,
    height: number,
    watermarkText: string
): Promise<void> {
    const fontSize = 72;
    const textWidth = font.widthOfTextAtSize(watermarkText, fontSize);

    // Geometry for 45-degree rotation correction
    const angle = 45 * (Math.PI / 180);
    const cosA = Math.cos(angle);
    const sinA = Math.sin(angle);

    const x = (width / 2) - (textWidth / 2) * cosA + (fontSize / 4) * sinA;
    const y = (height / 2) - (textWidth / 2) * sinA - (fontSize / 4) * cosA;

    page.drawText(watermarkText, {
        x: x,
        y: y,
        size: fontSize,
        font: font,
        color: rgb(0.6, 0.6, 0.6),
        opacity: 0.22,
        rotate: degrees(45),
    });
}

function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength - 3) + "...";
}
