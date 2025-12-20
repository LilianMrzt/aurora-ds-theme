/**
 * Base opacity scale for consistent transparency
 */
export type BaseOpacity = {
    /** Fully transparent - 0 */
    none: number
    /** Very low opacity - 0.05 */
    lowest: number
    /** Low opacity - 0.1 */
    low: number
    /** Medium-low opacity - 0.25 */
    medium: number
    /** Medium-high opacity - 0.5 */
    high: number
    /** High opacity - 0.75 */
    higher: number
    /** Fully opaque - 1 */
    full: number
}

