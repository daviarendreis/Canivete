import type { Habit } from './../../tracker/types/habit';
import { verifyIsCompletedToday } from '../../tracker/logic/streak';

export default function getPendingHabits (habits: Habit[]) {
    if (habits.length <= 0) {
        return "No habits yet"
    }

    const pendingHabits = habits.filter(habit => !verifyIsCompletedToday(habit.completedDates))

    if (pendingHabits.length <= 0) {
        return "All habits done today!"
    }

    return pendingHabits.length === 1 ? `1 habit left today!` : `${pendingHabits.length} habits left today!`
}