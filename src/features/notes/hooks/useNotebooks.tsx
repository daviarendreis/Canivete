import { useEffect, useState } from "react";
import type { Notebook } from "../types/Notebook";

const notebooksRaw: Notebook[] = [
    {
        id: 1,
        name: 'Public'
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

    return { notebooks }
}