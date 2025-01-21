import {
	Api,
	ApiPagingResponse,
	ID,
	PagingQueryParams,
	Schema,
	User,
} from '@/apis'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ApiV1Paths, toUrl } from '@/constants'

export type PostCommentOrderType = 'CREATED_AT_ASC' | 'CREATED_AT_DESC'
export type PostCommentUpdateMask = 'CONTENT'

export interface PostComment extends Schema {
	write: User
	content: string
}

export interface CreatePostCommentRequest {
	post_id: ID
	content: string
}

export interface GetPostCommentsParams extends PagingQueryParams {
	postId?: ID
	writerId?: ID
	orderTypes?: PostCommentOrderType[]
}

export interface UpdatePostCommentRequest {
	id: ID
	content?: string
	update_mask: PostCommentUpdateMask[]
}

export interface DeletePostCommentRequest {
	id: ID
}

export const useCreatePostComment = () => {
	return useMutation({
		mutationFn: (request: CreatePostCommentRequest) =>
			Api.post<ID>(toUrl(ApiV1Paths.POST_COMMENTS), request),
	})
}

export const useGetPostComments = (params?: GetPostCommentsParams) => {
	return useQuery({
		queryKey: [toUrl(ApiV1Paths.POST_COMMENTS), params],
		queryFn: () =>
			Api.get<ApiPagingResponse<PostComment[]>>(
				toUrl(ApiV1Paths.POST_COMMENTS),
				params,
			),
	})
}

export const useUpdatePostComment = () => {
	return useMutation({
		mutationFn: (request: UpdatePostCommentRequest) =>
			Api.put<ID>(toUrl(ApiV1Paths.POST_COMMENTS, { id: request.id }), request),
	})
}

export const useDeletePostComment = () => {
	return useMutation({
		mutationFn: (request: DeletePostCommentRequest) =>
			Api.delete<boolean>(toUrl(ApiV1Paths.POST_COMMENTS, { id: request.id })),
	})
}
