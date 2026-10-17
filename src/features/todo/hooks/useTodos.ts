import { useContext } from "react";
import { TodosContext } from "../context/TodosContext";

export default function useTodos ( ) {
    const context = useContext(TodosContext)

    if (context === null) {
        throw new Error('useTodos must be used within a TodosProvider')
    }

    return context
}