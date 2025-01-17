import { Api, useInvalidate, UserLoginType } from '@/apis'
import { useMutation } from '@tanstack/react-query'
import { ApiV1Paths, toUrl } from '@/constants'
import { toaster } from '@/components'

export interface LoginRequest {
	email: string
	password?: string
	social_id?: string
	login_type: UserLoginType
}

export const useLogin = () => {
	const invalidate = useInvalidate(toUrl(ApiV1Paths.ME))
	return useMutation({
		mutationFn: (request: LoginRequest) =>
			Api.post<boolean>(toUrl(ApiV1Paths.LOGIN), request),
		onSuccess: invalidate,
	})
}

export const useLogout = () => {
	const invalidate = useInvalidate(toUrl(ApiV1Paths.ME))
	return useMutation({
		mutationFn: () => Api.post<boolean>(toUrl(ApiV1Paths.LOGOUT)),
		onSuccess: () => {
			invalidate()
			toaster.create({
				type: 'info',
				title: '로그아웃',
				duration: 1000,
			})
		},
	})
}
