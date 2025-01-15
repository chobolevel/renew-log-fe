import { useMutation, useQuery } from '@tanstack/react-query'
import { Api, ID } from '@/apis'
import { ApiV1Paths, toUrl } from '@/constants'
import { UserImage } from '@/apis/users/userImage'

export type UserLoginType = 'GENERAL' | 'KAKAO' | 'NAVER' | 'GOOGLE'
export type UserRoleType = 'ROLE_ADMIN' | 'ROLE_USER'

export interface User {
	id: ID
	email: string
	login_type: UserLoginType
	nickname: string
	role: UserRoleType
	profile_image?: UserImage
}

export interface CreateUserRequest {
	email: string
	password?: string
	check_password?: string
	social_id?: string
	login_type: UserLoginType
	nickname: string
	phone: string
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
