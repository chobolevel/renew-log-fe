import { Api, ID, Schema } from '@/apis'
import { useMutation } from '@tanstack/react-query'
import { ApiV1Paths, toUrl } from '@/constants'

export type UserImageType = 'PROFILE'

export interface UserImage extends Schema {
	type: UserImageType
	origin_url: string
	name: string
}

export interface CreateUserImageRequest {
	type: UserImageType
	origin_url: string
	name: string
}

export interface DeleteUserImageRequest {
	id: ID
}

export const useCreateUserImage = () => {
	return useMutation({
		mutationFn: (request: CreateUserImageRequest) =>
			Api.post<ID>(toUrl(ApiV1Paths.USERS_IMAGES), request),
	})
}

export const useDeleteUserImage = () => {
	return useMutation({
		mutationFn: (request: DeleteUserImageRequest) =>
			Api.delete<boolean>(toUrl(ApiV1Paths.USERS_IMAGES, { id: request.id })),
	})
}
