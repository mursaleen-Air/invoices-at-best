import { ImageResponse } from 'next/og'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const size = {
    width: 180,
    height: 180,
}
export const contentType = 'image/png'

// Image generation
export default function Icon() {
    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    fontSize: 120,
                    background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    borderRadius: '24px', // Softer rounded corners for larger icon
                    fontWeight: 800,
                    fontFamily: 'sans-serif',
                    letterSpacing: '-6px',
                }}
            >
                IB
            </div>
        ),
        // ImageResponse options
        {
            ...size,
        }
    )
}
