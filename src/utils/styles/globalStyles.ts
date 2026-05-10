import { insertRule, objectToCss, toKebabCase, toCssValue } from './styleEngine'

import type { StyleWithPseudos } from './types'

const AMPERSAND_RE = /&/g

/**
 * A block accepted by {@link globalStyles}. Same shape as
 * {@link StyleWithPseudos} but additionally allows arbitrary string keys
 * so that nested at-rules (e.g. `@media`) can declare their own child
 * selectors (`body`, `*`, `.foo`, …).
 */
export type GlobalStyleBlock = StyleWithPseudos & {
    [selector: string]: unknown
}

/**
 * Recursively serializes a single selector block into CSS, supporting
 * the same nesting conventions as {@link createStyles} (pseudo, `&`,
 * `@media`, `@supports`, `@container`).
 * @internal
 */
const renderBlock = (selector: string, styles: StyleWithPseudos): string[] => {
    const rules: string[] = []
    let baseCss = ''

    for (const key in styles) {
        const value = (styles as Record<string, unknown>)[key]
        const firstChar = key.charCodeAt(0)

        if (firstChar === 64 /* @ */) {
            const innerCss = objectToCss(value as Record<string, unknown>)
            if (innerCss) {
                rules.push(`${key}{${selector}{${innerCss}}}`)
            }
        } else if (firstChar === 38 /* & */) {
            const innerCss = objectToCss(value as Record<string, unknown>)
            if (innerCss) {
                AMPERSAND_RE.lastIndex = 0
                rules.push(`${key.replace(AMPERSAND_RE, selector)}{${innerCss}}`)
            }
        } else if (firstChar === 58 /* : */) {
            const innerCss = objectToCss(value as Record<string, unknown>)
            if (innerCss) {
                rules.push(`${selector}${key}{${innerCss}}`)
            }
        } else if (value != null && typeof value !== 'object') {
            baseCss += `${toKebabCase(key)}:${toCssValue(key, value)};`
        }
    }

    if (baseCss) {
        rules.unshift(`${selector}{${baseCss}}`)
    }

    return rules
}

/**
 * Injects global, top-level CSS rules. Each key is a CSS selector
 * (`body`, `*`, `:root`, `.foo > .bar`, `@media (...)`, etc.) and each
 * value supports the same nested-pseudo / `&` / at-rule syntax as
 * {@link createStyles}.
 *
 * Rules are written into the shared global Aurora stylesheet and persist
 * for the lifetime of the document. Calling `globalStyles` multiple times
 * appends new rules — it is the caller's responsibility to call it once
 * (typically at app bootstrap) per logical block.
 *
 * @example
 * ```ts
 * globalStyles({
 *   'html, body': {
 *     margin: 0,
 *     padding: 0,
 *     fontFamily: 'system-ui, sans-serif',
 *   },
 *   'a': {
 *     color: 'inherit',
 *     ':hover': { textDecoration: 'underline' },
 *   },
 *   '@media (prefers-reduced-motion: reduce)': {
 *     '*': { animation: 'none', transition: 'none' },
 *   },
 * })
 * ```
 */
export const globalStyles = (
    rules: Record<string, GlobalStyleBlock>
): void => {
    for (const selector in rules) {
        const block = rules[selector]
        if (!block) { continue }

        const firstChar = selector.charCodeAt(0)

        // Top-level at-rule (e.g. @media, @supports): inline the contents.
        if (firstChar === 64 /* @ */) {
            let inner = ''
            for (const innerSelector in block) {
                const innerValue = (block as Record<string, unknown>)[innerSelector]
                if (innerValue && typeof innerValue === 'object') {
                    const sub = renderBlock(innerSelector, innerValue as StyleWithPseudos)
                    inner += sub.join('')
                }
            }
            if (inner) {
                insertRule(`${selector}{${inner}}`)
            }
            continue
        }

        const sub = renderBlock(selector, block)
        for (let i = 0; i < sub.length; i++) {
            insertRule(sub[i])
        }
    }
}



