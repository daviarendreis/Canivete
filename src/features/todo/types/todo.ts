import type { priority } from "./priority"

export interface Todo {
    id: string
    name: string
    description: string
    time: string
    priority: priority
}