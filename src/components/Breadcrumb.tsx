import { ChevronRightIcon } from '@radix-ui/react-icons'
import { Flex, Text } from '@radix-ui/themes'
import { Fragment } from 'react'
import { Link } from 'react-router'

export interface BreadcrumbItem {
    label: string
    to?: string
}

interface BreadcrumbProps {
    items: BreadcrumbItem[]
}

export default function Breadcrumb ({ items }: BreadcrumbProps) {
    return (
        <nav aria-label='Breadcrumb' className='breadcrumb'>
            <Flex align='center' gap='1' minWidth='0'>
                {items.map((item, index) => {
                    const isLast = index === items.length - 1
                    return (
                        <Fragment key={`${item.label}-${index}`}>
                            {index > 0 && <ChevronRightIcon className='breadcrumb-separator' aria-hidden />}
                            {item.to && !isLast ? (
                                <Link to={item.to} className='breadcrumb-link'>{item.label}</Link>
                            ) : (
                                <Text size='2' weight='medium' truncate aria-current={isLast ? 'page' : undefined}>
                                    {item.label}
                                </Text>
                            )}
                        </Fragment>
                    )
                })}
            </Flex>
        </nav>
    )
}
