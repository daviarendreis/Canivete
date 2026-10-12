import { useEffect, useState } from "react"
import type { TransactionTypes } from "../types/transactionTypes"
import dayjs from "dayjs"
import type { Transaction } from "../types/transaction"
import type { Category } from "../types/category"

interface StoredTransactions {
    id: string | number
    description: string
    value: number
    type: TransactionTypes
    category: Category
    createdAt: string
}

export default function useTransactions () {
    function getStoredTransactions () {
        const raw = localStorage.getItem('transactions')

        if (!raw) {return []}

        const transactionsRaw = JSON.parse(raw) as StoredTransactions[]

        return transactionsRaw.map(transaction => typeof transaction.id === 'number' ? {...transaction, id: crypto.randomUUID()} : transaction) as Transaction[]
    }

    const [transactions, setTransactions] = useState<Transaction[]>(() => getStoredTransactions())
    

    useEffect(() => {
        localStorage.setItem('transactions', JSON.stringify(transactions))
    }, [transactions])

    function addTransaction (e: React.FormEvent<HTMLFormElement>, categories: Category[]) {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const description = formData.get('description')?.toString() || ''
        const value = Number(formData.get('value'))
        const typeRaw = formData.get('type')?.toString()
        const type: TransactionTypes = typeof typeRaw === 'string' ? typeRaw as TransactionTypes : 'inbound'
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

    return {transactions, addTransaction, deleteTransaction}
}