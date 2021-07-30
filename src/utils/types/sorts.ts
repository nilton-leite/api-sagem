export type Sort<T> = {
  field: keyof T
  orientation: 'asc' | 'desc'
}

export function formatSorts<T>(sort: string, keys: string[]): Sort<T>[] {
  let sorts: Sort<T>[] = []
  const sortTemp = sort ? sort.split(',') : []
  sortTemp.forEach((sa) => {
    let temp = sa.split(':')
    if (
      keys.findIndex((k) => k == temp[0]) > -1 &&
      ['asc', 'desc'].includes(temp[1])
    ) {
      sorts.push({
        field: temp[0],
        orientation: temp[1],
      } as Sort<T>)
    }
  })
  return sorts
}
