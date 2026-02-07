import { createStyles } from '@/utils/styles'

export const styles = createStyles((theme) => ({
    base: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: theme.spacing.sm,
        fontFamily: 'inherit',
        fontWeight: 600,
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        ':hover': {
            transform: 'translateY(-1px)',
        },
        ':active': {
            transform: 'translateY(0)',
        },
        ':disabled': {
            opacity: 0.6,
            cursor: 'not-allowed',
            transform: 'none',
        },
    },
    // Sizes
    sm: {
        padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
        fontSize: '0.75rem',
        borderRadius: theme.radius.sm,
    },
    md: {
        padding: `${theme.spacing.sm} ${theme.spacing.md}`,
        fontSize: '0.875rem',
        borderRadius: theme.radius.md,
    },
    lg: {
        padding: `${theme.spacing.md} ${theme.spacing.lg}`,
        fontSize: '1rem',
        borderRadius: theme.radius.md,
    },
    // Variants
    primary: {
        backgroundColor: theme.colors.primary,
        color: 'white',
        ':hover': {
            backgroundColor: theme.colors.primaryHover,
            boxShadow: theme.shadows.md,
        },
    },
    secondary: {
        backgroundColor: theme.colors.secondary,
        color: 'white',
        ':hover': {
            backgroundColor: theme.colors.secondaryHover,
            boxShadow: theme.shadows.md,
        },
    },
    success: {
        backgroundColor: theme.colors.success,
        color: 'white',
        ':hover': {
            backgroundColor: theme.colors.successHover,
            boxShadow: theme.shadows.md,
        },
    },
    warning: {
        backgroundColor: theme.colors.warning,
        color: 'white',
        ':hover': {
            backgroundColor: theme.colors.warningHover,
            boxShadow: theme.shadows.md,
        },
    },
    error: {
        backgroundColor: theme.colors.error,
        color: 'white',
        ':hover': {
            backgroundColor: theme.colors.errorHover,
            boxShadow: theme.shadows.md,
        },
    },
    outline: {
        backgroundColor: 'transparent',
        color: theme.colors.primary,
        border: `2px solid ${theme.colors.primary}`,
        ':hover': {
            backgroundColor: theme.colors.primaryLight,
        },
    },
    ghost: {
        backgroundColor: 'transparent',
        color: theme.colors.text,
        ':hover': {
            backgroundColor: theme.colors.border,
        },
    },
    fullWidth: {
        width: '100%',
    },
    loading: {
        position: 'relative' as const,
        color: 'transparent',
    },
    spinner: {
        position: 'absolute' as const,
        width: '1em',
        height: '1em',
        border: '2px solid currentColor',
        borderRightColor: 'transparent',
        borderRadius: '50%',
        animation: 'spin 0.6s linear infinite',
    },
}))
