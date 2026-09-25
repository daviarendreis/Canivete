import dayjs from "dayjs";
import { Grid } from "@radix-ui/themes";
import type { Habit } from "../types/habit";
import { useMemo } from "react";

interface TrackerGraphicProps {
    habit: Habit
}

export default function TrackerGraphic ({habit}: TrackerGraphicProps) {

    function getAllDaysYear () {
        const startOfYear = dayjs().startOf('year')
        const endOfYear = dayjs().endOf('year')

        const daysYear: dayjs.Dayjs[] = []

        let currentDay = startOfYear

        while (currentDay.isBefore(endOfYear) || currentDay.isSame(endOfYear, 'day')) {
            daysYear.push(currentDay)
            currentDay = currentDay.add(1, 'day')
        }
        return daysYear
    }

    const daysYear = useMemo(() => getAllDaysYear(), []) 

    return (
        <Grid rows={'7'} flow={'column'} style={{gap: "1px"}} overflowX={'auto'}>
            {daysYear.map((day) => {
                const dateKey = day.format('YYYY-MM-DD')
                const isCompleted = habit.completedDates.includes(dateKey)

                return (
                    <div
                        key={dateKey}
                        id={dateKey}
                        title={dateKey}
                        style={{
                            width: '6px',
                            height: '6px',
                            backgroundColor: isCompleted ? `var(--${habit.color}-9)` : `var(--gray-8)`,
                            borderRadius: '1.5px',
                            display: 'block'
                        }}
                    />
                )
            })}
        </Grid>
    )
}