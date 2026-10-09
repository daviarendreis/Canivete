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
        const notebookId = Number(formData.get('notebookId')) || 1

        const newPage: Page = {
            id: Math.floor(Math.random() * 1000000),
            title,
            content: '',
            notebookId
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

    function changeNotebookId (pageId: number, newNotebookId: number) {
        setPages(state => state.map(currentPage => currentPage.id === pageId ?
            {...currentPage, notebookId: newNotebookId} : currentPage))
    }

    const value:NotesContextType = { pages, addPage, updatePageContent, deletePage, changeNotebookId }

    return (
        <NotesContext.Provider value={value}>
            {children}
        </NotesContext.Provider>
    )
}