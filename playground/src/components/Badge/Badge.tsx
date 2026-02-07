import { styles } from './Badge.styles'

import type { BadgeProps } from './Badge.props'

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

    return (
        <span className={classNames}>
            {children}
        </span>
    )
}
