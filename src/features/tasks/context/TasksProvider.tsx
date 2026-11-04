import { useEffect, useState, type ReactNode } from "react"
import type { Priority } from "../types/priority"
import type { Task } from "../types/task"
import { TasksContext, type TasksContextType } from "./TasksContext"


interface StoredTask {
    id: string | number
    name: string
    description: string
    time: string
    priority: Priority
}

interface TasksProviderProps {
    children: ReactNode
}

export default function TasksProvider ({children}: TasksProviderProps) {
    function getStoredTasks () {
            const raw = localStorage.getItem('todos')
    
            if (!raw) return []
    
            const storedTasks = JSON.parse(raw) as StoredTask[]

            return storedTasks.map(task => typeof task.id === 'number' ? {...task, id: crypto.randomUUID()} : task) as Task[]
        }
    
    const [tasks, setTasks] = useState<Task[]>(() => getStoredTasks())
    const [editingTaskId, setEditingTaskId] = useState<string | null>(null)

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(tasks))
    }, [tasks])

    function getFormData (e: React.FormEvent<HTMLFormElement>) {
        const formData = new FormData(e.currentTarget)
        const name = formData.get("name")?.toString() || "Task"
        const time = formData.get("time")?.toString() || "12:00"
        const description = formData.get("description")?.toString() || "Perform this task"
        const priorityRaw = formData.get("priority")?.toString()
        const priority = (priorityRaw === 'low' ||
                         priorityRaw === 'medium' ||
                         priorityRaw === 'high') ? priorityRaw as Priority : 'low'

        return {name, time, description, priority}
    }
    
    function addTask  (e: React.SubmitEvent<HTMLFormElement>)  {
            e.preventDefault()
    
            const {name, time, description, priority} = getFormData(e)
    
            const newTask: Task = {
                id: crypto.randomUUID(),
                name: name,
                time: time,
                description: description,
                priority: priority
            }
    
            setTasks((state) => [...state, newTask])
            e.currentTarget.reset()
    }

    function deleteTask  (id: string)  {
        const remainingTasks = tasks.filter((t) => t.id !== id)
        setTasks(remainingTasks)
        
    }

    function editTask (e: React.SubmitEvent<HTMLFormElement>, id: string )  {
        e.preventDefault()

        const {name, time, description, priority} = getFormData(e)

        setTasks((state) => state.map((task) => task.id === id ? { ...task, name, time, description, priority } : task))
        setEditingTaskId(null)
    }

        const lowPriorityTasks = tasks.filter(t => t.priority === 'low')

        const mediumPriorityTasks = tasks.filter(t => t.priority === 'medium')

        const highPriorityTasks = tasks.filter(t => t.priority === 'high')

    const value: TasksContextType = { tasks, lowPriorityTasks, mediumPriorityTasks, highPriorityTasks, addTask, deleteTask, editTask, editingTaskId, setEditingTaskId }

    return (
        <TasksContext value={value}>
            {children}
        </TasksContext>
    )
}