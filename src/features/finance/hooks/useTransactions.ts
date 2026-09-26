import { useEffect, useState } from "react"
import type { Transaction } from "../types/transaction"
import type { TransactionTypes } from "../types/transactionTypes"
import useCategorys from "./useCategorys"
import type { Category } from "../types/category"

export default function useTransactions () {
    function getStoredTransactions () {
        const raw = localStorage.getItem('transactions')

        if (!raw) {return []}

        return JSON.parse(raw) as Transaction[]
    }

    const [transactions, setTransactions] = useState<Transaction[]>(() => getStoredTransactions())
    const { outboundCategories, inboundCategories } = useCategorys()
    const allCategories = [...inboundCategories, ...outboundCategories]

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
        const category: Category = allCategories.find(cat => cat.name === categoryRaw) as Category
        if (!category) {
            alert('Please select a valid category')
            return
        }

        const newTransaction: Transaction = {
            id: Math.floor(Math.random() * 100000),
            description,
            value,
            type,
            category
        }
        console.log(newTransaction)
        setTransactions(state => [...state, newTransaction])
    }

    function deleteTransaction (id: number) {
        setTransactions((state) => state.filter(t => t.id !== id))
    }

    return {transactions, addTransaction, deleteTransaction, inboundCategories, outboundCategories}
}