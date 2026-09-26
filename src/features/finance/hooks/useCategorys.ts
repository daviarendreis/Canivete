import { useEffect, useState } from "react"
import type { Category } from "../types/category"

export default function useCategorys () {
    const inboundCategoriesRaw: Category[] = [
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
    }
]

    const outboundCategoriesRaw: Category[] = [
    {
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
    function getStoredInboundCategories () {
        const raw = localStorage.getItem('Finance-inboundCategories')

        if (!raw) return inboundCategoriesRaw

        return JSON.parse(raw) as Category[]
    }

    function getStoredOutboundCategories () {
        const raw = localStorage.getItem('Finance-outboundCategories')

        if (!raw) return outboundCategoriesRaw

        return JSON.parse(raw) as Category[]
    }
    
    const [inboundCategories, setInboundCategories] = useState<Category[]>(() => getStoredInboundCategories())
    const [outboundCategories, setOutboundCategories] = useState<Category[]>(() => getStoredOutboundCategories())

    useEffect(() => {
        localStorage.setItem('Finance-inboundCategories', JSON.stringify(inboundCategories))
    }, [inboundCategories])

    useEffect(() => {
        localStorage.setItem('Finance-outboundCategories', JSON.stringify(outboundCategories))
    }, [outboundCategories])

    function addInboundCategory (name: string){
        const newCategory: Category = {
            name,
            type: 'inbound'
        }

        setInboundCategories(state => [...state, newCategory])
    }

    function addOutboundCategory (name: string){
        const newCategory: Category = {
            name,
            type: 'outbound'
        }

        setOutboundCategories(state => [...state, newCategory])
    }

    return {inboundCategories, outboundCategories, addInboundCategory, addOutboundCategory}
}