import { Box, Flex, Heading, Text } from '@radix-ui/themes'
import type { ReactNode } from 'react'

interface PageHeaderProps {
    eyebrow?: ReactNode
    eyebrowIcon?: ReactNode
    title: ReactNode
    subtitle?: ReactNode
    actions?: ReactNode
}

export default function PageHeader ({ eyebrow, eyebrowIcon, title, subtitle, actions }: PageHeaderProps) {
    return (
        <Flex
            direction={{ initial: 'column', sm: 'row' }}
            align={{ initial: 'start', sm: 'end' }}
            justify='between'
            gap='4'
            mt='4'
            mb='6'
        >
            <Box>
                {eyebrow && (
                    <span className='page-eyebrow'>
                        {eyebrowIcon}
                        {eyebrow}
                    </span>
                )}
                <Heading as='h1' size='9' mt={eyebrow ? '3' : '0'} className='page-title'>
                    {title}
                </Heading>
                {subtitle && (
                    <Text as='p' size='3' color='gray' mt='2'>
                        {subtitle}
                    </Text>
                )}
            </Box>
            {actions && (
                <Flex gap='2' align='center' wrap='wrap'>
                    {actions}
                </Flex>
            )}
        </Flex>
    )
}
