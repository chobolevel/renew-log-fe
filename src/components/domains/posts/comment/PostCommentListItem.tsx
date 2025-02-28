import { Editable, Flex, Text, useEditable } from '@chakra-ui/react'
import {
	PostComment,
	useDeletePostComment,
	useGetMe,
	useInvalidate,
	useUpdatePostComment,
} from '@/apis'
import { useMemo } from 'react'
import { Avatar, Button, toaster } from '@/components'
import { useRouter } from 'next/router'
import { ApiV1Paths, PagePaths, toUrl } from '@/constants'
import moment from 'moment'
import { useConfirm } from '@/store'

interface PostCommentListItemProps {
	postComment: PostComment
}

const PostCommentListItem = ({ postComment }: PostCommentListItemProps) => {
	const router = useRouter()
	const { open } = useConfirm()
	const invalidate = useInvalidate(toUrl(ApiV1Paths.POST_COMMENTS))

	const { data: me } = useGetMe()
	const { mutate: updatePostComment } = useUpdatePostComment()
	const { mutate: deletePostComment } = useDeletePostComment()

	const writer = useMemo(() => postComment.writer, [postComment])
	const isWriter = useMemo(() => me?.id == writer.id, [me, writer])
	const writtenAt = useMemo(
		() => moment(postComment.created_at).format('YYYY-MM-DD'),
		[postComment],
	)
	const editable = useEditable({
		edit: isWriter,
		defaultValue: postComment.content,
	})
	return (
		<Flex direction={'column'} gap={2}>
			<Flex align={'center'} gap={2}>
				<Avatar size={'xs'} src={writer.profile_image?.origin_url} />
				<Text
					fontWeight={'bold'}
					cursor={'pointer'}
					onClick={() => {
						router.push(toUrl(PagePaths.LOGGER_DETAIL, { id: writer.id }))
					}}
				>
					{writer.nickname}
				</Text>
			</Flex>
			<Editable.RootProvider value={editable}>
				<Editable.Preview />
				<Editable.Textarea />
			</Editable.RootProvider>
			<Flex justify={'space-between'} align={'center'}>
				<Text fontSize={'sm'} color={'gray'}>
					{writtenAt}
				</Text>
				<Flex gap={2}>
					{isWriter && (
						<>
							<Button
								size={'xs'}
								colorPalette={'green'}
								fontWeight={'bold'}
								variant={'plain'}
								onClick={() => {
									updatePostComment(
										{
											id: postComment.id,
											content: editable.value,
											update_mask: ['CONTENT'],
										},
										{
											onSuccess: () => {
												invalidate()
												toaster.create({
													type: 'success',
													title: '댓글이 수정되었습니다.',
												})
											},
										},
									)
								}}
							>
								수정
							</Button>
							<Button
								size={'xs'}
								colorPalette={'red'}
								fontWeight={'bold'}
								variant={'plain'}
								onClick={() => {
									open({
										title: '댓글 삭제',
										description: '정말 댓글을 삭제하시겠습니까?',
										onConfirm: () => {
											deletePostComment(
												{
													id: postComment.id,
												},
												{
													onSuccess: () => {
														invalidate()
														toaster.create({
															type: 'success',
															title: '댓글이 삭제되었습니다.',
														})
													},
												},
											)
										},
									})
								}}
							>
								삭제
							</Button>
						</>
					)}
				</Flex>
			</Flex>
		</Flex>
	)
}

export default PostCommentListItem
