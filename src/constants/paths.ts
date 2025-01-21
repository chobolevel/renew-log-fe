import { compile } from 'path-to-regexp'

export const toUrl = (path: ApiV1Paths | PagePaths, params?: object) =>
	compile(path, { encode: encodeURIComponent })(params)

export enum ApiV1Paths {
	PRESIGNED_URL = '/api/v1/upload/presigned-url',

	LOGIN = '/api/v1/login',
	LOGOUT = '/api/v1/logout',
	REISSUE = '/api/v1/reissue',

	ME = '/api/v1/users/me',
	USERS = '/api/v1/users/:id?',
	USERS_IMAGES = '/api/v1/users/images/:id?',

	POSTS = '/api/v1/posts/:id?',

	POST_COMMENTS = '/api/v1/posts/comments/:id?',

	TAGS = '/api/v1/tags',
}

export enum PagePaths {
	HOME = '/',

	SIGN_IN = '/sign/in',
	SIGN_UP = '/sign/up',
	SOCIAL_SIGN_UP = '/sign/up/social',

	POSTS = '/posts',
	WRITE_POST = '/posts/write',
	POST_DETAIL = '/posts/:id',
	EDIT_POST = '/posts/:id/edit',

	TAGS = '/tags',

	LOGGERS = '/loggers',
	LOGGER_DETAIL = '/loggers/:id',
}
