import {
	Api,
	ApiPagingResponse,
	CreatePostImageRequest,
	ID,
	PagingQueryParams,
	Schema,
	Tag,
	UpdatePostImageRequest,
	User,
} from '@/apis'
import { PostImage } from '@/apis/posts/postImages'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ApiV1Paths, toUrl } from '@/constants'

export type PostOrderType = 'CREATED_AT_ASC' | 'CREATED_AT_DESC'
export type PostUpdateMask =
	| 'TAGS'
	| 'TITLE'
	| 'SUB_TITLE'
	| 'CONTENT'
	| 'THUMB_NAIL_IMAGE'

export interface Post extends Schema {
	writer: User
	tags: Tag[]
	title: string
	sub_title: string
	content: string
	thumb_nail_image?: PostImage
}

export interface CreatePostRequest {
	tag_ids: ID[]
	title: string
	sub_title: string
	content: string
	thumb_nail_image?: CreatePostImageRequest
}

export interface GetPostsParams extends PagingQueryParams {
	tagId?: ID
	title?: string
	subTitle?: string
	userId?: ID
	orderTypes?: PostOrderType[]
}

export interface GetPostParams {
	id: ID
}

export interface UpdatePostRequest {
	id: ID
	tag_ids?: ID[]
	title?: string
	sub_title?: string
	content?: string
	thumb_nail_image?: UpdatePostImageRequest
	update_mask: PostUpdateMask[]
}

export interface DeletePostRequest {
	id: ID
}

export const useCreatePost = () => {
	return useMutation({
		mutationFn: (request: CreatePostRequest) =>
			Api.post<ID>(toUrl(ApiV1Paths.POSTS), request),
	})
}

export const useGetPosts = (params?: GetPostsParams) => {
	return useQuery({
		queryKey: [toUrl(ApiV1Paths.POSTS), params],
		queryFn: () =>
			Api.get<ApiPagingResponse<Post[]>>(toUrl(ApiV1Paths.POSTS), params),
	})
}

export const useGetPost = (params: GetPostParams, enabled = true) => {
	return useQuery({
		queryKey: [toUrl(ApiV1Paths.POSTS, { id: params.id })],
		queryFn: () => Api.get<Post>(toUrl(ApiV1Paths.POSTS, { id: params.id })),
		enabled,
	})
}

export const useUpdatePost = () => {
	return useMutation({
		mutationFn: (request: UpdatePostRequest) =>
			Api.put<ID>(toUrl(ApiV1Paths.POSTS, { id: request.id }), request),
	})
}

export const useDeletePost = () => {
	return useMutation({
		mutationFn: (request: DeletePostRequest) =>
			Api.delete<boolean>(toUrl(ApiV1Paths.POSTS, { id: request.id })),
	})
}
