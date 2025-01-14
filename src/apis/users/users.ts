import { useMutation } from '@tanstack/react-query'
import { Api, ID } from '@/apis'
import { ApiV1Paths, toUrl } from '@/constants'

export type UserLoginType = 'GENERAL' | 'KAKAO' | 'NAVER' | 'GOOGLE'

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
