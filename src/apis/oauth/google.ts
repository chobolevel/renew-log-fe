import axios, { AxiosInstance } from 'axios'

export interface GoogleTokenRequest {
	client_id: string
	client_secret: string
	code: string
	grant_type: 'authorization_code'
	redirect_uri: string
}

export interface GoogleTokenResponse {
	access_token: string
	expires_in: number
	refresh_token: string
	scope: string
	token_type: string
}

export interface GoogleUserRequest {
	access_token: string
}

export interface GoogleUserResponse {
	id: string
	email: string
	verified_email: boolean
	picture: string
}

export const GoogleLoginPageUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}&response_type=code&scope=email&access_type=online&state=TIL`

export class GoogleApi {
	static tokenInstance: AxiosInstance = axios.create({
		baseURL: 'https://oauth2.googleapis.com',
		timeout: 10000,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	})
	static userInstance: AxiosInstance = axios.create({
		baseURL: 'https://www.googleapis.com',
		timeout: 10000,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	})

	static issueToken = (request: GoogleTokenRequest) => {
		return GoogleApi.tokenInstance.post<GoogleTokenResponse>('/token', request)
	}

	static getProfile = (request: GoogleUserRequest) => {
		GoogleApi.userInstance.defaults.headers.common.Authorization = `Bearer ${request.access_token}`
		return GoogleApi.userInstance.get<GoogleUserResponse>('/userinfo/v2/me')
	}
}
