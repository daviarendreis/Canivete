import { useState } from "react"
import type { Transaction } from "../types/transaction"

export default function useTransactions () {
    const [transactions, setTransactions] = useState<Transaction[]>([])

    return {transactions, setTransactions}
}