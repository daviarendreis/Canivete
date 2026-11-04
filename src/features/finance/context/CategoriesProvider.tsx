import { useEffect, useState, type ReactNode } from "react"
import { chartColors, nextAvailableColor } from "../../../utils/colors"
import type { Category } from "../types/category"
import type { TransactionType } from "../types/transactionType"
import { filterCategories } from "../logic/filterCategories"
import { CategoriesContext, type CategoriesContextType } from "./CategoriesContext"

interface CategoriesProviderProps {
    children: ReactNode
}

export default function CategoriesProvider ({children}: CategoriesProviderProps) {
    const defaultCategories: Category[] = [
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
    if (!raw) return defaultCategories
    
    const stored = JSON.parse(raw) as Category[]
    
    return stored.reduce<Category[]>((acc, cat) => {
        if (cat.type === 'inbound' || cat.color) {
            acc.push(cat)
            return acc
        }
        
        const expenseCategoriesSoFar = acc.filter(c => c.type === 'outbound')
        const color = nextAvailableColor(expenseCategoriesSoFar, chartColors)
        acc.push({ ...cat, color })
        return acc
    }, [])
}
    
    const [categories, setCategories] = useState<Category[]>(() => getStoredCategories())

    useEffect(() => {
        localStorage.setItem('finance-categories', JSON.stringify(categories))
    }, [categories])

    function addCategory (e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)

        const name = formData.get('name')?.toString() || 'Category'
        const typeRaw = formData.get('type')?.toString()
        const type: TransactionType = typeRaw === 'outbound' ? 'outbound' : 'inbound'

        if (categories.some(c => c.name === name && c.type === type)) {
            alert('A category with this name already exists')
            return
        }
        
        const newCategory: Category = {
            name,
            type
        }

        const expenseCategories = filterCategories(categories, 'outbound')

        if (type === 'outbound') {
            newCategory.color = nextAvailableColor(expenseCategories, chartColors)
        }

        setCategories(state => [...state, newCategory])
    }

    const value: CategoriesContextType = {categories, addCategory}

    return (
        <CategoriesContext value={value}>
            {children}
        </CategoriesContext>
    )
}