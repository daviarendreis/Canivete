import type { Todo } from "../../todo/types/todo";

export default function getNextTask (todos: Todo[]) {
    if (todos.length <= 0) {
        return "No pending tasks"
    }

    const highPriorityTasks = todos.filter(t => t.priority === 'high')
    const mediumPriorityTasks = todos.filter(t => t.priority === 'medium')
    const lowPriorityTasks = todos.filter(t => t.priority === 'low')

    if (highPriorityTasks.length === 0 && mediumPriorityTasks.length === 0) {
        const sortedTasks = getOrdenedTasks(lowPriorityTasks)
        const prioritizedTask = sortedTasks[0]

        return `Next: ${prioritizedTask.name}`
    }

    if (highPriorityTasks.length === 0) {
        const sortedTasks = getOrdenedTasks(mediumPriorityTasks)
        const prioritizedTask = sortedTasks[0]

        return `Next: ${prioritizedTask.name}`
    }

    const sortedTasks = getOrdenedTasks(highPriorityTasks)
    const prioritizedTask = sortedTasks[0]

    return `Next: ${prioritizedTask.name}`
}

function getOrdenedTasks (todos: Todo[]) {
    const sortedTasks = [...todos].sort((task1, task2) => task1.time.localeCompare(task2.time))

    return sortedTasks
}