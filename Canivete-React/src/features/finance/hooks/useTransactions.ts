import { useEffect, useState } from "react"
import type { Transaction } from "../types/transaction"
import type { TransactionTypes } from "../types/transactionTypes"

export default function useTransactions () {
    function getStoredTransactions () {
        const raw = localStorage.getItem('transactions')

        if (!raw) {return []}

        return JSON.parse(raw) as Transaction[]
    }

    const [transactions, setTransactions] = useState<Transaction[]>(() => getStoredTransactions())

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

        const newTransaction: Transaction = {
            id: Math.floor(Math.random() * 100000),
            description,
            value,
            type
        }

        setTransactions(state => [...state, newTransaction])
    }

    function deleteTransaction (id: number) {
        setTransactions((state) => state.filter(t => t.id !== id))
    }

    return {transactions, addTransaction, deleteTransaction}
}