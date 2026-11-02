import type { Category } from "../features/finance/types/category"

export type RadixColor = 'tomato' | 'red' | 'ruby' | 'crimson' | 'pink' | 'plum' | 'purple' | 'violet' |
                        'iris' | 'indigo' | 'blue' | 'cyan' | 'teal' | 'jade' | 'green' | 'grass' |
                        'lime' | 'mint' | 'sky' | 'amber' | 'orange' | 'brown' | 'gold' | 'bronze' | 'gray' | 'yellow'

export const colors: RadixColor[] = ['tomato' , 'red' , 'ruby' , 'crimson' , 'pink' , 'plum' , 'purple' , 'violet' ,
                        'iris' , 'indigo' , 'blue' , 'cyan' , 'teal' , 'jade' , 'green' , 'grass' ,
                        'lime' , 'mint' , 'sky' , 'amber' , 'orange' , 'brown' , 'gold' , 'bronze', 'gray','yellow'
                    ]

export const chartColors: RadixColor[] = ['iris', 'jade', 'orange', 'crimson', 'cyan']

export function nextAvailableColor (existing: Category[], palette: RadixColor[]): RadixColor {
    const used: RadixColor[] = existing.map(cat => cat.color).filter((c): c is RadixColor => c !== undefined)
    const nextAvailable = palette.find(color => !used.includes(color))

    if (nextAvailable) return nextAvailable

    return palette[existing.length % palette.length]
}

export function parseColor(raw: string | undefined): RadixColor {
    if (typeof raw === 'string' && colors.includes(raw as RadixColor)) {
        return raw as RadixColor
    }
    return colors[0]
}