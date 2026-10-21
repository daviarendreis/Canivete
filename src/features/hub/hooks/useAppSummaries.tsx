import useTransactions from "../../finance/hooks/useTransactions";
import useNotes from "../../notes/hooks/useNotes";
import useTodos from "../../todo/hooks/useTodos";
import useHabits from "../../tracker/hooks/useHabits";

export default function useAppSummaries () {
    const { todos } = useTodos()
    const { transactions } = useTransactions()
    const { habits } = useHabits()
    const { pages } = useNotes()


    
}