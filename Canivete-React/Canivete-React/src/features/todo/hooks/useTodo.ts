import { useEffect, useState } from "react"
import type { Todo } from "../types/todo"
import type { priority } from "../types/priority"

export default function useTodos ( ) {
    function getLocalStorage () {
            const raw = localStorage.getItem('todos')
    
            if (!raw) return []
    
            const data = JSON.parse(raw) as Todo[]
            return data
        }
    
    const [todos, setTodos] = useState<Todo[]>(() => getLocalStorage())
    const [editingTodoId, setEditingTodoId] = useState<number | null>(null)

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])

    function verifyForm (e: React.FormEvent<HTMLFormElement>) {
        const formData = new FormData(e.currentTarget)
        const name = formData.get("name")?.toString() || "To-do"
        const time = formData.get("time")?.toString() || "12:00"
        const description = formData.get("description")?.toString() || "Realizar essa tarefa"
        const priorityRaw = formData.get("priority")?.toString()
        const priority = (priorityRaw === 'low' ||
                         priorityRaw === 'medium' ||
                         priorityRaw === 'high') ? priorityRaw as priority : 'low'

        return {name, time, description, priority}
    }
    
    function addTodo  (e: React.FormEvent<HTMLFormElement>)  {
            e.preventDefault()
    
            const {name, time, description, priority} = verifyForm(e)
    
            e.currentTarget.reset()
    
            const newTodo: Todo = {
                id: Math.round(Math.random() * 100000),
                name: name,
                time: time,
                description: description,
                priority: priority
            }
    
            setTodos((state) => [...state, newTodo])
            e.currentTarget.reset()
    }

    function removeTodo  (id:number)  {
        const todosFiltred = todos.filter((t) => t.id !== id)
        setTodos(todosFiltred)
        
    }

    function editTodo (e: React.FormEvent<HTMLFormElement>, id:number )  {
        e.preventDefault()

        const {name, time, description, priority} = verifyForm(e)

        setTodos((state) => state.map((todo) => todo.id === id ? { ...todo, name, time, description, priority } : todo))
        setEditingTodoId(null)
    }

    return { todos, addTodo, removeTodo, editTodo, editingTodoId, setEditingTodoId, setTodos } as const
}