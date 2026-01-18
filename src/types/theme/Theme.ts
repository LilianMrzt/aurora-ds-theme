/** Registry for theme type via module augmentation */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ThemeRegistry {}

/** @internal */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type InferredTheme = ThemeRegistry extends { theme: infer T } ? T : Record<string, any>

/** Theme type, inferred from ThemeRegistry */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Theme<T = InferredTheme> = T extends Record<string, any> ? T : Record<string, any>
