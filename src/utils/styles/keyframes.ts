import {
    addKeyframes,
    getNextKeyframeId,
    hashString,
    hasKeyframes,
    insertRule,
    objectToCss
} from './styleEngine'

import type { CSSProperties } from 'react'


/**
 * Create and inject keyframes
 *
 * @example
 * ```ts
 * const fadeIn = keyframes({
 *     from: { opacity: 0 },
 *     to: { opacity: 1 }
 * })
 *
 * const STYLES = createStyles({
 *     animated: { animation: `${fadeIn} 0.3s ease-in-out` }
 * })
 * ```
 */
export const keyframes = (frames: Record<string, CSSProperties>): string => {
    // Generate keyframes CSS
    let css = ''
    for (const key in frames) {
        css += `${key}{${objectToCss(frames[key] as Record<string, unknown>)}}`
    }

    // Check if these keyframes already exist
    if (hasKeyframes(css)) {
        const hash = hashString(css)
        return `aurora-kf-${hash}`
    }

    // Generate a unique name
    const name = `aurora-kf-${getNextKeyframeId()}`

    // Inject @keyframes rule
    insertRule(`@keyframes ${name}{${css}}`)
    addKeyframes(css)

    return name
}

