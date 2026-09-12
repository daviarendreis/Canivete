import { useEffect, useState } from "react"
import type { Habit } from "../types/habit"
import { colors, type RadixColors } from "../../../utils/colors"
import { getToday, verifyIsCompletedToday } from "../logic/streak"

export default function useHabits () {
    function getStoredHabits () {
            const raw = localStorage.getItem('habits')
            
            if (!raw) return []
            
            const storedHabits = JSON.parse(raw) as Habit[]
    
            return storedHabits.map(h => ({...h, completedDates: h.completedDates ?? []}))
        }
    
    const [habits, setHabits] = useState<Habit[]>(() => getStoredHabits())
    
    useEffect(() => {
                localStorage.setItem('habits', JSON.stringify(habits))
    }, [habits])
    
    
    
    function addHabit (e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const name = formData.get("name")?.toString() || 'Habit'
        const colorRaw = formData.get("color")?.toString()
        const color: RadixColors = typeof colorRaw === "string" && colors.includes(colorRaw as RadixColors) ? colorRaw as RadixColors  : colors[0] 

        const newHabit: Habit = {
            id: Math.round(Math.random() * 100000),
            name,
            color,
            completedDates: []
        }

        setHabits((state) => [...state, newHabit])
    }

    function removeHabit (id:number) {
        setHabits((state) => state.filter(currentHabit => currentHabit.id !== id))
    }

    function editHabit (e: React.FormEvent<HTMLFormElement>, habit: Habit) {
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

        return { habits, addHabit, removeHabit, editHabit, markToday, unmarkToday }
}