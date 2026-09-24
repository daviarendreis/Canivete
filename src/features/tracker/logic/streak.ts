import dayjs from "dayjs"

export function getToday () {
    return dayjs().format('YYYY-MM-DD')
}

export function verifyIsCompletedToday(completedDates: string[]) {
    const datesSet = new Set(completedDates)
    const today = getToday()

    return datesSet.has(today)
}

export function calculateStreak (completedDates: string[]) {
    const datesSet = new Set(completedDates)
    let date: dayjs.Dayjs = dayjs()

    if (!datesSet.has(date.format('YYYY-MM-DD'))) {
        date = date.subtract(1, 'day')
        if (!datesSet.has(date.format('YYYY-MM-DD'))) {
            return 0
        }
    }

    let streak = 0
    while (datesSet.has(date.format('YYYY-MM-DD'))) {
        streak += 1
        date = date.subtract(1, 'day')
    }
    return streak
}