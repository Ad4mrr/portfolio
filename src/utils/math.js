export function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n))
}

export function lerp(a, b, t) {
  return a + (b - a) * t
}
