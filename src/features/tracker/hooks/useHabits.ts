import { useContext } from "react";
import { HabitsContext } from "../context/HabitsContext";

export default function useHabits () {
    const context = useContext(HabitsContext)

    if (context === null) {
        throw new Error('useHabits must be used within a HabitsProvider')
    }

    return context
}