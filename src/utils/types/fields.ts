export type Fields<T> = (keyof T)[]

export function formatFields<T>(select: string, keys: (keyof T)[]) {
  return (
    select
      ? select.split(',').filter((s) => keys.findIndex((k) => k == s) > -1)
      : []
  ) as Fields<T>
}
