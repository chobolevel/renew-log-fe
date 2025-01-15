import { Schema } from '@/apis'

export interface Tag extends Schema {
	name: string
	posts_count: number
}
