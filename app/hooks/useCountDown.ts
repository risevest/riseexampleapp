import { useEffect, useState } from 'react'

export function useCountDown(initialCountDown: number) {
  const [countDown, setCountDown] = useState(0)

  const reset = () => {
    setCountDown(initialCountDown)
  }

  useEffect(() => {
    if (countDown === 0) return

    const intervalId = setInterval(() => {
      setCountDown(countDown - 1)
    }, 1000)

    return () => clearInterval(intervalId)
  }, [countDown])

  return {
    countDown,
    isRunning: countDown > 0,
    reset
  }
}
