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
        name: "Tasks",
        description: "What needs to be done, by priority",
        color: "green",
        to: "/todo"
    }, {
        icon: CalendarIcon,
        name: "Habits",
        description: "Small wins, every day",
        color: "purple",
        to: "/tracker"
    }, {
        icon: BackpackIcon,
        name: "Finance",
        description: "Where your money comes and goes",
        color: "sky",
        to: "/finance"
    }, {
        icon: ReaderIcon,
        name: 'Notes',
        description: "Your thoughts, in notebooks",
        color: 'gold',
        to: "/notes"
    }
]
