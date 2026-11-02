import useTransactions from "../../finance/hooks/useTransactions";
import useNotes from "../../notes/hooks/useNotes";
import useTasks from "../../tasks/hooks/useTasks";
import useHabits from "../../tracker/hooks/useHabits";
import getLastEditedNote from "../logic/getLastEditedNote";
import getMonthBalance from "../logic/getMonthBalance";
import getNextTask from "../logic/getNextTask";
import getPendingHabits from "../logic/getPendingHabits";

interface Summaries {
    '/todo': string,
    '/finance': string,
    '/tracker': string,
    '/notes': string
}

export default function useAppSummaries () {
    const { tasks } = useTasks()
    const { transactions } = useTransactions()
    const { habits } = useHabits()
    const { pages } = useNotes()

    const summaries: Summaries = {
        '/todo': getNextTask(tasks),
        '/finance': getMonthBalance(transactions),
        '/tracker': getPendingHabits(habits),
        '/notes': getLastEditedNote(pages)
    }

    return summaries
    
}