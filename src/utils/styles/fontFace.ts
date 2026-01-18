import { addFontFace, hasFontFace, insertRule } from './styleEngine'

import type { FontFaceOptions } from './types'

/** Injects a @font-face rule and returns the font family name */
export const fontFace = (options: FontFaceOptions): string => {
    const {
        fontFamily,
        src,
        fontStyle = 'normal',
        fontWeight = 400,
        fontDisplay = 'swap',
        unicodeRange
    } = options

    // Generate CSS
    let css = `font-family:"${fontFamily}";`
    css += `src:${src};`
    css += `font-style:${fontStyle};`
    css += `font-weight:${fontWeight};`
    css += `font-display:${fontDisplay};`
    if (unicodeRange) {
        css += `unicode-range:${unicodeRange};`
    }

    // Check if already injected
    if (!hasFontFace(css)) {
        insertRule(`@font-face{${css}}`)
        addFontFace(css)
    }

    return fontFamily
}

