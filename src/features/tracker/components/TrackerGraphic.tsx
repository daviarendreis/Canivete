import dayjs from "dayjs";
import { Grid } from "@radix-ui/themes";
import type { Habit } from "../types/habit";

interface TrackerGraphicProps {
    habit: Habit
}

export default function TrackerGraphic ({habit}: TrackerGraphicProps) {

    function getAllDaysYear () {
        const year = dayjs().format('YYYY')
        const startOfYear = dayjs(`01/01/${year}`)
        const endOfYear = dayjs(`31/12/${year}`)

        const daysYear: dayjs.Dayjs[] = []

        let currentDay = startOfYear

        while (currentDay.isBefore(endOfYear) || currentDay.isSame(endOfYear, 'day')) {
            daysYear.push(currentDay)
            currentDay = currentDay.add(1, 'day')
        }

        return daysYear
    }

    const daysYear = getAllDaysYear()

    return (
        <Grid rows={'7'}>
            {daysYear.map((day) => {
                const dateKey = day.format('YYYY-MM-DD')
                const isCompleted = habit.completedDates.includes(dateKey)

                return (
                    <div
                        key={dateKey}
                        id={dateKey}
                        title={dateKey}
                        style={{
                            width: '8px',
                            height: '8px',
                            backgroundColor: isCompleted ? habit.color : 'gray',
                            borderRadius: '2px',
                            display: 'block'
                        }}
                    />
                )
            })}
        </Grid>
    )
}