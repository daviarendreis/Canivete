import { createContext } from "react";
import type { Habit } from "../types/habit";

export interface HabitsContextType {
    habits: Habit[]
    addHabit: (e: React.SubmitEvent<HTMLFormElement>) => void
    deleteHabit: (id: string) => void
    editHabit: (e: React.SubmitEvent<HTMLFormElement>, habit: Habit) => void
    markToday: (habit: Habit) => void
    unmarkToday: (habit: Habit) => void
}

export const HabitsContext = createContext<HabitsContextType | null>(null)