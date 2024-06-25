import instance from 'app/utils/axios'

export const login = (email: string, password: string) =>
  instance
    .post(
      '/auth/login',
      { email, password },
      {
        timeout: 30000
      }
    )
    .then((res) => {
      return res.data
    })

export const pinLogin = (email: string, pin: string) =>
  instance
    .post(
      '/auth/pin-login',
      { email, pin },
      {
        timeout: 30000
      }
    )
    .then((res) => {
      return res.data
    })

export const signup = (email: string, password: string) =>
  instance.post('/users', { email, password }).then((res) => {
    return res.data
  })
