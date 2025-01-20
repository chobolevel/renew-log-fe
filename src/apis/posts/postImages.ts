import { Schema } from '@/apis'

export type PostImageType = 'THUMB_NAIL'

export interface PostImage extends Schema {
	type: PostImageType
	name: string
	url: string
	width: number
	height: number
}

export interface CreatePostImageRequest {
	type: PostImageType
	name: string
	url: string
	width?: number
	height?: number
}

export interface UpdatePostImageRequest {
	type: PostImageType
	name: string
	url: string
	width?: number
	height?: number
}
