import type { RadixColor } from "../../../utils/colors"

export interface Habit {
    id: string
    name: string
    color: RadixColor
    completedDates: string[]
}