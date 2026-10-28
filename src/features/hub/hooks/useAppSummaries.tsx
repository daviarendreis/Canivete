import useTransactions from "../../finance/hooks/useTransactions";
import useNotes from "../../notes/hooks/useNotes";
import useTodos from "../../todo/hooks/useTodos";
import useHabits from "../../tracker/hooks/useHabits";
import getLastEditedNotes from "../logic/getLastEditedNotes";
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
    const { todos } = useTodos()
    const { transactions } = useTransactions()
    const { habits } = useHabits()
    const { pages } = useNotes()

    const summaries: Summaries = {
        '/todo': getNextTask(todos),
        '/finance': getMonthBalance(transactions),
        '/tracker': getPendingHabits(habits),
        '/notes': getLastEditedNotes(pages)
    }

    return summaries
    
}