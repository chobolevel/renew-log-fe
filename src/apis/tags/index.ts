import { Api, ApiPagingResponse, PagingQueryParams, Schema } from '@/apis'
import { useQuery } from '@tanstack/react-query'
import { ApiV1Paths, toUrl } from '@/constants'

export type TagOrderType = 'ORDER_ASC' | 'ORDER_DESC'
export type TagUpdateMask = 'NAME' | 'ORDER'

export interface Tag extends Schema {
	name: string
	posts_count: number
}

export interface GetTagsParams extends PagingQueryParams {
	name?: string
	orderTypes?: TagOrderType[]
}

export const useGetTags = (params?: GetTagsParams) => {
	return useQuery({
		queryKey: [toUrl(ApiV1Paths.TAGS), params],
		queryFn: () =>
			Api.get<ApiPagingResponse<Tag[]>>(toUrl(ApiV1Paths.TAGS), params),
	})
}
