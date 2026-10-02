import type { RadixColors } from './../../../utils/colors';
import type { TransactionTypes } from "./transactionTypes"

export interface Category {
    name: string
    type: TransactionTypes
    color?: RadixColors
}