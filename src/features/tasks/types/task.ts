import type { Priority } from "./priority"

export interface Task {
    id: string
    name: string
    description: string
    time: string
    priority: Priority
}