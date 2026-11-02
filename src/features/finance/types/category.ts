import type { RadixColor } from './../../../utils/colors';
import type { TransactionType } from "./transactionType"

export interface Category {
    name: string
    type: TransactionType
    color?: RadixColor
}