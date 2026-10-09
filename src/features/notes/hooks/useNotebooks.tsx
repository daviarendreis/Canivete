import { useContext } from "react";
import { NotebooksContext } from "../context/NotebooksContext";

export default function useNotebooks () {
    const context = useContext(NotebooksContext)

    if (context === null) {
        throw new Error('useNotebooks must be used within a NotebooksProvider')
    }

    return context
}