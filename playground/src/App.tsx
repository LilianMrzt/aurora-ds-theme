import {
    Button,
    Badge,
} from './components'
import {
    ThemeProvider,
    createTheme,
    createStyles,
    colors,
    keyframes,
} from '../../src'


// Création d'un thème de test
const theme = createTheme({
    colors: {
        primary: colors.blue,
        secondary: colors.purple,
        success: colors.emerald,
        warning: colors.amber,
        error: colors.red,
        neutral: colors.gray,
    },
    spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
    },
    radius: {
        sm: '4px',
        md: '8px',
        lg: '16px',
        full: '9999px',
    },
    shadows: {
        sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
    },
})

// Animation de test
const fadeIn = keyframes({
    from: { opacity: 0, transform: 'translateY(-10px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
})

// Styles de la page (createStyles retourne directement les classes, pas un hook)
const pageStyles = createStyles((t: typeof theme) => ({
    container: {
        padding: t.spacing.lg,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        minHeight: '100vh',
        backgroundColor: t.colors.neutral[100],
    },
    header: {
        marginBottom: t.spacing.xl,
        animation: `${fadeIn} 0.5s ease-out`,
    },
    title: {
        fontSize: '2rem',
        fontWeight: 700,
        color: t.colors.primary[600],
        marginBottom: t.spacing.sm,
    },
    subtitle: {
        fontSize: '1rem',
        color: t.colors.neutral[600],
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: t.spacing.lg,
    },
    section: {
        marginBottom: t.spacing.lg,
    },
    sectionTitle: {
        fontSize: '1.25rem',
        fontWeight: 600,
        color: t.colors.neutral[800],
        marginBottom: t.spacing.md,
    },
    row: {
        display: 'flex',
        flexWrap: 'wrap' as const,
        gap: t.spacing.md,
        alignItems: 'center',
    },
    column: {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: t.spacing.md,
    },
    colorGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(10, 1fr)',
        gap: '4px',
    },
    colorCell: {
        height: '32px',
        borderRadius: t.radius.sm,
        transition: 'transform 0.15s',
        ':hover': {
            transform: 'scale(1.1)',
        },
    },
    colorLabel: {
        fontSize: '0.75rem',
        fontWeight: 500,
        color: t.colors.neutral[600],
        marginBottom: t.spacing.xs,
    },
}))

// Composant principal de démonstration
const ThemeDemo = () => (
    <div className={pageStyles.container}>
        <header className={pageStyles.header}>
            <h1 className={pageStyles.title}>
                🎨 Aurora Theme Playground
            </h1>
            <p className={pageStyles.subtitle}>
                Testez les composants et le système de thème en temps réel
            </p>
        </header>

        <div className={pageStyles.grid}>
            <Button
                variant={'primary'}
                size={'lg'}
            >
                TEST
            </Button>
            <Badge variant={'success'}>
                TEST
            </Badge>
        </div>
    </div>
)

// App principale avec ThemeProvider
const App = () => (
    <ThemeProvider theme={theme}>
        <ThemeDemo/>
    </ThemeProvider>
)

export default App
