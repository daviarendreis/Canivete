import { Box, Flex, Heading, Text } from "@radix-ui/themes";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import { Link } from 'react-router';
import type { ComponentType, CSSProperties } from "react";
import type { RadixColor } from "../../../utils/colors";
import type { AppRoute } from "../../../utils/routes";

interface AppCardProps {
      icon: ComponentType,
      name: string,
      color: RadixColor,
      description: string,
      to: AppRoute,
      summary: string
}


export default function AppCard ({icon, name, color, description, to, summary}: AppCardProps) {
    const Icon = icon

    const appColorVars = {
        '--app-color-a3': `var(--${color}-a3)`,
        '--app-color-a7': `var(--${color}-a7)`,
        '--app-color-a8': `var(--${color}-a8)`,
        '--app-color-8': `var(--${color}-8)`,
        '--app-color-9': `var(--${color}-9)`,
        '--app-color-11': `var(--${color}-11)`,
    } as CSSProperties

    return (
        <Link to={to} className="app-card" style={appColorVars}>
            <Flex justify={'between'} align={'start'}>
                <span className="icon-tile" style={{ background: `var(--${color}-9)`, color: `var(--${color}-contrast)` }}>
                    <Icon />
                </span>
                <ArrowTopRightIcon className="app-card-arrow" width={18} height={18} />
            </Flex>
            <Box>
                <Heading as="h2" size={'6'}>{name}</Heading>
                <Text as="p" size={'2'} color="gray" mt={'1'}>{description}</Text>
            </Box>
            <Text as="p" size={'2'} weight={'medium'} className="app-card-summary">{summary}</Text>
        </Link>
    )
}
