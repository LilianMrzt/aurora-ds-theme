import '@testing-library/jest-dom/vitest'

// Suppress jsdom uncaught error reporting for expected test errors
// This prevents the noisy "Error: Uncaught [Error: ...]" messages
// when testing that errors are thrown correctly
if (typeof window !== 'undefined') {
    window.addEventListener('error', (event) => {
        // Suppress errors that are expected in tests
        if (event.message?.includes('useTheme must be used within a ThemeProvider')) {
            event.preventDefault()
        }
    })
}

