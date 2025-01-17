import axios, { AxiosInstance } from 'axios'

export const KakaoLoginPageUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&response_type=code`

export interface KakaoTokenRequest {
	grant_type: 'authorization_code'
	client_id: string
	redirect_uri: string
	code: string
}

export interface KakaoTokenResponse {
	token_type: string
	access_token: string
	id_token: string
	expires_in: number
	refresh_token: string
	refresh_token_expires_id: number
	scope: string
}

export interface KakaoUserRequest {
	access_token: string
}

export interface KakaoUserResponse {
	id: string
	connected_at: string
	properties: {
		nickname: string
	}
	kakao_account: {
		profile_nickname_needs_agreement: boolean
		profile: {
			nickname: string
			is_default_nickname: boolean
		}
		has_email: boolean
		email_needs_agreement: boolean
		is_email_valid: boolean
		is_email_verified: boolean
		email: string
	}
}

export class KakaoApi {
	static tokenInstance: AxiosInstance = axios.create({
		baseURL: 'https://kauth.kakao.com',
		timeout: 10000,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
		},
	})
	static userInstance: AxiosInstance = axios.create({
		baseURL: 'https://kapi.kakao.com',
		timeout: 10000,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
		},
	})

	static issueToken = (request: KakaoTokenRequest) => {
		return KakaoApi.tokenInstance.post<KakaoTokenResponse>(
			'/oauth/token',
			request,
		)
	}

	static getProfile = (request: KakaoUserRequest) => {
		KakaoApi.userInstance.defaults.headers.common.Authorization = `Bearer ${request.access_token}`
		return KakaoApi.userInstance.get<KakaoUserResponse>('/v2/user/me')
	}
}
