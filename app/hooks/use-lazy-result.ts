import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

const emptyArray = [] as const

export function useLazyResult<T>(
  data: T[] | undefined,
  pageSize = 10,
  loader?: () => void
) {
  const loaderRef = useRef(loader)
  useEffect(() => {
    loaderRef.current = loader
  })
  const [endIndex, setEndIndex] = useState(pageSize)

  const result = (data ?? emptyArray) as T[]

  const generator = useMemo(() => {
    function* lazyResultGenerator() {
      let currentEndIndex = endIndex
      while (true) {
        yield result.slice(0, currentEndIndex)
        currentEndIndex += pageSize
        const load = loaderRef.current
        if (result.length < currentEndIndex) load?.()
        setEndIndex(currentEndIndex)
      }
    }

    return lazyResultGenerator()
  }, [result, endIndex, pageSize])

  const fetchNextPage = useCallback(() => {
    generator.next()
  }, [generator])

  const reset = useCallback(() => {
    setEndIndex(pageSize)
    const newGenerator = generator
    newGenerator.next() // Load the first batch immediately
  }, [generator, pageSize])

  const lazyResult = useMemo(
    () => generator.next().value as T[] | undefined,
    [generator]
  )

  return {
    fetchNextPage,
    reset,
    result: lazyResult
  }
}
