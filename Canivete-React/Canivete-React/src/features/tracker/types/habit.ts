import type { RadixColors } from "../../../utils/colors"

export interface Habit {
    id: number
    name: string
    color: RadixColors
    completedDates: string[]
}