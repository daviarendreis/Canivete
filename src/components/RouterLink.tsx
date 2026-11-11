import type { ComponentProps } from 'react'
import { Link } from 'react-router'

type RouterLinkProps = Omit<ComponentProps<'a'>, 'href'> & { href: string }

/** Lets Glisse components that render links (such as TabBar) navigate with React Router. */
export default function RouterLink ({ href, ...props }: RouterLinkProps) {
    return <Link to={href} {...props} />
}
