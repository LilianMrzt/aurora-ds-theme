import {
    addKeyframes,
    getKeyframeName,
    hasKeyframes,
    insertKeyframeRule,
    objectToCss
} from './styleEngine'

import type { CSSProperties } from 'react'

/** Creates and injects a @keyframes rule, returns the animation name */
export const keyframes = (frames: Record<string, CSSProperties>): string => {
    let css = ''
    for (const key in frames) {
        css += `${key}{${objectToCss(frames[key] as Record<string, unknown>)}}`
    }

    const name = getKeyframeName(css)

    if (hasKeyframes(css)) {
        return name
    }

    insertKeyframeRule(`@keyframes ${name}{${css}}`)
    addKeyframes(css)

    return name
}
