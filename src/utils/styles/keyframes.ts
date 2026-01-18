import {
    addKeyframes,
    getNextKeyframeId,
    hashString,
    hasKeyframes,
    insertRule,
    objectToCss
} from './styleEngine'

import type { CSSProperties } from 'react'

/** Creates and injects a @keyframes rule, returns the animation name */
export const keyframes = (frames: Record<string, CSSProperties>): string => {
    let css = ''
    for (const key in frames) {
        css += `${key}{${objectToCss(frames[key] as Record<string, unknown>)}}`
    }

    if (hasKeyframes(css)) {
        const hash = hashString(css)
        return `aurora-kf-${hash}`
    }

    const name = `aurora-kf-${getNextKeyframeId()}`
    insertRule(`@keyframes ${name}{${css}}`)
    addKeyframes(css)

    return name
}
