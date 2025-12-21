export function computeEqualJitterDelay(
    baseInterval: number,
    retryCount: number,
    maxInterval: number
): number {
    const raw = baseInterval * Math.pow(2, retryCount)
    const capped = Math.min(raw, maxInterval)

    const half = capped / 2
    const delay = half + Math.random() * half

    return Math.floor(delay)
}
