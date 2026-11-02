import type { Category } from "./category"
import type { TransactionType } from "./transactionType"

export interface Transaction {
    id: string
    description: string
    value: number
    type: TransactionType
    category: Category
    createdAt: string
}