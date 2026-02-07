import { createStyles } from '@/utils/styles'

export const styles = createStyles((theme) => ({
    badge: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 500,
        lineHeight: 1,
    },
    sm: {
        padding: `2px ${theme.spacing.xs}`,
        fontSize: '0.625rem',
        borderRadius: theme.radius.sm,
    },
    md: {
        padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
        fontSize: '0.75rem',
        borderRadius: theme.radius.sm,
    },
    lg: {
        padding: `${theme.spacing.sm} ${theme.spacing.md}`,
        fontSize: '0.875rem',
        borderRadius: theme.radius.md,
    },
    pill: {
        borderRadius: theme.radius.full,
    },
    primary: {
        backgroundColor: theme.colors.primaryLight,
        color: theme.colors.primary,
    },
    secondary: {
        backgroundColor: theme.colors.primaryLight,
        color: theme.colors.secondary,
    },
    success: {
        backgroundColor: theme.colors.primaryLight,
        color: theme.colors.success,
    },
    warning: {
        backgroundColor: theme.colors.primaryLight,
        color: theme.colors.warning,
    },
    error: {
        backgroundColor: theme.colors.primaryLight,
        color: theme.colors.error,
    },
    neutral: {
        backgroundColor: theme.colors.border,
        color: theme.colors.textMuted,
    },
    dot: {
        width: '8px',
        height: '8px',
        padding: 0,
        borderRadius: '50%',
    },
    dotPrimary: {
        backgroundColor: theme.colors.primary,
    },
    dotSecondary: {
        backgroundColor: theme.colors.secondary,
    },
    dotSuccess: {
        backgroundColor: theme.colors.success,
    },
    dotWarning: {
        backgroundColor: theme.colors.warning,
    },
    dotError: {
        backgroundColor: theme.colors.error,
    },
    dotNeutral: {
        backgroundColor: theme.colors.textMuted,
    },
}))
