import { createStyles } from '../../../src'

export type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'neutral'
export type BadgeSize = 'sm' | 'md' | 'lg'

export interface BadgeProps {
    variant?: BadgeVariant
    size?: BadgeSize
    pill?: boolean
    dot?: boolean
    children?: React.ReactNode
}

const styles = createStyles((theme) => ({
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
        backgroundColor: theme.colors.primary[100],
        color: theme.colors.primary[700],
    },
    secondary: {
        backgroundColor: theme.colors.secondary[100],
        color: theme.colors.secondary[700],
    },
    success: {
        backgroundColor: theme.colors.success[100],
        color: theme.colors.success[700],
    },
    warning: {
        backgroundColor: theme.colors.warning[100],
        color: theme.colors.warning[700],
    },
    error: {
        backgroundColor: theme.colors.error[100],
        color: theme.colors.error[700],
    },
    neutral: {
        backgroundColor: theme.colors.neutral[100],
        color: theme.colors.neutral[700],
    },
    dot: {
        width: '8px',
        height: '8px',
        padding: 0,
        borderRadius: '50%',
    },
    dotPrimary: {
        backgroundColor: theme.colors.primary[500],
    },
    dotSecondary: {
        backgroundColor: theme.colors.secondary[500],
    },
    dotSuccess: {
        backgroundColor: theme.colors.success[500],
    },
    dotWarning: {
        backgroundColor: theme.colors.warning[500],
    },
    dotError: {
        backgroundColor: theme.colors.error[500],
    },
    dotNeutral: {
        backgroundColor: theme.colors.neutral[500],
    },
}))

export const Badge = ({
    variant = 'primary',
    size = 'md',
    pill = false,
    dot = false,
    children,
}: BadgeProps) => {
    if (dot) {
        const dotVariant = `dot${variant.charAt(0).toUpperCase() + variant.slice(1)}` as keyof typeof styles
        return <span className={`${styles.badge} ${styles.dot} ${styles[dotVariant]}`} />
    }

    const classNames = [
        styles.badge,
        styles[size],
        styles[variant],
        pill && styles.pill,
    ].filter(Boolean).join(' ')

    return <span className={classNames}>
        {children}
    </span>
}
