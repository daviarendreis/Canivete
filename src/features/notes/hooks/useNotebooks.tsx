import { useEffect, useState } from "react";
import type { Notebook } from "../types/Notebook";

const notebooksRaw: Notebook[] = [
    {
        id: 1,
        name: 'Public',
        protected: true
    }
]

export default function useNotebooks () {
    function getStoredNotebooks () {
        const raw = localStorage.getItem('note-notebooks')

        if (!raw) return notebooksRaw

        return JSON.parse(raw) as Notebook[]

    }

    const [notebooks, setNotebooks] = useState<Notebook[]>(() => getStoredNotebooks())

    useEffect(() => {
        localStorage.setItem('note-notebooks', JSON.stringify(notebooks))
    }, [notebooks])

    function addNotebook (e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)

        const name = formData.get('name')?.toString() || `Notebook ${notebooks.length + 1}`

        const newNotebook: Notebook = {
            id: Math.floor(Math.random() * 9999999),
            name,
            protected: false
        }

        setNotebooks(state => [...state, newNotebook])
    }

    return { notebooks }
}