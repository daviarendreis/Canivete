import { useEffect, useState } from "react"
import type { Category } from "../types/category"
import type { TransactionTypes } from "../types/transactionTypes"

export default function useCategories () {
    const categoriesRaw: Category[] = [
    {
        name: 'Salary',
        type: 'inbound'
    }, {
        name: 'Sale',
        type: 'inbound'
    }, {
        name: 'Extra Income',
        type: 'inbound'
    }, {
        name: 'Investment',
        type: 'inbound'
    }, {
        name: 'Gift',
        type: 'inbound'
    }, {
        name: 'Benefit',
        type: 'inbound'
    }, {
        name: 'Rent',
        type: 'outbound'
    }, {
        name: 'Food',
        type: 'outbound'
    }, {
        name: 'Transport',
        type: 'outbound'
    }, {
        name: 'Health / Education',
        type: 'outbound'
    }, {
        name: 'Subscription',
        type: 'outbound'
    }, {
        name: 'Investment / reserve',
        type: 'outbound'
    }
]   
    function getStoredCategories () {
        const raw = localStorage.getItem('Finance-Categories')

        if (!raw) return categoriesRaw

        return JSON.parse(raw) as Category[]
    }
    
    const [categories, setCategories] = useState<Category[]>(() => getStoredCategories())

    useEffect(() => {
        localStorage.setItem('Finance-Categories', JSON.stringify(categories))
    }, [categories])

    function addCategory (e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)

        const name = formData.get('name')?.toString() || 'Category'
        const typeRaw = formData.get('type')?.toString()
        const type: TransactionTypes = typeof typeRaw === 'string' ? typeRaw as TransactionTypes : 'inbound'
        
        const newCategory: Category = {
            name,
            type
        }

        setCategories(state => [...state, newCategory])
    }

    return {categories, addCategory}
}