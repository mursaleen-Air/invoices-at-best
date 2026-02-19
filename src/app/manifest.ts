
import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Invoices at Best',
        short_name: 'Invoices at Best',
        description: 'Generate professional invoices, receipts, quotations, and proforma invoices instantly.',
        start_url: '/',
        display: 'standalone',
        background_color: '#f0f5ff',
        theme_color: '#4f46e5',
        icons: [
            {
                src: '/icon',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/icon',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    }
}
