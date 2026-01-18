/**
 * Theme registry for module augmentation.
 *
 * Declare your theme type once in your app to enable automatic type inference
 * in createStyles and useTheme.
 *
 * @example
 * ```typescript
 * // In your theme.ts file:
 * declare module '@aurora-ds/theme' {
 *   interface ThemeRegistry {
 *     theme: typeof myTheme
 *   }
 * }
 * ```
 */
export type ThemeRegistry = object

/**
 * Infer theme type from registry, fallback to Record<string, any>.
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type InferredTheme = ThemeRegistry extends { theme: infer T } ? T : Record<string, any>

/**
 * Represents an Aurora DS theme.
 * Accepts any object by default. Use module augmentation for type inference.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Theme<T = InferredTheme> = T extends Record<string, any> ? T : Record<string, any>
