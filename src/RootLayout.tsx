import { Outlet, useLocation } from 'react-router'
import BackButton from './components/BackButton'
import { Flex, Theme } from '@radix-ui/themes'
import { useEffect, useState } from 'react'
import ToggleThemeButton from './components/ToggleThemeButton'
import TasksProvider from './features/tasks/context/TasksProvider'
import HabitsProvider from './features/tracker/context/HabitsProvider'
import CategoriesProvider from './features/finance/context/CategoriesProvider'
import TransactionsProvider from './features/finance/context/TransactionsProvider'
import NotesProvider from './features/notes/context/NotesProvider'
import NotebooksProvider from './features/notes/context/NotebooksProvider'

type ThemeMode = 'dark' | 'light'

export default function RootLayout () {
    const location = useLocation()

    function getStoredTheme() {
        const raw = localStorage.getItem('theme')
        const defaultValue: ThemeMode = 'dark'

        if (!raw) return defaultValue

        return raw as ThemeMode
    }

    const [theme, setTheme] = useState<ThemeMode>(() => getStoredTheme())

    useEffect(() => {
        localStorage.setItem('theme', theme)
    }, [theme])


    return (
        <Theme appearance={theme}>
        <Flex direction={'row'} gap={'2'} justify={'between'}>
            {(location.pathname !== '/') && <BackButton/>}
            <ToggleThemeButton theme={theme} setTheme={setTheme}  />
        </Flex>
        <TasksProvider>
            <HabitsProvider>
                <CategoriesProvider>
                    <TransactionsProvider>
                        <NotesProvider>
                            <NotebooksProvider>
                                <Outlet/>
                            </NotebooksProvider>
                        </NotesProvider>
                    </TransactionsProvider>
                </CategoriesProvider>
            </HabitsProvider>
        </TasksProvider>
        </Theme>
    )
}