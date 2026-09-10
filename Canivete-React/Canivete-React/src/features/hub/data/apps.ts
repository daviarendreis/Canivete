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
        name: "Todo",
        description: "O que precisa ser feito hoje",
        color: "green",
        to: "/todo"
    }, {
        icon: RulerSquareIcon,
        name: "Tracker",
        description: "Seus habitos, sua sequencia",
        color: "purple",
        to: "/tracker"
    }, {
        icon: BackpackIcon,
        name: "Finance",
        description: "Pra onde vai seu dinheiro",
        color: "tomato",
        to: "/finance"
    }
]
