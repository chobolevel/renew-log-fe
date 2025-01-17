import { useMutation, useQuery } from '@tanstack/react-query'
import {
	Api,
	ApiPagingResponse,
	ID,
	PagingQueryParams,
	Schema,
	UserImages,
} from '@/apis'
import { ApiV1Paths, toUrl } from '@/constants'

export type UserLoginType = 'GENERAL' | 'KAKAO' | 'NAVER' | 'GOOGLE'
export type UserRoleType = 'ROLE_ADMIN' | 'ROLE_USER'
export type UserOrderType =
	| 'CREATED_AT_ASC'
	| 'CREATED_AT_DESC'
	| 'EMAIL_ASC'
	| 'EMAIL_DESC'
	| 'NICKNAME_ASC'
	| 'NICKNAME_DESC'
export type UserUpdateMask = 'NICKNAME'

export interface User extends Schema {
	email: string
	login_type: UserLoginType
	nickname: string
	role: UserRoleType
	profile_image?: UserImages
}

export interface CreateUserRequest {
	email: string
	password?: string
	check_password?: string
	social_id?: string
	login_type: UserLoginType
	nickname: string
}

export interface GetUsersParams extends PagingQueryParams {
	email?: string
	loginType?: UserLoginType
	nickname?: string
	role?: UserRoleType
	resigned?: boolean
	orderTypes?: UserOrderType
}

export interface GetUserParams {
	id: ID
}

export interface UpdateUserRequest {
	id: ID
	nickname?: string
	update_mask: UserUpdateMask[]
}

export interface ResignUserRequest {
	id: ID
}

export const useCreateUser = () => {
	return useMutation({
		mutationFn: (request: CreateUserRequest) =>
			Api.post<ID>(toUrl(ApiV1Paths.USERS), request),
	})
}

export const useGetMe = () => {
	return useQuery({
		queryKey: [toUrl(ApiV1Paths.ME)],
		queryFn: () => Api.get<User>(toUrl(ApiV1Paths.ME)),
	})
}

export const useGetUsers = (params?: GetUsersParams) => {
	return useQuery({
		queryKey: [toUrl(ApiV1Paths.USERS)],
		queryFn: () =>
			Api.get<ApiPagingResponse<User[]>>(toUrl(ApiV1Paths.USERS), params),
	})
}

export const useGetUser = (params: GetUserParams) => {
	return useQuery({
		queryKey: [toUrl(ApiV1Paths.USERS, { id: params.id })],
		queryFn: () => Api.get<User>(toUrl(ApiV1Paths.USERS, { id: params.id })),
	})
}

export const useUpdateUser = () => {
	return useMutation({
		mutationFn: (request: UpdateUserRequest) =>
			Api.put<ID>(toUrl(ApiV1Paths.USERS, { id: request.id }), request),
	})
}

export const useResignUser = () => {
	return useMutation({
		mutationFn: (request: ResignUserRequest) =>
			Api.delete<boolean>(toUrl(ApiV1Paths.USERS, { id: request.id })),
	})
}
