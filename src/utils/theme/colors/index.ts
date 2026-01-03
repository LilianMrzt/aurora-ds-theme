/**
 * Color Scales - Modern color palettes with shades from 25 to 950
 *
 * Scales are only accessible via the colors object to maintain consistency
 *
 * @example
 * ```ts
 * import { colors } from '@aurora-ui/theme'
 *
 * colors.indigo[500]  // '#6366f1'
 * colors.emerald[400] // '#34d399'
 * colors.gray[900]    // '#18181b'
 * ```
 */

// Import all scales for the colors object
import { amber } from './amber'
import { blue } from './blue'
import { cyan } from './cyan'
import { emerald } from './emerald'
import { fuchsia } from './fuchsia'
import { gray } from './gray'
import { green } from './green'
import { indigo } from './indigo'
import { lime } from './lime'
import { orange } from './orange'
import { pink } from './pink'
import { purple } from './purple'
import { red } from './red'
import { rose } from './rose'
import { sky } from './sky'
import { slate } from './slate'
import { stone } from './stone'
import { teal } from './teal'
import { violet } from './violet'
import { yellow } from './yellow'

/**
 * All color scales organized by name
 * All scales and special values are only accessible via this object
 */
export const colors = {
    // Neutrals
    gray,
    slate,
    stone,
    // Colors
    red,
    orange,
    amber,
    yellow,
    lime,
    green,
    emerald,
    teal,
    cyan,
    sky,
    blue,
    indigo,
    violet,
    purple,
    fuchsia,
    pink,
    rose,
    // Special
    white: '#ffffff',
    black: '#000000',
    transparent: 'transparent',
    current: 'currentColor',
} as const

