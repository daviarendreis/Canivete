import { createContext } from "react";
import type { Transaction } from "../types/transaction";

export interface TransactionsContextTypes {
    transactions: Transaction[]
    addTransaction: (e: React.FormEvent<HTMLFormElement> ) => void
    deleteTransaction: (id: string) => void
}

export const TransactionsContext = createContext<TransactionsContextTypes | null>(null)