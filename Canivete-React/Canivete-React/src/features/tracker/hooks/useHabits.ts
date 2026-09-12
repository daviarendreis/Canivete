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
    
        return {habits, setHabits, colors, getToday, verifyIsCompletedToday}
}