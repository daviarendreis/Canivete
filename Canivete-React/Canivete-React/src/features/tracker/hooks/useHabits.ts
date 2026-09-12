import { useEffect, useState } from "react"
import type { Habit } from "../types/habit"
import type { RadixColors } from "../../../utils/colors"
import dayjs from "dayjs"

export default function useHabits () {
    function getLocalStorage () {
            const raw = localStorage.getItem('habits')
            
            if (!raw) return []
            
            const data = JSON.parse(raw) as Habit[]
    
            return data.map(h => ({...h, completedDates: h.completedDates ?? []}))
        }
    
        const [habits, setHabits] = useState<Habit[]>(() => getLocalStorage())
    
        useEffect(() => {
                localStorage.setItem('habits', JSON.stringify(habits))
            }, [habits])
    
        const colors: RadixColors[] = ['tomato' , 'red' , 'ruby' , 'crimson' , 'pink' , 'plum' , 'purple' , 'violet' ,
                            'iris' , 'indigo' , 'blue' , 'cyan' , 'teal' , 'jade' , 'green' , 'grass' ,
                            'lime' , 'mint' , 'sky' , 'amber' , 'orange' , 'brown' , 'gold' , 'bronze'
                        ]

        function getToday () {
        const today = dayjs().format('DD/MM/YYYY')
        return today
        }

        function verifyIsCompletedToday(completedDates: string[]) {
                const datesSet = new Set(completedDates)
                const today = getToday()
        
                return datesSet.has(today)
        }

        function calculateStreak (completedDates: string[]) {
        const datesSet = new Set(completedDates)
        let date: dayjs.Dayjs = dayjs()

        if (!datesSet.has(date.format('DD/MM/YYYY'))) {
            date = date.subtract(1, 'day')
            if (!datesSet.has(date.format('DD/MM/YYYY'))) {
                return 0
            }
        }
            let streak = 0
        while (datesSet.has(date.format('DD/MM/YYYY'))) {
            streak += 1
            date = date.subtract(1, 'day')
        }
        return streak
        }
    
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
        setHabits((state) => state.filter(h => h.id !== id))
        }
        
        return {habits, setHabits, colors, getToday, verifyIsCompletedToday, calculateStreak, addHabit, removeHabit}
}