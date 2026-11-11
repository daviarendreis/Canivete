import { Box, Flex, Heading, Text } from '@radix-ui/themes'
import type { ReactNode } from 'react'

interface PageHeaderProps {
    title: ReactNode
    subtitle?: ReactNode
    actions?: ReactNode
}

export default function PageHeader ({ title, subtitle, actions }: PageHeaderProps) {
    return (
        <Flex
            align='end'
            justify='between'
            gap='4'
            wrap='wrap'
            mt='2'
            mb='5'
        >
            <Box minWidth='0'>
                <Heading as='h1' size={{ initial: '7', sm: '8' }} className='page-title'>
                    {title}
                </Heading>
                {subtitle && (
                    <Text as='p' size='2' color='gray' mt='1'>
                        {subtitle}
                    </Text>
                )}
            </Box>
            {actions && (
                <Flex gap='2' align='center' wrap='wrap' className='page-actions'>
                    {actions}
                </Flex>
            )}
        </Flex>
    )
}
