import type { Category } from "./category"
import type { TransactionTypes } from "./transactionTypes"

export interface Transaction {
    id: number
    description: string
    value: number
    category: Category
    type: TransactionTypes
}