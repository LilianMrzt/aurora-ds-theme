import { createStyles, keyframes } from '@/utils/styles'

const fadeIn = keyframes({
    from: { opacity: 0, transform: 'translateY(-10px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
})

export const styles = createStyles((theme) => ({
    container: {
        padding: theme.spacing.lg,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        minHeight: '100vh',
        backgroundColor: theme.colors.background,
    },
    header: {
        marginBottom: theme.spacing.xl,
        animation: `${fadeIn} 0.5s ease-out`,
    },
    headerRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: theme.spacing.lg,
    },
    title: {
        fontSize: '2rem',
        fontWeight: 700,
        color: theme.colors.primary,
        marginBottom: theme.spacing.sm,
    },
    subtitle: {
        fontSize: '1rem',
        color: theme.colors.textMuted,
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: theme.spacing.lg,
    },
    section: {
        marginBottom: theme.spacing.xl,
        padding: theme.spacing.lg,
        backgroundColor: theme.colors.surface,
        borderRadius: theme.radius.lg,
        boxShadow: theme.shadows.sm,
    },
    sectionTitle: {
        fontSize: '1.25rem',
        fontWeight: 600,
        color: theme.colors.text,
        marginBottom: theme.spacing.md,
    },
    row: {
        display: 'flex',
        flexWrap: 'wrap' as const,
        gap: theme.spacing.md,
        alignItems: 'center',
    },
    column: {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: theme.spacing.md,
    },
}))
