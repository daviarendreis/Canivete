import type { Task } from "../../tasks/types/task";

export default function getNextTask (tasks: Task[]) {
    if (tasks.length <= 0) {
        return "No pending tasks"
    }

    const highPriorityTasks = tasks.filter(t => t.priority === 'high')
    const mediumPriorityTasks = tasks.filter(t => t.priority === 'medium')
    const lowPriorityTasks = tasks.filter(t => t.priority === 'low')

    if (highPriorityTasks.length === 0 && mediumPriorityTasks.length === 0) {
        const sortedTasks = getSortedTasks(lowPriorityTasks)
        const prioritizedTask = sortedTasks[0]

        return `Next: ${prioritizedTask.name}`
    }

    if (highPriorityTasks.length === 0) {
        const sortedTasks = getSortedTasks(mediumPriorityTasks)
        const prioritizedTask = sortedTasks[0]

        return `Next: ${prioritizedTask.name}`
    }

    const sortedTasks = getSortedTasks(highPriorityTasks)
    const prioritizedTask = sortedTasks[0]

    return `Next: ${prioritizedTask.name}`
}

function getSortedTasks (tasks: Task[]) {
    const sortedTasks = [...tasks].sort((task1, task2) => task1.time.localeCompare(task2.time))

    return sortedTasks
}