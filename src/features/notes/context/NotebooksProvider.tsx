import { useEffect, useState, type ReactNode } from "react";
import type { Notebook } from "../types/Notebook";
import { NotebooksContext, type NotebooksContextType } from "./NotebooksContext";
import useNotes from "../hooks/useNotes";

const PUBLIC_NOTEBOOK_ID = "1"

const notebooksRaw: Notebook[] = [
    {
        id: PUBLIC_NOTEBOOK_ID,
        name: 'Public',
        protected: true
    }
]

interface NotebooksProviderProps {
    children: ReactNode
}

export default function NotebooksProvider ({children}: NotebooksProviderProps) {
    function getStoredNotebooks () {
        const raw = localStorage.getItem('note-notebooks')

        if (!raw) return notebooksRaw

        return JSON.parse(raw) as Notebook[]

    }

    const [notebooks, setNotebooks] = useState<Notebook[]>(() => getStoredNotebooks())
    const { changeNotebookId, pages } = useNotes()

    useEffect(() => {
        localStorage.setItem('note-notebooks', JSON.stringify(notebooks))
    }, [notebooks])

    function addNotebook (e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)

        const name = formData.get('name')?.toString() || `Notebook ${notebooks.length + 1}`

        const newNotebook: Notebook = {
            id: crypto.randomUUID(),
            name,
            protected: false
        }

        setNotebooks(state => [...state, newNotebook])
    }

    function deleteNotebook (id: string) {
        const filteredPages = pages.filter(p => p.notebookId === id)

        filteredPages.forEach(page => changeNotebookId(page.id, PUBLIC_NOTEBOOK_ID))

        setNotebooks(state => state.filter(notebook => notebook.id !== id))
    }

    const value: NotebooksContextType = { notebooks, addNotebook, deleteNotebook }

    return (
        <NotebooksContext.Provider value={value}>
            {children}
        </NotebooksContext.Provider>
    )
    
}