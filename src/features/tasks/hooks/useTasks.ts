import { useContext } from "react";
import { TasksContext } from "../context/TasksContext";

export default function useTasks ( ) {
    const context = useContext(TasksContext)

    if (context === null) {
        throw new Error('useTasks must be used within a TasksProvider')
    }

    return context
}