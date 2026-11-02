import dayjs from "dayjs"

const WEEKDAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday' , 'Saturday']

export function getTodayLabel () {
    const now = dayjs()
    const weekday = now.day()
    const weekdayName = WEEKDAY_NAMES[weekday]
    const todayLabel =`${weekdayName} - ${now.format("DD/MM/YYYY")}`
    return todayLabel
}

export function getCurrentTime () {
    const now = dayjs().format("YYYY-MM-DD HH:mm:ss")
    console.log(now)
    return now
}