export function forceInt (n: unknown): number {
    if (typeof n === 'string') {
        return parseInt(n , 10)
    }
    if (typeof n === 'number') {
        return n
    }
    throw new Error(`Cannot cast ${typeof n} to int`)
}

/**
 * Limit a number between 2 values
 */
export function between (n: number, min: number, max: number): number {
    if (n < min) {
        return min
    }
    if (n > max) {
        return max
    }
    return n
}
