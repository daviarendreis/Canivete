import { Outlet, useLocation } from 'react-router-dom'
import BackButton from './components/BackButton'
import { Flex, Theme } from '@radix-ui/themes'
import { useEffect, useState } from 'react'
import ToggleThemeButton from './components/ToggleThemeButton'

type Themes = 'dark' | 'light'

export default function RootLayout () {
    const location = useLocation()

    function getStoredTheme() {
        const raw = localStorage.getItem('theme')
        const defaultValue: Themes = 'dark'

        if (!raw) return defaultValue

        return raw as Themes
    }

    const [theme, setTheme] = useState<Themes>(() => getStoredTheme())

    useEffect(() => {
        localStorage.setItem('theme', theme)
    }, [theme])


    return (
        <Theme appearance={theme}>
        <Flex direction={'row'} gap={'2'} justify={'between'}>
            {(location.pathname !== '/') && <BackButton/>}
            <ToggleThemeButton theme={theme} setTheme={setTheme}  />
        </Flex>
        <Outlet/>
        </Theme>
    )
}