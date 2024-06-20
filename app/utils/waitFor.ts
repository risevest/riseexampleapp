export interface WaitOptions {
  interval?: number
}

export async function waitFor(
  condition: () => Promise<boolean>,
  options: WaitOptions = {}
) {
  const { interval = 20 } = options

  const promise = new Promise<void>((resolve, reject) => {
    const check = async () => {
      try {
        const value = await condition()

        if (value === true) {
          resolve()
        } else {
          setTimeout(check, interval)
        }
      } catch (error) {
        reject(error)
      }
    }

    check()
  })

  return promise
}
