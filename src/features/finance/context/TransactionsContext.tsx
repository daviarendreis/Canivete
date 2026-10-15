import { createContext } from "react";
import type { Category } from "../types/category";
import type { Transaction } from "../types/transaction";

export interface TransactionsContextTypes {
    transactions: Transaction[]
    addTransaction: (e: React.FormEvent<HTMLFormElement>, categories: Category[]) => void
    deleteTransaction: (id: string) => void
}

export const TransactionsContext = createContext<TransactionsContextTypes | null>(null)