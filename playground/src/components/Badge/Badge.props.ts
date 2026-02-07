export type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'neutral'
export type BadgeSize = 'sm' | 'md' | 'lg'

export interface BadgeProps {
    variant?: BadgeVariant
    size?: BadgeSize
    pill?: boolean
    dot?: boolean
    children?: React.ReactNode
}
