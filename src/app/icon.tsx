import { ImageResponse } from 'next/og'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const size = {
    width: 32,
    height: 32,
}
export const contentType = 'image/png'

// Image generation
export default function Icon() {
    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    fontSize: 20,
                    background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    borderRadius: '6px', // Rounded corners for a modern app icon look
                    fontWeight: 800,
                    fontFamily: 'sans-serif',
                    letterSpacing: '-1px',
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
