import type { TransactionTypes } from "./transactionTypes"

export interface Transaction {
    id: number
    description: string,
    value: number,
    type: TransactionTypes
}