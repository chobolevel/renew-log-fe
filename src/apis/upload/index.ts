import { useMutation } from '@tanstack/react-query'
import { Api } from '@/apis'
import { ApiV1Paths, toUrl } from '@/constants'

export interface PresignedUrl {
	presigned_url: string
	url: string
	filename_with_extension: string
}

export interface CreatePresignedUrlRequest {
	prefix: string
	filename: string
	extension: string
}

export const useCreatePresignedUrl = () => {
	return useMutation({
		mutationFn: (request: CreatePresignedUrlRequest) =>
			Api.post<PresignedUrl>(toUrl(ApiV1Paths.PRESIGNED_URL), request),
	})
}
