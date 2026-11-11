import dayjs from "dayjs";
import type { Habit } from "../types/habit";
import { useEffect, useMemo, useRef } from "react";

interface TrackerChartProps {
    habit: Habit
}

export default function TrackerChart ({habit}: TrackerChartProps) {

    function getDaysOfYear () {
        const startOfYear = dayjs().startOf('year')
        const endOfYear = dayjs().endOf('year')

        const daysOfYear: dayjs.Dayjs[] = []

        let currentDay = startOfYear

        while (currentDay.isBefore(endOfYear) || currentDay.isSame(endOfYear, 'day')) {
            daysOfYear.push(currentDay)
            currentDay = currentDay.add(1, 'day')
        }
        return daysOfYear
    }

    const daysOfYear = useMemo(() => getDaysOfYear(), [])
    // The year starts on weekday `offset`, so day i sits in week column floor((i + offset) / 7)
    const offset = daysOfYear[0]?.day() ?? 0
    const months = useMemo(() => daysOfYear
        .map((day, index) => ({ day, index }))
        .filter(({ day }) => day.date() === 1)
        .map(({ day, index }) => ({ label: day.format('MMM'), column: Math.floor((index + offset) / 7) + 1 })), [daysOfYear, offset])
    const today = dayjs()
    const scrollerRef = useRef<HTMLDivElement>(null)

    // On narrow screens, start the year view scrolled to today
    useEffect(() => {
        const scroller = scrollerRef.current
        const todayCell = scroller?.querySelector<HTMLElement>('[data-today]')
        if (scroller && todayCell) {
            scroller.scrollLeft = todayCell.offsetLeft - scroller.clientWidth + 48
        }
    }, [])

    return (
        <div className="heatmap-wrap">
        <div className="heatmap-weekdays" aria-hidden>
            <span style={{ gridRow: 2 }}>Mon</span>
            <span style={{ gridRow: 4 }}>Wed</span>
            <span style={{ gridRow: 6 }}>Fri</span>
        </div>
        <div ref={scrollerRef} className="heatmap-scroll">
            <div className="heatmap-months" aria-hidden>
                {months.map(month => (
                    <span key={month.label} style={{ gridColumnStart: month.column }}>{month.label}</span>
                ))}
            </div>
            <div className="heatmap" role="img" aria-label={`${habit.name}: ${habit.completedDates.length} days completed this year`}>
            {daysOfYear.map((day, index) => {
                const dateKey = day.format('YYYY-MM-DD')
                const isCompleted = habit.completedDates.includes(dateKey)

                return (
                    <div
                        key={dateKey}
                        className="heatmap-cell"
                        title={day.format('ddd, MMM D')}
                        data-done={isCompleted ? '' : undefined}
                        data-today={day.isSame(today, 'day') ? '' : undefined}
                        data-future={day.isAfter(today, 'day') ? '' : undefined}
                        style={index === 0 ? { gridRowStart: day.day() + 1 } : undefined}
                    />
                )
            })}
            </div>
        </div>
        </div>
    )
}
