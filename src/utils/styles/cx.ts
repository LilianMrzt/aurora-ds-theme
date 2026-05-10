/**
 * Accepted argument types for {@link cx}.
 *
 * - Strings are kept (when truthy).
 * - `false`, `null`, `undefined` and empty strings are skipped, allowing
 *   conditional patterns like `cx(styles.base, isActive && styles.active)`.
 */
export type CxArg = string | false | null | undefined

/**
 * Conditionally joins class names into a single space-separated string.
 *
 * Lightweight, dependency-free alternative to `clsx` / `classnames` tailored
 * for usage with {@link createStyles}. Falsy values are filtered out so you
 * can compose variants inline.
 *
 * @example
 * ```tsx
 * import { cx } from '@aurora-ds/theme'
 *
 * <button
 *   className={cx(
 *     styles.base,
 *     styles[size],
 *     styles[variant],
 *     fullWidth && styles.fullWidth,
 *     loading && styles.loading,
 *     className,
 *   )}
 * />
 * ```
 */
export const cx = (...args: CxArg[]): string => {
    let result = ''
    for (let i = 0; i < args.length; i++) {
        const value = args[i]
        if (value) {
            result = result ? result + ' ' + value : value
        }
    }
    return result
}

