# Invoice Generator

A production-ready Next.js 14 App Router SaaS invoice generator with PDF download and watermark support.

## Features

- Professional invoice form with dynamic line items
- PDF generation with pdf-lib
- Automatic 45° rotated watermark at 15% opacity
- Real-time calculations for subtotal, tax, and total
- Automatic PDF download
- Responsive design with TailwindCSS
- TypeScript throughout

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## File Structure

```
src/
├── app/
│   ├── api/
│   │   └── invoice/
│   │       └── generate-pdf/
│   │           └── route.ts
│   ├── invoice/
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Footer.tsx
│   ├── Header.tsx
│   └── InvoiceForm.tsx
├── lib/
│   ├── pdf-generator.ts
│   └── validation.ts
└── types/
    └── invoice.ts
```

## Deployment

Deploy to Vercel:

```bash
npm run build
vercel --prod
```

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- TailwindCSS
- pdf-lib
