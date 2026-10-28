import { Box, Button, Card, Flex, Heading, Strong, Text } from "@radix-ui/themes";
import { Link } from 'react-router';
import type { ComponentType } from "react";
import type { RadixColors } from "../../../utils/colors";
import type { Links } from "../../../utils/links";

interface AppCardProps {
      icon: ComponentType,
      name: string,
      color: RadixColors,
      description: string,
      to: Links,
      summary: string
}


export default function AppCard ({icon, name, color, description, to, summary}: AppCardProps) {
    const Icon = icon
    return (
        <Box maxWidth={'30rem'} minWidth={'16rem'}>
              <Card size={'2'} >
                <Flex direction={'column'} align={'center'} gap={'5'}>
                  <Heading as="h4" size={'5'}>{<Icon/>} - {name}</Heading>
                  <Text as="p">{description}</Text>
                  <Card>
                    <Text as="p"><Strong>{summary}</Strong></Text>
                  </Card>
                  <Button color={color} variant="soft" asChild>
                    <Link to={to} >Access</Link>
                  </Button>
                </Flex>
              </Card>
        </Box>
    )
}