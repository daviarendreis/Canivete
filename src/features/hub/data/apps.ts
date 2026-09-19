import { ActivityLogIcon, BackpackIcon, CalendarIcon, ReaderIcon } from '@radix-ui/react-icons';
import type { ComponentType} from 'react';
import type { RadixColors } from '../../../utils/colors';

type Links = "/todo" | "/tracker" | "/finance" | "/notes"

export interface App {
    icon: ComponentType,
    name: string,
    color: RadixColors,
    description: string,
    to: Links
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
        description: "Your habits, your sequence",
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
        description: "Your daily notes",
        color: 'gold',
        to: "/notes"
    }
]
