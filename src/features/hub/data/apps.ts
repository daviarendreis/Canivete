import { ActivityLogIcon, BackpackIcon, CalendarIcon, ReaderIcon } from '@radix-ui/react-icons';
import type { ComponentType} from 'react';
import type { RadixColor } from '../../../utils/colors';
import type { AppRoute } from '../../../utils/routes';


export interface App {
    icon: ComponentType,
    name: string,
    color: RadixColor,
    description: string,
    to: AppRoute
}

export const apps: App[] = [
    {
        icon: ActivityLogIcon,
        name: "To-do List",
        description: "What needs to be done today",
        color: "green",
        to: "/todo"
    }, {
        icon: CalendarIcon,
        name: "Tracker",
        description: "Your habits, your streaks",
        color: "purple",
        to: "/tracker"
    }, {
        icon: BackpackIcon,
        name: "Finance",
        description: "Where your money goes",
        color: "sky",
        to: "/finance"
    }, {
        icon: ReaderIcon,
        name: 'Notes',
        description: "Your notes, organized",
        color: 'gold',
        to: "/notes"
    }
]
