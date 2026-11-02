import type React from "react";
import type { Task } from "../types/task";
import { createContext } from "react";

export interface TasksContextType {
    tasks: Task[]
    lowPriorityTasks: Task[] 
    mediumPriorityTasks: Task[]
    highPriorityTasks: Task[]
    addTask: (e: React.SubmitEvent<HTMLFormElement>) => void
    deleteTask: (id: string) => void
    editTask: (e: React.SubmitEvent<HTMLFormElement>, id: string ) => void
    editingTaskId: string | null
    setEditingTaskId: React.Dispatch<React.SetStateAction<string | null>>
}

export const TasksContext = createContext<TasksContextType | null>(null)
