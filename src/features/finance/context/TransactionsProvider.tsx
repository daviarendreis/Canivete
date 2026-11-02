import { useEffect, useState, type ReactNode } from "react"
import type { Category } from "../types/category"
import type { Transaction } from "../types/transaction"
import type { TransactionType } from "../types/transactionType"
import dayjs from "dayjs"
import { TransactionsContext, type TransactionsContextType } from "./TransactionsContext"
import useCategories from "../hooks/useCategories"

interface StoredTransaction {
    id: string | number
    description: string
    value: number
    type: TransactionType
    category: Category
    createdAt: string
}

interface TransactionsProviderProps {
    children: ReactNode
}

export default function TransactionsProvider ({children}: TransactionsProviderProps) {
    function getStoredTransactions () {
        const raw = localStorage.getItem('transactions')

        if (!raw) {return []}

        const storedTransactions = JSON.parse(raw) as StoredTransaction[]

        return storedTransactions.map(transaction => typeof transaction.id === 'number' ? {...transaction, id: crypto.randomUUID()} : transaction) as Transaction[]
    }

    const [transactions, setTransactions] = useState<Transaction[]>(() => getStoredTransactions())
    const { categories } = useCategories()

    useEffect(() => {
        localStorage.setItem('transactions', JSON.stringify(transactions))
    }, [transactions])

    function addTransaction (e: React.FormEvent<HTMLFormElement> ) {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const description = formData.get('description')?.toString() || ''
        const value = Number(formData.get('value'))
        const typeRaw = formData.get('type')?.toString()
        const type: TransactionType = typeof typeRaw === 'string' ? typeRaw as TransactionType : 'inbound'
        const categoryRaw = formData.get('category')?.toString()
        const category= categories.find(cat => cat.name === categoryRaw)

        if (!category) {
            return
        }

        const newTransaction: Transaction = {
            id: crypto.randomUUID(),
            description,
            value,
            type,
            category,
            createdAt: dayjs().format('YYYY-MM-DD')
        }

        setTransactions(state => [...state, newTransaction])
    }

    function deleteTransaction (id: string) {
        setTransactions((state) => state.filter(t => t.id !== id))
    }

    const value: TransactionsContextType = { transactions, addTransaction, deleteTransaction }

    return (
        <TransactionsContext value={value}>
            {children}
        </TransactionsContext>
    )
}