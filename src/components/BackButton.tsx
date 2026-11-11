import { useNavigate } from 'react-router'
import { ArrowLeftIcon } from '@radix-ui/react-icons'
import { Button } from 'glisse'

interface BackButtonProps {
    to?: string
    label?: string
}

export default function BackButton ({ to = '/', label = 'Back' }: BackButtonProps) {
    const navigate = useNavigate()

    return (
        <Button
            icon={<ArrowLeftIcon />}
            aria-label={label}
            onClick={() => navigate(to)}
        />
    )
}
