import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { Button } from "glisse"

type ThemeMode = 'dark' | 'light'

type ToggleThemeButtonProps = {
    theme: ThemeMode,
    setTheme: (theme: ThemeMode) => void
}

export default function ToggleThemeButton ({theme, setTheme}: ToggleThemeButtonProps) {

    function toggleTheme () {
        if (theme === 'light') {
            setTheme('dark')
        } else {
            setTheme('light')
        }
    }
    return (
        <Button
            onClick={toggleTheme}
            icon={theme === 'light' ? <MoonIcon/> : <SunIcon/>}
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        />
    )
}
