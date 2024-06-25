import instance from './base'

export const fetchFeeds = (offset: number): Promise<ListResponse<Feed>> =>
  instance
    .get('/articles', { params: { limit: 10, offset } })
    .then((res) => res.data)

export const fetchFeed = (id: Feed['id']) =>
  instance.get(`/articles/${id}`).then((res: AxiosResPure<Feed>) => res.data)

export const fetchHighlightedFeed = () =>
  instance
    .get('/articles/highlighted')
    .then((res: AxiosResPure<Feed>) => res.data)
