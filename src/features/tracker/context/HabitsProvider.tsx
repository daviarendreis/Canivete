import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"
import { colors, type RadixColors } from "../../../utils/colors"
import type { Habit } from "../types/habit"
import { useEffect, useState, type ReactNode } from "react"
import { getToday, verifyIsCompletedToday } from "../logic/streak"
import { HabitsContext, type HabitsContextTypes } from "./HabitsContext"

dayjs.extend(customParseFormat)

interface StoredHabits {
    id: string | number
    name: string
    color: RadixColors
    completedDates: string[]
}

interface HabitsProviderProps {
    children: ReactNode
}

export default function HabitsProvider ({children}: HabitsProviderProps) {
    function getStoredHabits () {
            const raw = localStorage.getItem('habits')

            if (!raw) return []

            const storedHabits = JSON.parse(raw) as StoredHabits[]

            return storedHabits.map(h => typeof h.id === 'number' ? {...h, id: crypto.randomUUID()} : h) as Habit[]
        }
    
    const [habits, setHabits] = useState<Habit[]>(() => getStoredHabits())
    
    useEffect(() => {
                localStorage.setItem('habits', JSON.stringify(habits))
    }, [habits])
    
    function addHabit (e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const name = formData.get("name")?.toString() || 'Habit'
        const colorRaw = formData.get("color")?.toString()
        const color: RadixColors = typeof colorRaw === "string" && colors.includes(colorRaw as RadixColors) ? colorRaw as RadixColors  : colors[0] 

        const newHabit: Habit = {
            id: crypto.randomUUID(),
            name,
            color,
            completedDates: []
        }

        setHabits((state) => [...state, newHabit])
    }

    function removeHabit (id: string) {
        setHabits((state) => state.filter(currentHabit => currentHabit.id !== id))
    }

    function editHabit (e: React.SubmitEvent<HTMLFormElement>, habit: Habit) {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const name = formData.get("name")?.toString() || habit.name
        
        const newHabit: Habit = {...habit, name: name}

        setHabits((state) => state.map((currentHabit) => currentHabit.id === habit.id ? newHabit : currentHabit))
    }

    function markToday (habit: Habit) {
        const isCompletedToday = verifyIsCompletedToday(habit?.completedDates)

        if (!isCompletedToday) {
            const today = getToday()
            const newDates = [...habit.completedDates, today]

            const newHabit: Habit = {...habit, completedDates: newDates}

            setHabits((state) => state.map((currentHabit) => currentHabit.id === habit.id ? newHabit : currentHabit))
        }
    }

    function unmarkToday (habit: Habit) {
        const isCompletedToday = verifyIsCompletedToday(habit?.completedDates)

        if (isCompletedToday) {
            const today = getToday()
            const newDates = habit.completedDates.filter(d => d !== today)

            const newHabit: Habit = {...habit, completedDates: newDates}

            setHabits((state) => state.map((currentHabit) => currentHabit.id === habit.id ? newHabit : currentHabit))
        }
    }

        const value: HabitsContextTypes = { habits, addHabit, removeHabit, editHabit, markToday, unmarkToday }

        return (
            <HabitsContext value={value}>
                {children}
            </HabitsContext>
        )
}