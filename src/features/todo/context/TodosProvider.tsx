import { useEffect, useState, type ReactNode } from "react"
import type { Priority } from "../types/priority"
import type { Todo } from "../types/todo"
import { TodosContext, type TodosContextTypes } from "./TodosContext"


interface StoredTodos {
    id: string | number
    name: string
    description: string
    time: string
    priority: Priority
}

interface TodosProviderProps {
    children: ReactNode
}

export default function TodosProvider ({children}: TodosProviderProps) {
    function getStoredTodos () {
            const raw = localStorage.getItem('todos')
    
            if (!raw) return []
    
            const todosRaw = JSON.parse(raw) as StoredTodos[]

            return todosRaw.map(todo => typeof todo.id === 'number' ? {...todo, id: crypto.randomUUID()} : todo) as Todo[]
        }
    
    const [todos, setTodos] = useState<Todo[]>(() => getStoredTodos())
    const [editingTodoId, setEditingTodoId] = useState<string | null>(null)

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])

    function getFormData (e: React.FormEvent<HTMLFormElement>) {
        const formData = new FormData(e.currentTarget)
        const name = formData.get("name")?.toString() || "To-do"
        const time = formData.get("time")?.toString() || "12:00"
        const description = formData.get("description")?.toString() || "Perform this task"
        const priorityRaw = formData.get("priority")?.toString()
        const priority = (priorityRaw === 'low' ||
                         priorityRaw === 'medium' ||
                         priorityRaw === 'high') ? priorityRaw as Priority : 'low'

        return {name, time, description, priority}
    }
    
    function addTodo  (e: React.SubmitEvent<HTMLFormElement>)  {
            e.preventDefault()
    
            const {name, time, description, priority} = getFormData(e)
    
            const newTodo: Todo = {
                id: crypto.randomUUID(),
                name: name,
                time: time,
                description: description,
                priority: priority
            }
    
            setTodos((state) => [...state, newTodo])
            e.currentTarget.reset()
    }

    function removeTodo  (id: string)  {
        const todosFiltred = todos.filter((t) => t.id !== id)
        setTodos(todosFiltred)
        
    }

    function editTodo (e: React.SubmitEvent<HTMLFormElement>, id: string )  {
        e.preventDefault()

        const {name, time, description, priority} = getFormData(e)

        setTodos((state) => state.map((todo) => todo.id === id ? { ...todo, name, time, description, priority } : todo))
        setEditingTodoId(null)
    }

        const lowPriorityTodos = todos.filter(t => t.priority === 'low')

        const mediumPriorityTodos = todos.filter(t => t.priority === 'medium')

        const highPriorityTodos = todos.filter(t => t.priority === 'high')

    const value: TodosContextTypes = { todos, lowPriorityTodos, mediumPriorityTodos, highPriorityTodos, addTodo, removeTodo, editTodo, editingTodoId, setEditingTodoId }

    return (
        <TodosContext value={value}>
            {children}
        </TodosContext>
    )
}