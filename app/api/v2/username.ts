import instance from './base'

export interface VerifyPayload {
  taken: boolean
}

export const getUserByUsername = (username: string) =>
  instance
    .get(`/users/${username}`)
    .then((res: AxiosResPure<RiseUser>) => res.data)

export const createUsername = (username: string) =>
  instance
    .patch('/users/username', { username })
    .then((res: AxiosResPure<RiseUser>) => res.data)
