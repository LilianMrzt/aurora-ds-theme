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
import { slate } from './slate'
import { stone } from './stone'
import { teal } from './teal'
import { violet } from './violet'
import { yellow } from './yellow'

/** All color scales (19 scales with 12 shades each) */
export const colors = {
    gray,
    slate,
    stone,
    red,
    orange,
    amber,
    yellow,
    lime,
    green,
    emerald,
    teal,
    cyan,
    blue,
    indigo,
    violet,
    purple,
    fuchsia,
    pink,
    rose,
    white: '#ffffff',
    black: '#000000',
    transparent: 'transparent',
    current: 'currentColor',
} as const
