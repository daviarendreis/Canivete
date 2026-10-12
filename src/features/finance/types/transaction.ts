import type { Category } from "./category"
import type { TransactionTypes } from "./transactionTypes"

export interface Transaction {
    id: string
    description: string
    value: number
    type: TransactionTypes
    category: Category
    createdAt: string
}