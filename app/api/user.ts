import instance, { AxiosResponse } from 'app/utils/axios'

// function getUserProfile is used to get the current user profile
export const getUserProfile = () =>
  instance.get('/auth/profile').then((res: AxiosResponse<RiseUser>) => res.data)

export const deleteUser = (password: string, userId: string) =>
  instance.delete(`users/${userId}`, { data: { password } })

export const editUser = ({ id, ...user }: Partial<RiseUser>) =>
  instance
    .put(`/users/${id}`, user, {
      params: { include: 'account.profile_setting' }
    })
    .then((res: AxiosResponse<RiseUser>) => res.data)
