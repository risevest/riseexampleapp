import instance from './base'

export const searchUsers = ({
  identifier,
  offset
}: {
  identifier: string
  offset: number
}): Promise<ListResponse<RiseUser>> => {
  const defaultResponse: any = {
    item_count: 0,
    items: []
  }

  if (!identifier) {
    return defaultResponse
  }

  return instance
    .get('users', { params: { identifier, limit: 10, offset } })
    .then((res) => {
      return res.data || defaultResponse
    })
}
