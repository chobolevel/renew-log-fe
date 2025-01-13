import { UserLoginType } from '@/apis'

export interface LoginRequest {
	email: string
	password?: string
	social_id?: string
	login_type: UserLoginType
}
