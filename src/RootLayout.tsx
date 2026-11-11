import { Link, Outlet, useLocation, useNavigate } from 'react-router'
import { Text, Theme } from '@radix-ui/themes'
import { useEffect, useState } from 'react'
import { HomeIcon } from '@radix-ui/react-icons'
import { TabBar } from 'glisse'
import ToggleThemeButton from './components/ToggleThemeButton'
import RouterLink from './components/RouterLink'
import TasksProvider from './features/tasks/context/TasksProvider'
import HabitsProvider from './features/tracker/context/HabitsProvider'
import CategoriesProvider from './features/finance/context/CategoriesProvider'
import TransactionsProvider from './features/finance/context/TransactionsProvider'
import NotesProvider from './features/notes/context/NotesProvider'
import NotebooksProvider from './features/notes/context/NotebooksProvider'
import { apps } from './features/hub/data/apps'
import type { RadixColor } from './utils/colors'

type ThemeMode = 'dark' | 'light'

const HUB_ACCENT: RadixColor = 'iris'

const tabs = [
    { value: '/', label: 'Home', icon: <HomeIcon />, href: '/' },
    ...apps.map(app => {
        const Icon = app.icon
        return { value: app.to, label: app.name, icon: <Icon />, href: app.to }
    })
]

export default function RootLayout () {
    const location = useLocation()
    const navigate = useNavigate()

    function getStoredTheme() {
        const raw = localStorage.getItem('theme')
        const defaultValue: ThemeMode = 'dark'

        if (!raw) return defaultValue

        return raw as ThemeMode
    }

    const [theme, setTheme] = useState<ThemeMode>(() => getStoredTheme())

    useEffect(() => {
        localStorage.setItem('theme', theme)
        // Glisse reads the colour scheme from data-theme
        document.documentElement.dataset.theme = theme
    }, [theme])

    const section = `/${location.pathname.split('/')[1] ?? ''}`
    const accentColor = apps.find(app => app.to === section)?.color ?? HUB_ACCENT

    return (
        <Theme appearance={theme} accentColor={accentColor} grayColor='sand' radius='large' panelBackground='translucent'>
            <div className='app-shell'>
                <header className='app-topbar'>
                    <Link to='/' className='app-brand'>
                        <span className='app-brand-mark'>
                            <svg width='16' height='16' viewBox='0 0 32 32' aria-hidden>
                                <rect x='4' y='14' width='24' height='8' rx='4' fill='currentColor' />
                                <path d='M9 14 L23 5.5 a2 2 0 0 1 2.7 2.7 L17 14 Z' fill='currentColor' opacity='0.7' />
                            </svg>
                        </span>
                        <Text size='3' weight='bold'>Canivete</Text>
                    </Link>
                    <ToggleThemeButton theme={theme} setTheme={setTheme} />
                </header>

                <main className='app-main'>
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
                </main>

                <div className='app-tabbar'>
                    <TabBar
                        aria-label='Apps'
                        items={tabs}
                        value={section}
                        link={RouterLink}
                        onValueChange={(value) => { if (value !== section) navigate(value) }}
                    />
                </div>
            </div>
        </Theme>
    )
}
