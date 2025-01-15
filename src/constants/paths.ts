import { compile } from 'path-to-regexp'

export const toUrl = (path: ApiV1Paths | PagePaths, params?: object) =>
	compile(path, { encode: encodeURIComponent })(params)

export enum ApiV1Paths {
	LOGIN = '/api/v1/login',
	LOGOUT = '/api/v1/logout',
	REISSUE = '/api/v1/reissue',

	ME = '/api/v1/users/me',
	USERS = '/api/v1/users/:id?',
	USERS_IMAGES = '/api/v1/users/images/:id?',

	PRESIGNED_URL = '/api/v1/upload/presigned-url',
}

export enum PagePaths {
	HOME = '/',
	SIGN_IN = '/sign/in',
	SIGN_UP = '/sign/up',
}
