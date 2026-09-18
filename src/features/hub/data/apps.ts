import { ActivityLogIcon, BackpackIcon, RulerSquareIcon } from '@radix-ui/react-icons';
import type { ComponentType} from 'react';
import type { RadixColors } from '../../../utils/colors';

type Links = "/todo" | "/tracker" | "/finance"

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
        icon: RulerSquareIcon,
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
    }
]
