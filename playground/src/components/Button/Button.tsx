import { styles } from './Button.styles'

import type { ButtonProps } from './Button.props'

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
