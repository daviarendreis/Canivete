const BLADE = 'M-4.6 0 L-4.6 -27 C-4.6 -35 -1 -40.5 3.2 -43 C4.8 -36 4.8 -30 4.8 -24 L4.8 0 Z'
const ANGLES = [6, 29, 52, 75]
const PIVOT = 'M22 37.6a5.4 5.4 0 1 1 0 10.8a5.4 5.4 0 1 1 0-10.8Zm0 3.5a1.9 1.9 0 1 0 0 3.8a1.9 1.9 0 1 0 0-3.8Z'

interface BrandMarkProps {
    /** Index of the current app's blade (0–3). `null` on the hub: every blade is lit. */
    activeIndex: number | null
    size?: number
}

/**
 * Canivete mark (C.3 · double outline): a fan of four blades, one per app,
 * inside a framed square. Drawn in `currentColor`, so it follows the app accent.
 */
export default function BrandMark ({ activeIndex, size = 32 }: BrandMarkProps) {
    return (
        <svg width={size} height={size} viewBox='0 0 64 64' aria-hidden fill='currentColor'>
            <rect x='2' y='2' width='60' height='60' rx='15' fill='none' stroke='currentColor' strokeWidth='3' />
            <rect x='7' y='7' width='50' height='50' rx='10' fill='none' stroke='currentColor' strokeOpacity='.45' strokeWidth='1.25' />
            {ANGLES.map((angle, i) => (
                <path
                    key={angle}
                    d={BLADE}
                    transform={`translate(22 43) scale(.66) rotate(${angle})`}
                    opacity={activeIndex === null || activeIndex === i ? 1 : 0.4}
                    style={{ transition: 'opacity 300ms ease' }}
                />
            ))}
            <path d={PIVOT} fillRule='evenodd' />
        </svg>
    )
}
