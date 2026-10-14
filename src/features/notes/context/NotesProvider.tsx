import React, { useEffect, useState, type ReactNode } from "react";
import { NotesContext, type NotesContextType } from "./NotesContext";
import type { Page } from "../types/Page";
import { getCurrentTime } from "../../../utils/date";

interface NotesProviderProps {
    children: ReactNode
}

type StoredPage = Omit<Partial<Page>, "createdAt" | "updatedAt"> & {
    createdAt?: string
    updatedAt?: string
}

export default function NotesProvider ({children}: NotesProviderProps) {
    function getStoredPages () {
        const raw = localStorage.getItem('pages')

        if (!raw) return []

        const pages = JSON.parse(raw) as StoredPage[]

        return pages.map((page): StoredPage => {
            if (!page.createdAt && !page.updatedAt) {
                const now = getCurrentTime()
                return {...page, createdAt: now, updatedAt: now}
            } else if (!page.createdAt) {
                return {...page, createdAt: getCurrentTime()}
            } else if (!page.updatedAt) {
                return {...page, updatedAt: getCurrentTime()}
            }

            return page
        }) as Page[]
    }

    const [ pages, setPages] = useState<Page[]>(() => getStoredPages())

    useEffect(() => {
        localStorage.setItem('pages', JSON.stringify(pages))
    }, [pages])
    
    function addPage (e: React.SubmitEvent<HTMLFormElement>, notebookId: string | undefined ) {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const title = formData.get('title')?.toString() || 'Page'
        const now = getCurrentTime()

        const newPage: Page = {
            id: crypto.randomUUID(),
            title,
            content: '',
            notebookId: notebookId || '1',
            createdAt: now,
            updatedAt: now
        }
        
        setPages(state => [...state, newPage])
    }

    function updatePageContent(e: React.ChangeEvent<HTMLTextAreaElement>, page: Page) {

        const newPage: Page = {...page, content: e.currentTarget.value, updatedAt: getCurrentTime()}

        setPages(state => state.map(currentPage => currentPage.id === page.id ? newPage : currentPage))
    }

    function deletePage (id: string) {
        setPages(state => state.filter(page => page.id !== id))
    }

    function changeNotebookId (pageId: string, newNotebookId: string) {
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