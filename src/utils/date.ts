import dayjs from "dayjs"

const WEEKDAY_PT = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday' , 'Saturnday']

export function getToday () {
    const now = dayjs()
    const weekday = now.day()
    const weekdayName = WEEKDAY_PT[weekday]
    const textDate =`${weekdayName} - ${now.format("DD/MM/YYYY")}`
    return textDate
}

export function getCurrentTime () {
    const now = dayjs().format("YYYY-MM-DD HH:mm:ss")
    console.log(now)
    return now
}