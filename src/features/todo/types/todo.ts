import type { Priority } from "./priority"

export interface Todo {
    id: string
    name: string
    description: string
    time: string
    priority: Priority
}