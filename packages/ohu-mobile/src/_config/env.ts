export const env: Record<string, any> =
  (globalThis.process ? globalThis.process?.env : (import.meta as any)?.env) ||
  {};
