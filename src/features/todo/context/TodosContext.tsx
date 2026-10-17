import type React from "react";
import type { Todo } from "../types/todo";
import { createContext } from "react";

export interface TodosContextTypes {
    todos: Todo[]
    lowPriorityTodos: Todo[] 
    mediumPriorityTodos: Todo[]
    highPriorityTodos: Todo[]
    addTodo: (e: React.SubmitEvent<HTMLFormElement>) => void
    removeTodo: (id: string) => void
    editTodo: (e: React.SubmitEvent<HTMLFormElement>, id: string ) => void
    editingTodoId: string | null
    setEditingTodoId: React.Dispatch<React.SetStateAction<string | null>>
}

export const TodosContext = createContext<TodosContextTypes | null>(null)
