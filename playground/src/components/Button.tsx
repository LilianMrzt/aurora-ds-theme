import { createStyles } from '../../../src'

export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'outline' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant
    size?: ButtonSize
    fullWidth?: boolean
    loading?: boolean
}

const styles = createStyles((theme) => ({
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
        backgroundColor: theme.colors.primary[500],
        color: 'white',
        ':hover': {
            backgroundColor: theme.colors.primary[600],
            boxShadow: theme.shadows.md,
        },
    },
    secondary: {
        backgroundColor: theme.colors.secondary[500],
        color: 'white',
        ':hover': {
            backgroundColor: theme.colors.secondary[600],
            boxShadow: theme.shadows.md,
        },
    },
    success: {
        backgroundColor: theme.colors.success[500],
        color: 'white',
        ':hover': {
            backgroundColor: theme.colors.success[600],
            boxShadow: theme.shadows.md,
        },
    },
    warning: {
        backgroundColor: theme.colors.warning[500],
        color: 'white',
        ':hover': {
            backgroundColor: theme.colors.warning[600],
            boxShadow: theme.shadows.md,
        },
    },
    error: {
        backgroundColor: theme.colors.error[500],
        color: 'white',
        ':hover': {
            backgroundColor: theme.colors.error[600],
            boxShadow: theme.shadows.md,
        },
    },
    outline: {
        backgroundColor: 'transparent',
        color: theme.colors.primary[500],
        border: `2px solid ${theme.colors.primary[500]}`,
        ':hover': {
            backgroundColor: theme.colors.primary[50],
        },
    },
    ghost: {
        backgroundColor: 'transparent',
        color: theme.colors.neutral[700],
        ':hover': {
            backgroundColor: theme.colors.neutral[100],
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

export const Button = ({
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    loading = false,
    disabled,
    className,
    children,
    ...props
}: ButtonProps) => {

    const classNames = [
        styles.base,
        styles[size],
        styles[variant],
        fullWidth && styles.fullWidth,
        loading && styles.loading,
        className,
    ].filter(Boolean).join(' ')

    return (
        <button
            className={classNames}
            disabled={disabled || loading}
            {...props}
        >
            {loading && <span className={styles.spinner} />}
            {children}
        </button>
    )
}
