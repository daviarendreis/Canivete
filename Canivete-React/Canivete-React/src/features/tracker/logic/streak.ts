import dayjs from "dayjs"

export function getToday () {
    const today = dayjs().format('DD/MM/YYYY')
    return today
}

export function verifyIsCompletedToday(completedDates: string[]) {
    const datesSet = new Set(completedDates)
    const today = getToday()
    
    return datesSet.has(today)
}

export function calculateStreak (completedDates: string[]) {
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