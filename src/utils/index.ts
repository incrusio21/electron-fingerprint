export function getIsNullOrUndef(value: unknown): value is null | undefined {
    return value === null || value === undefined;
}
export function getMapFromList<T, K extends keyof T>(
    list: T[],
    name: K
): Record<string, T> {
    /**
     * Do not convert function to use copies of T
     * instead of references.
     */
    const acc: Record<string, T> = {};
    for (const t of list) {
      const key = t[name];
      if (key === undefined) {
        continue;
      }
  
      acc[String(key)] = t;
    }
    return acc;
}