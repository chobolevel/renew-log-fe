import axios, { AxiosInstance } from 'axios'

export const NaverLoginPageUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_NAVER_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_NAVER_REDIRECT_URI}&state=TIL`

export interface NaverTokenRequest {
	grant_type: 'authorization_code'
	client_id: string
	client_secret: string
	code: string
	state: string
}

export interface NaverTokenResponse {
	access_token: string
	refresh_token: string
	token_type: string
	expires_in: number
	error: string
	error_description: string
}

export interface NaverUserRequest {
	access_token: string
}

export interface NaverUserResponse {
	reusltcode: string
	message: string
	response: {
		id: string
		nickname: string
		name: string
		email: string
		gender: string
		age: string
		birthday: string
		profile_image: string
		birthyear: string
		mobile: string
	}
}

export class NaverApi {
	static instance: AxiosInstance = axios.create({
		timeout: 10000,
	})

	static issueToken = (request: NaverTokenRequest) => {
		return NaverApi.instance.get<NaverTokenResponse>(
			`/naver-token/oauth2.0/token?grant_type=${request.grant_type}&client_id=${request.client_id}&client_secret=${request.client_secret}&code=${request.code}&state=${request.state}`,
		)
	}

	static getProfile = (request: NaverUserRequest) => {
		NaverApi.instance.defaults.headers.common.Authorization = `Bearer ${request.access_token}`
		return NaverApi.instance.get<NaverUserResponse>('/naver-user/v1/nid/me')
	}
}
