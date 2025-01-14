import { Api, UserLoginType } from '@/apis'
import { useMutation } from '@tanstack/react-query'
import { ApiV1Paths, toUrl } from '@/constants'

export interface LoginRequest {
	email: string
	password?: string
	social_id?: string
	login_type: UserLoginType
}

export const useLogin = () => {
	return useMutation({
		mutationFn: (request: LoginRequest) =>
			Api.post<boolean>(toUrl(ApiV1Paths.LOGIN), request),
	})
}
