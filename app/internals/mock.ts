export function paginateMockData<T>(
  mock: T[],
  offset: number,
  totalPages: number
): Paginate<T> {
  return {
    data: mock,
    meta: {
      limit: mock.length,
      offset,
      total: totalPages
    }
  }
}
