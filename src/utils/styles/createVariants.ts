import { createStyles } from './createStyles'
import { cx } from './cx'

import type { StyleWithPseudos } from './types'
import type { _InternalTheme } from '@/types'

/**
 * A group of variant values (e.g. `{ sm: {...}, md: {...}, lg: {...} }`).
 * @internal
 */
type VariantValues = Record<string, StyleWithPseudos>

/**
 * A map of variant groups (e.g. `{ size: {...}, color: {...} }`).
 * @internal
 */
type VariantGroups = Record<string, VariantValues>

/**
 * Props accepted by a variant function. Each key matches a variant group,
 * each value must be one of the declared variant values. All keys are
 * optional — missing keys fall back to `defaultVariants`.
 */
export type VariantProps<V extends VariantGroups> = {
    [K in keyof V]?: keyof V[K]
}

/**
 * Compound variant definition: applies extra styles when ALL listed
 * variant conditions match.
 */
export type CompoundVariant<V extends VariantGroups> = VariantProps<V> & {
    styles: StyleWithPseudos
}

/**
 * Configuration object for {@link createVariants}.
 */
export type CreateVariantsConfig<V extends VariantGroups> = {
    /** Always-applied base styles. */
    base?: StyleWithPseudos
    /** Variant groups (e.g. `size`, `variant`, `intent`). */
    variants?: V
    /** Default value picked when a prop is omitted. */
    defaultVariants?: VariantProps<V>
    /**
     * Extra styles applied when ALL listed conditions match.
     *
     * @example
     * ```ts
     * compoundVariants: [
     *   { size: 'sm', variant: 'ghost', styles: { fontSize: 10 } }
     * ]
     * ```
     */
    compoundVariants?: CompoundVariant<V>[]
}

/**
 * Function returned by {@link createVariants}. Given partial variant props
 * (all optional thanks to `defaultVariants`), it returns a single
 * space-separated class name string ready to drop on a DOM node. Falsy
 * extra class names can be appended via the second `className` argument.
 */
export type VariantFn<V extends VariantGroups> = (
    props?: VariantProps<V>,
    className?: string | false | null | undefined
) => string

const COMPOUND_PREFIX = 'compound-'

/**
 * Builds variant-aware components without any wrapper React component.
 *
 * Inspired by `cva` (class-variance-authority) and Stitches, but built
 * directly on top of {@link createStyles} so it benefits from the same
 * theming, HMR, SSR and per-module stylesheet behavior.
 *
 * The returned function is a pure className builder — it has zero
 * runtime cost beyond a few string concatenations and Map lookups.
 *
 * @param configOrCreator - Static config object, or a function receiving the theme.
 * @param options - Optional `{ id }` namespacing (recommended in production, see {@link createStyles}).
 *
 * @example
 * ```ts
 * // Button.styles.ts
 * import { createVariants } from '@aurora-ds/theme'
 *
 * export const button = createVariants((theme) => ({
 *   base: {
 *     display: 'inline-flex',
 *     alignItems: 'center',
 *     borderRadius: theme.radius.md,
 *     cursor: 'pointer',
 *   },
 *   variants: {
 *     size: {
 *       sm: { padding: theme.spacing.xs, fontSize: 12 },
 *       md: { padding: theme.spacing.sm, fontSize: 14 },
 *       lg: { padding: theme.spacing.md, fontSize: 16 },
 *     },
 *     variant: {
 *       primary: { backgroundColor: theme.colors.primary, color: 'white' },
 *       ghost:   { backgroundColor: 'transparent', color: theme.colors.text },
 *     },
 *   },
 *   defaultVariants: { size: 'md', variant: 'primary' },
 *   compoundVariants: [
 *     { size: 'sm', variant: 'ghost', styles: { fontWeight: 600 } }
 *   ],
 * }), { id: 'button' })
 *
 * // Usage
 * <button className={button({ size: 'lg' })} />
 * <button className={button({ variant: 'ghost' }, props.className)} />
 * ```
 */
export const createVariants = <V extends VariantGroups>(
    configOrCreator:
        | CreateVariantsConfig<V>
        | ((theme: _InternalTheme) => CreateVariantsConfig<V>),
    options?: { id?: string }
): VariantFn<V> => {
    // Defer config resolution until inside the createStyles factory so the
    // theme proxy (returning var(--theme-…)) is the same instance used
    // throughout the library.
    let resolvedDefaults: VariantProps<V> = {}
    let resolvedCompounds: CompoundVariant<V>[] = []

    // We pass a styles factory to createStyles that flattens the config
    // (base + every variant value + every compound variant) into a single
    // dictionary of classes.
    const flatten = (theme: _InternalTheme): Record<string, StyleWithPseudos> => {
        const config: CreateVariantsConfig<V> = typeof configOrCreator === 'function'
            ? (configOrCreator as (t: _InternalTheme) => CreateVariantsConfig<V>)(theme)
            : configOrCreator

        resolvedDefaults = (config.defaultVariants ?? {}) as VariantProps<V>
        resolvedCompounds = config.compoundVariants ?? []

        const out: Record<string, StyleWithPseudos> = {}

        if (config.base) {
            out.base = config.base
        }

        if (config.variants) {
            for (const groupName in config.variants) {
                const group = config.variants[groupName]
                for (const valueName in group) {
                    // Key shape: "<groupName>--<valueName>" so it never collides
                    // with base / compound keys, and stays readable in DOM.
                    out[`${groupName}--${valueName}`] = group[valueName]
                }
            }
        }

        if (config.compoundVariants) {
            for (let i = 0; i < config.compoundVariants.length; i++) {
                out[`${COMPOUND_PREFIX}${i}`] = config.compoundVariants[i].styles
            }
        }

        return out
    }

    // Build all classes through createStyles (so they share the per-module
    // sheet and get the same HMR / SSR semantics).
    const classes = createStyles(
        // createStyles accepts (theme) => styles
        ((theme: _InternalTheme) => flatten(theme)) as never,
        options
    ) as Record<string, string>

    const baseClass = classes.base

    return (props, extraClassName) => {
        const merged = { ...resolvedDefaults, ...(props ?? {}) } as Record<string, unknown>
        const parts: Array<string | false | null | undefined> = [baseClass]

        for (const groupName in merged) {
            const value = merged[groupName]
            if (value == null || value === false) { continue }
            parts.push(classes[`${groupName}--${String(value)}`])
        }

        // Compound variants: include when ALL declared conditions match.
        for (let i = 0; i < resolvedCompounds.length; i++) {
            const compound = resolvedCompounds[i]
            let matches = true
            for (const key in compound) {
                if (key === 'styles') { continue }
                if (merged[key] !== (compound as Record<string, unknown>)[key]) {
                    matches = false
                    break
                }
            }
            if (matches) {
                parts.push(classes[`${COMPOUND_PREFIX}${i}`])
            }
        }

        if (extraClassName) { parts.push(extraClassName) }

        return cx(...parts)
    }
}



