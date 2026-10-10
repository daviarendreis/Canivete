import type { Category } from "../features/finance/types/category"

export type RadixColors = 'tomato' | 'red' | 'ruby' | 'crimson' | 'pink' | 'plum' | 'purple' | 'violet' |
                        'iris' | 'indigo' | 'blue' | 'cyan' | 'teal' | 'jade' | 'green' | 'grass' |
                        'lime' | 'mint' | 'sky' | 'amber' | 'orange' | 'brown' | 'gold' | 'bronze' | 'gray' | 'yellow'

export const colors: RadixColors[] = ['tomato' , 'red' , 'ruby' , 'crimson' , 'pink' , 'plum' , 'purple' , 'violet' ,
                        'iris' , 'indigo' , 'blue' , 'cyan' , 'teal' , 'jade' , 'green' , 'grass' ,
                        'lime' , 'mint' , 'sky' , 'amber' , 'orange' , 'brown' , 'gold' , 'bronze', 'gray','yellow'
                    ]

export const chartColors: RadixColors[] = ['iris', 'jade', 'orange', 'crimson', 'cyan']

export function nextAvailableColor (existing: Category[], palette: RadixColors[]): RadixColors {
    const used: RadixColors[] = existing.map(cat => cat.color).filter((c): c is RadixColors => c !== undefined)
    const nextAvailable = palette.find(color => !used.includes(color))

    if (nextAvailable) return nextAvailable

    return palette[existing.length % palette.length]
}

export function parseColor(raw: string | undefined): RadixColors {
    if (typeof raw === 'string' && colors.includes(raw as RadixColors)) {
        return raw as RadixColors
    }
    return colors[0]
}