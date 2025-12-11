import { ReactNode } from 'react'

import type { Theme } from '@/types/Theme'

export type ThemeProviderProps = {
    theme: Theme
    children?: ReactNode
}

