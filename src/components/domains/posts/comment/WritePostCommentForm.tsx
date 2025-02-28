import { Flex, Textarea } from '@chakra-ui/react'
import { Button, InputErrorMessage, toaster } from '@/components'
import { useForm } from 'react-hook-form'
import {
	CreatePostCommentRequest,
	Post,
	useCreatePostComment,
	useInvalidate,
} from '@/apis'
import { useCallback } from 'react'
import { ErrorMessage } from '@hookform/error-message'
import { ApiV1Paths, toUrl } from '@/constants'

interface WriterPostCommentFormProps {
	post: Post
}

const WritePostCommentForm = ({ post }: WriterPostCommentFormProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<CreatePostCommentRequest>({
		defaultValues: {
			post_id: post.id,
		},
	})
	const invalidate = useInvalidate(toUrl(ApiV1Paths.POST_COMMENTS))

	const { mutate: createPostComment } = useCreatePostComment()
	return (
		<Flex
			gap={2}
			as={'form'}
			onSubmit={handleSubmit(
				useCallback((data) => {
					createPostComment(data, {
						onSuccess: () => {
							invalidate()
							toaster.create({
								type: 'success',
								title: '댓글 등록 완료',
							})
						},
					})
				}, []),
			)}
		>
			<Flex direction={'column'} gap={2} flex={1}>
				<Textarea
					placeholder={'댓글을 작성해보세요.'}
					{...register('content', { required: '댓글이 작성되지 않았습니다.' })}
				/>
				<ErrorMessage
					name={'content'}
					errors={errors}
					render={({ message }) => (
						<InputErrorMessage>{message}</InputErrorMessage>
					)}
				/>
			</Flex>
			<Button colorPalette={'green'} fontWeight={'bold'} type={'submit'}>
				등록
			</Button>
		</Flex>
	)
}

export default WritePostCommentForm
