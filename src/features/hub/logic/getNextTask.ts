import type { Todo } from "../../todo/types/todo";

export default function getNextTask (todos: Todo[]) {
    if (todos.length <= 0) {
        return "No pending tasks"
    }

    const highPriorityTasks = todos.filter(t => t.priority === 'high')
    const mediumPriorityTasks = todos.filter(t => t.priority === 'medium')
    const lowPriorityTasks = todos.filter(t => t.priority === 'low')

    if (highPriorityTasks.length === 0 && mediumPriorityTasks.length === 0) {
        const ordenedTasks = getOrdenedTasks(lowPriorityTasks)
        const prioritizedTask = ordenedTasks[0]

        return `Next: ${prioritizedTask.name}`
    }

    if (highPriorityTasks.length === 0) {
        const ordenedTasks = getOrdenedTasks(mediumPriorityTasks)
        const prioritizedTask = ordenedTasks[0]

        return `Next: ${prioritizedTask.name}`
    }

    const ordenedTasks = getOrdenedTasks(highPriorityTasks)
    const prioritizedTask = ordenedTasks[0]

    return `Next: ${prioritizedTask.name}`
}

function getOrdenedTasks (todos: Todo[]) {
    const ordenedTasks = [...todos].sort((task1, task2) => task1.time.localeCompare(task2.time))

    return ordenedTasks
}