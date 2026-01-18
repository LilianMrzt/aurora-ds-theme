/** Registry for theme type via module augmentation */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ThemeRegistry {}

/** @internal */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type _InferredTheme = ThemeRegistry extends { theme: infer T } ? T : Record<string, any>

/**
 * Internal theme type used by the library. DO NOT USE directly.
 * Define your own theme type and register it via ThemeRegistry.
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type _InternalTheme<T = _InferredTheme> = T extends Record<string, any> ? T : Record<string, any>
