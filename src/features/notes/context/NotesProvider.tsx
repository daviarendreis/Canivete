import { useEffect, useState, type ReactNode } from "react";
import { NotesContext, type NotesContextType } from "./NotesContext";
import type { Page } from "../types/Page";

interface NotesProviderProps {
    children: ReactNode
}

export default function NotesProvider ({children}: NotesProviderProps) {
    function getStoredPages () {
        const raw = localStorage.getItem('pages')

        if (!raw) return []

        return JSON.parse(raw) as Page[]
    }

    const [ pages, setPages] = useState<Page[]>(() => getStoredPages())

    useEffect(() => {
        localStorage.setItem('pages', JSON.stringify(pages))
    }, [pages])
    
    function addPage (e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const title = formData.get('title')?.toString() || 'Page'

        const newPage: Page = {
            id: Math.floor(Math.random() * 1000000),
            title,
            content: ''
        }
        setPages(state => [...state, newPage])
    }

    function updatePageContent(e: React.ChangeEvent<HTMLTextAreaElement>, page: Page) {

        const newPage: Page = {...page, content: e.currentTarget.value}

        setPages(state => state.map(currentPage => currentPage.id === page.id ? newPage : currentPage))
    }

    function deletePage (id: number) {
        setPages(state => state.filter(page => page.id !== id))
    }

    const value:NotesContextType = { pages, addPage, updatePageContent, deletePage}

    return (
        <NotesContext.Provider value={value}>
            {children}
        </NotesContext.Provider>
    )
}