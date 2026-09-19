import { useEffect, useState, type ReactNode } from "react";
import type { Pages } from "../Notes";
import { NotesContext, type NotesContextType } from "./NotesContext";

interface NotesProviderProps {
    children: ReactNode
}

export default function NotesProvider ({children}: NotesProviderProps) {
    function getStoredPages () {
        const raw = localStorage.getItem('pages')

        if (!raw) return []

        return JSON.parse(raw) as Pages[]
    }

    const [ pages, setPages] = useState<Pages[]>(() => getStoredPages())

    useEffect(() => {
        localStorage.setItem('pages', JSON.stringify(pages))
    }, [pages])
    
    function addPage (e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const title = formData.get('title')?.toString() || 'Page'

        const newPage: Pages = {
            id: Math.floor(Math.random() * 1000000),
            title,
            content: ''
        }
        setPages(state => [...state, newPage])
    }

    function updatePageContent(e: React.ChangeEvent<HTMLTextAreaElement>, page: Pages) {

        const newPage: Pages = {...page, content: e.currentTarget.value}

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