import dayjs from "dayjs"

export function getTodayLabel () {
    // e.g. "Wednesday, November 11"
    return dayjs().format('dddd, MMMM D')
}

export function getCurrentTime () {
    const now = dayjs().format("YYYY-MM-DD HH:mm:ss")
    console.log(now)
    return now
}