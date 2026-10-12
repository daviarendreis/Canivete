import type { RadixColors } from "../../../utils/colors"

export interface Habit {
    id: string
    name: string
    color: RadixColors
    completedDates: string[]
}