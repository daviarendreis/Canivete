import { useEffect, useState, type ReactNode } from "react"
import { chartColors, nextAvailableColor } from "../../../utils/colors"
import type { Category } from "../types/category"
import type { TransactionTypes } from "../types/transactionTypes"
import { filterCategories } from "../logic/filterCategories"
import { CategoriesContext, type CategoriesContextTypes } from "./CategoriesContext"

interface CategoriesProviderProps {
    children: ReactNode
}

export default function CategoriesProvider ({children}: CategoriesProviderProps) {
    const categoriesRaw: Category[] = [
    {
        name: 'Salary',
        type: 'inbound',
        
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
        type: 'outbound',
        color: 'cyan'
    }, {
        name: 'Food',
        type: 'outbound',
        color: 'tomato'
    }, {
        name: 'Transport',
        type: 'outbound',
        color: 'yellow'
    }, {
        name: 'Health / Education',
        type: 'outbound',
        color: 'grass'
    }, {
        name: 'Subscription',
        type: 'outbound',
        color: "purple"
    }, {
        name: 'Investment / reserve',
        type: 'outbound',
        color: 'pink'
    }
]   
    function getStoredCategories (): Category[] {
    const raw = localStorage.getItem('finance-categories')
    if (!raw) return categoriesRaw
    
    const stored = JSON.parse(raw) as Category[]
    
    return stored.reduce<Category[]>((acc, cat) => {
        if (cat.type === 'inbound' || cat.color) {
            acc.push(cat)
            return acc
        }
        
        const outboundSoFar = acc.filter(c => c.type === 'outbound')
        const color = nextAvailableColor(outboundSoFar, chartColors)
        acc.push({ ...cat, color })
        return acc
    }, [])
}
    
    const [categories, setCategories] = useState<Category[]>(() => getStoredCategories())

    useEffect(() => {
        localStorage.setItem('finance-categories', JSON.stringify(categories))
    }, [categories])

    function addCategory (e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)

        const name = formData.get('name')?.toString() || 'Category'
        const typeRaw = formData.get('type')?.toString()
        const type: TransactionTypes = typeRaw === 'outbound' ? 'outbound' : 'inbound'

        if (categories.some(c => c.name === name && c.type === type)) {
            alert('Category with this name already exists')
            return
        }
        
        const newCategory: Category = {
            name,
            type
        }

        const outboundCategories = filterCategories(categories, 'outbound')

        if (type === 'outbound') {
            newCategory.color = nextAvailableColor(outboundCategories, chartColors)
        }

        setCategories(state => [...state, newCategory])
    }

    const value: CategoriesContextTypes = {categories, addCategory}

    return (
        <CategoriesContext value={value}>
            {children}
        </CategoriesContext>
    )
}