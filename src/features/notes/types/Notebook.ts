import type { RadixColors } from "../../../utils/colors"

export interface Notebook {
    id: string
    name: string
    protected: boolean
    color: RadixColors
}