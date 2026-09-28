import { useEffect, useState } from "react"
import type { TransactionTypes } from "../types/transactionTypes"
import dayjs from "dayjs"
import type { Transaction } from "../types/transaction"
import useCategories from "./useCategories"

export default function useTransactions () {
    function getStoredTransactions () {
        const raw = localStorage.getItem('transactions')

        if (!raw) {return []}

        const transactions = JSON.parse(raw) as Transaction[]

        return transactions
    }

    const [transactions, setTransactions] = useState<Transaction[]>(() => getStoredTransactions())
    const { categories, addCategory } = useCategories()

    useEffect(() => {
        localStorage.setItem('transactions', JSON.stringify(transactions))
    }, [transactions])

    function addTransaction (e: React.FormEvent<HTMLFormElement>) {
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
            id: Math.floor(Math.random() * 100000),
            description,
            value,
            type,
            category,
            createdAt: dayjs().format('YYYY-MM-DD')
        }

        setTransactions(state => [...state, newTransaction])
    }

    function deleteTransaction (id: number) {
        setTransactions((state) => state.filter(t => t.id !== id))
    }

    return {transactions, addTransaction, deleteTransaction, categories, addCategory}
}