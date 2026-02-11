import { PDFDocument, StandardFonts, rgb, degrees } from "pdf-lib";
import { DocumentPayload, DOCUMENT_CONFIG } from "@/types/invoice";
import { getTemplate } from "@/lib/templates";

export async function generateDocumentPDF(
    document: DocumentPayload,
    isPremium: boolean
): Promise<Uint8Array> {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();

    // Embed all fonts for versatility
    const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const times = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const timesBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
    const courier = await pdfDoc.embedFont(StandardFonts.Courier);
    const courierBold = await pdfDoc.embedFont(StandardFonts.CourierBold);

    const { width, height } = page.getSize();
    const config = DOCUMENT_CONFIG[document.documentType];
    const template = getTemplate(document.templateId || "simple");
    const tplStyle = template.style;

    // Font Selection Helper
    const getFont = (isBold: boolean = false) => {
        switch (tplStyle.fontFamily) {
            case "serif": return isBold ? timesBold : times;
            case "mono": return isBold ? courierBold : courier;
            default: return isBold ? helveticaBold : helvetica;
        }
    };

    const regularFont = getFont(false);
    const boldFont = getFont(true);

    // Apply watermark ONLY if NOT premium
    if (!isPremium) {
        await addWatermark(page, helveticaBold, width, height, config.watermark);
    }

    // Colors
    const primaryColor = rgb(tplStyle.headerColor.r, tplStyle.headerColor.g, tplStyle.headerColor.b);
    const accentColor = rgb(tplStyle.accentColor.r, tplStyle.accentColor.g, tplStyle.accentColor.b);
    const textColor = rgb(0.12, 0.12, 0.12);
    const lightGray = rgb(0.45, 0.45, 0.45);

    // Layout Config
    const isModern = tplStyle.layout === "modern";
    const isExecutive = tplStyle.layout === "executive";
    const isMinimal = tplStyle.layout === "minimal";
    const margin = 50;
    let y = height - 50;

    // --- DECORATIONS ---

    // Page Border (Executive/Minimal)
    if (tplStyle.showBorder) {
        page.drawRectangle({
            x: 20,
            y: 20,
            width: width - 40,
            height: height - 40,
            borderColor: primaryColor,
            borderWidth: isMinimal ? 0.5 : 2,
            opacity: isMinimal ? 0.3 : 1,
        });
    }

    // Header Background Fill
    if (tplStyle.headerBgFill) {
        page.drawRectangle({
            x: tplStyle.showBorder ? 22 : 0,
            y: height - 120,
            width: tplStyle.showBorder ? width - 44 : width,
            height: 120,
            color: primaryColor,
        });
    }

    // Accent Line
    if (tplStyle.showAccentLine) {
        page.drawRectangle({
            x: tplStyle.showBorder ? 22 : 0,
            y: height - (tplStyle.headerBgFill ? 124 : 4),
            width: tplStyle.showBorder ? width - 44 : width,
            height: 4,
            color: accentColor,
        });
    }

    // --- LOGO & TITLE ---

    const headerTextColor = tplStyle.headerBgFill ? rgb(1, 1, 1) : primaryColor;
    const headerSubTextColor = tplStyle.headerBgFill ? rgb(0.9, 0.9, 0.9) : lightGray;

    // Logic for positioning - Modern aligns right
    const logoX = isModern ? width - margin - 100 : margin; // Placeholder, refined below
    const titleBaseX = isModern ? margin : (width - margin); // Modern flips standard: Title Left, Logo Right? No, let's Stick to standard

    // Let's define layout blocks:
    // Standard: Title Left, Details Right.
    // Modern: Title Right, Details Left.

    const blockLeftX = margin;
    const blockRightX = width / 2 + 20;

    // Header Y position adjustment
    if (tplStyle.headerBgFill) y -= 20;

    let titleX = margin;
    let titleAlignRight = false;

    if (isModern) {
        titleAlignRight = true;
        titleX = width - margin;
    }

    // Draw Logo
    let logoWidth = 0;
    if (document.logoBase64) {
        try {
            const base64Data = document.logoBase64.split(",")[1];
            const logoBytes = Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0));
            const logoImage = document.logoBase64.includes("image/png")
                ? await pdfDoc.embedPng(logoBytes)
                : await pdfDoc.embedJpg(logoBytes);

            const logoDims = logoImage.scale(1);
            const maxW = 120, maxH = 50;
            const scale = Math.min(maxW / logoDims.width, maxH / logoDims.height, 1);
            logoWidth = logoDims.width * scale;
            const logoH = logoDims.height * scale;

            const xPos = isModern ? width - margin - logoWidth : margin;
            page.drawImage(logoImage, {
                x: xPos,
                y: y - logoH + 10,
                width: logoWidth,
                height: logoH,
            });

            // Adjust title position if on same side
            if (!isModern) titleX += logoWidth + 20;
        } catch (e) { /* ignore */ }
    }

    // Draw Title
    const titleSize = 32;
    const titleWidth = boldFont.widthOfTextAtSize(config.title, titleSize);
    page.drawText(config.title, {
        x: titleAlignRight ? titleX - titleWidth : titleX,
        y: y,
        size: titleSize,
        font: boldFont,
        color: headerTextColor,
    });

    // Document Number & Dates
    y -= 40;
    const metaX = isModern ? margin : width - 200; // Modern puts meta on left

    page.drawText(`# ${document.documentNumber}`, {
        x: metaX, y, size: 12, font: boldFont, color: headerTextColor
    });

    y -= 15;
    page.drawText(`Date: ${document.issueDate}`, {
        x: metaX, y, size: 10, font: regularFont, color: headerSubTextColor
    });

    if (document.dueDate) {
        y -= 12;
        page.drawText(`Due: ${document.dueDate}`, {
            x: metaX, y, size: 10, font: regularFont, color: headerSubTextColor
        });
    }

    // --- ADDRESS BLOCKS ---
    y = height - 160;

    // Helper for address
    const drawAddress = (title: string, name: string, addr?: string, email?: string, phone?: string, xArg?: number) => {
        let curY = y;
        page.drawText(title, { x: xArg!, y: curY, size: 10, font: regularFont, color: lightGray });
        curY -= 15;
        page.drawText(name, { x: xArg!, y: curY, size: 12, font: boldFont, color: primaryColor });
        curY -= 14;
        if (addr) {
            const lines = addr.split('\n'); // Basic multiline support
            lines.forEach(line => {
                page.drawText(truncateText(line, 45), { x: xArg!, y: curY, size: 10, font: regularFont, color: textColor });
                curY -= 12;
            });
        }
        if (email) { page.drawText(email, { x: xArg!, y: curY, size: 10, font: regularFont, color: textColor }); curY -= 12; }
        if (phone) { page.drawText(phone, { x: xArg!, y: curY, size: 10, font: regularFont, color: textColor }); }
    };

    // Swap positions for Modern layout
    const fromX = isModern ? blockRightX : blockLeftX;
    const toX = isModern ? blockLeftX : blockRightX;

    if (document.businessName) {
        drawAddress("From:", document.businessName, document.businessAddress, document.businessEmail, document.businessPhone, fromX);
    }
    drawAddress(document.documentType === "quotation" ? "Quote To:" : "Bill To:", document.customerName, document.customerAddress, document.customerEmail, undefined, toX);

    y -= 100;

    // --- TABLE ---
    const colX = { desc: margin + 10, qty: width - 230, price: width - 160, total: width - 80 };

    // Header Style
    if (tplStyle.tableStyle === "filled" || tplStyle.tableStyle === "bold") {
        page.drawRectangle({
            x: margin, y: y - 5,
            width: width - (margin * 2), height: 25,
            color: tplStyle.tableStyle === "filled" ? primaryColor : rgb(0.95, 0.95, 0.95),
        });
    } else if (tplStyle.tableStyle === "minimal") {
        page.drawLine({
            start: { x: margin, y: y + 20 }, end: { x: width - margin, y: y + 20 },
            thickness: 1, color: textColor
        });
        page.drawLine({
            start: { x: margin, y: y - 5 }, end: { x: width - margin, y: y - 5 },
            thickness: 1, color: textColor
        });
    }

    const tableHeaderColor = tplStyle.tableStyle === "filled" ? rgb(1, 1, 1) : primaryColor;
    page.drawText("Description", { x: colX.desc, y: y + 2, size: 10, font: boldFont, color: tableHeaderColor });
    page.drawText("Qty", { x: colX.qty, y: y + 2, size: 10, font: boldFont, color: tableHeaderColor });
    page.drawText("Price", { x: colX.price, y: y + 2, size: 10, font: boldFont, color: tableHeaderColor });
    page.drawText("Total", { x: colX.total, y: y + 2, size: 10, font: boldFont, color: tableHeaderColor });

    y -= 25;

    // Items
    let subtotal = 0;
    const currencyFormatter = new Intl.NumberFormat("en-US", { style: "currency", currency: document.currency });

    for (const item of document.items) {
        const lineTotal = item.quantity * item.unitPrice;
        subtotal += lineTotal;

        page.drawText(truncateText(item.description, 50), { x: colX.desc, y, size: 10, font: regularFont, color: textColor });
        page.drawText(item.quantity.toString(), { x: colX.qty, y, size: 10, font: regularFont, color: textColor });
        page.drawText(currencyFormatter.format(item.unitPrice), { x: colX.price, y, size: 10, font: regularFont, color: textColor });
        page.drawText(currencyFormatter.format(lineTotal), { x: colX.total, y, size: 10, font: regularFont, color: textColor });

        y -= 20;
        if (y < 100) break; // Simple page break handling (just stop)
    }

    // --- TOTALS ---
    y -= 10;
    const totalsX = width - 220;
    page.drawLine({ start: { x: totalsX, y: y + 20 }, end: { x: width - margin, y: y + 20 }, thickness: 1, color: rgb(0.9, 0.9, 0.9) });

    const drawTotal = (label: string, value: string, isBig: boolean = false) => {
        page.drawText(label, { x: totalsX, y, size: isBig ? 12 : 10, font: isBig ? boldFont : regularFont, color: isBig ? primaryColor : lightGray });
        page.drawText(value, { x: totalsX + 100, y, size: isBig ? 12 : 10, font: isBig ? boldFont : regularFont, color: isBig ? primaryColor : textColor });
        y -= 20;
    };

    drawTotal("Subtotal:", currencyFormatter.format(subtotal));
    const taxAmount = (subtotal * document.taxPercent) / 100;
    if (taxAmount > 0) drawTotal(`Tax (${document.taxPercent}%):`, currencyFormatter.format(taxAmount));
    if (document.discount) drawTotal("Discount:", `-${currencyFormatter.format(document.discount)}`);

    y -= 5;
    page.drawLine({ start: { x: totalsX, y: y + 20 }, end: { x: width - margin, y: y + 20 }, thickness: 1, color: accentColor });
    drawTotal("Total:", currencyFormatter.format(subtotal + taxAmount - (document.discount || 0)), true);

    // --- FOOTER / NOTES ---
    let footerY = 220; // Start higher to accommodate more content

    // Helper to draw footer text block
    const drawFooterBlock = (label: string, text: string) => {
        if (!text) return;
        page.drawText(label, { x: margin, y: footerY, size: 10, font: boldFont, color: primaryColor });
        footerY -= 15;
        // Simple word wrap or truncation
        const lines = text.split('\n');
        for (const line of lines) {
            page.drawText(truncateText(line, 90), { x: margin, y: footerY, size: 9, font: regularFont, color: textColor });
            footerY -= 12;
        }
        footerY -= 10;
    };

    // Quotation Specific
    if (document.documentType === "quotation") {
        if (document.validityPeriod) drawFooterBlock("Validity Period:", document.validityPeriod);
        if (document.scopeLimitations) drawFooterBlock("Scope & Limitations:", document.scopeLimitations);

        // Acceptance Signature Section
        if (footerY > 80) {
            footerY -= 20;
            page.drawText("Client Acceptance:", { x: margin, y: footerY, size: 10, font: boldFont, color: textColor });
            footerY -= 40;

            // Signature Line
            page.drawLine({ start: { x: margin, y: footerY }, end: { x: margin + 200, y: footerY }, thickness: 1, color: lightGray });
            page.drawText("Signature", { x: margin, y: footerY - 15, size: 8, font: regularFont, color: lightGray });

            page.drawLine({ start: { x: margin + 250, y: footerY }, end: { x: margin + 400, y: footerY }, thickness: 1, color: lightGray });
            page.drawText("Date", { x: margin + 250, y: footerY - 15, size: 8, font: regularFont, color: lightGray });
        }
    }
    // Proforma Specific
    else if (document.documentType === "proforma") {
        if (document.bankDetails) drawFooterBlock("Bank Details:", document.bankDetails);
        if (document.termsOfSale) drawFooterBlock("Terms of Sale:", document.termsOfSale);
        if (document.deliveryTerms) drawFooterBlock("Delivery Terms:", document.deliveryTerms);
    }

    // Common Fields (Notes, Payment Terms)
    if (document.notes) drawFooterBlock("Notes:", document.notes);
    if (document.documentType === "invoice" && document.paymentTerms) drawFooterBlock("Payment Terms:", document.paymentTerms);

    // Authorized Signature (for sender)
    if (document.signature) {
        const sigY = 60;
        page.drawText(document.signature, { x: width - 200, y: sigY + 10, size: 14, font: regularFont, color: primaryColor }); // Simulated handwriting font?
        page.drawLine({ start: { x: width - 200, y: sigY }, end: { x: width - margin, y: sigY }, thickness: 1, color: lightGray });
        page.drawText("Authorized Signature", { x: width - 200, y: sigY - 15, size: 8, font: regularFont, color: lightGray });
    }

    // Branding (Free only)
    if (!isPremium) {
        page.drawText("Generated by invoices-at-best.com", {
            x: width / 2 - 80, y: 20, size: 8, font: regularFont, color: lightGray
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
