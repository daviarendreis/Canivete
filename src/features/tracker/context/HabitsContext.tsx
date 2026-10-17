import { createContext } from "react";
import type { Habit } from "../types/habit";

export interface HabitsContextTypes {
    habits: Habit[]
    addHabit: (e: React.SubmitEvent<HTMLFormElement>) => void
    removeHabit: (id: string) => void
    editHabit: (e: React.SubmitEvent<HTMLFormElement>, habit: Habit) => void
    markToday: (habit: Habit) => void
    unmarkToday: (habit: Habit) => void
}

export const HabitsContext = createContext<HabitsContextTypes | null>(null)