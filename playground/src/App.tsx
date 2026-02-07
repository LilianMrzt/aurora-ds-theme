import { useState } from 'react'

import { ThemeDemo } from './components'
import { lightTheme, darkTheme } from './theme'
import { ThemeProvider } from '../../src'

const App = () => {
    const [isDark, setIsDark] = useState(false)
    const theme = isDark ? darkTheme : lightTheme

    const toggleTheme = () => setIsDark((prev) => !prev)

    return (
        <ThemeProvider theme={theme}>
            <ThemeDemo
                isDark={isDark}
                onToggleTheme={toggleTheme}
            />
        </ThemeProvider>
    )
}

export default App
