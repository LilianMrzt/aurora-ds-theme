/**
 * Color Scales - Modern color palettes with shades from 25 to 950
 *
 * @example
 * ```ts
 * import { colors, indigo, emerald } from '@aurora-ui/theme'
 *
 * colors.indigo[500]  // '#6366f1'
 * emerald[400]        // '#34d399'
 * ```
 */

// Neutrals
export { gray } from './gray'
export { slate } from './slate'
export { stone } from './stone'

// Colors
export { red } from './red'
export { orange } from './orange'
export { amber } from './amber'
export { yellow } from './yellow'
export { lime } from './lime'
export { green } from './green'
export { emerald } from './emerald'
export { teal } from './teal'
export { cyan } from './cyan'
export { sky } from './sky'
export { blue } from './blue'
export { indigo } from './indigo'
export { violet } from './violet'
export { purple } from './purple'
export { fuchsia } from './fuchsia'
export { pink } from './pink'
export { rose } from './rose'

// Special values
export const white = '#ffffff'
export const black = '#000000'
export const transparent = 'transparent'
export const current = 'currentColor'

// Import all for the colors object
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

