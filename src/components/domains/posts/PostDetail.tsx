import { Button, Flex, Separator, Spinner, Text } from '@chakra-ui/react'
import {
	Avatar,
	EmptyState,
	PostCommentList,
	Prose,
	TagList,
	toaster,
	WriterPostCommentForm,
} from '@/components'
import React, { useMemo } from 'react'
import { Post, useDeletePost, useGetMe, useGetPostComments } from '@/apis'
import moment from 'moment/moment'
import { IoShareSocialSharp } from 'react-icons/io5'
import { useConfirm } from '@/store'
import { useRouter } from 'next/router'
import { PagePaths, toUrl } from '@/constants'
import { FaCommentDots } from 'react-icons/fa'

interface PostDetailProps {
	post: Post
}

const PostDetail = ({ post }: PostDetailProps) => {
	const router = useRouter()
	const { open } = useConfirm()

	const { data: me } = useGetMe()
	const { data: postComments, isFetching: isPostCommentsFetching } =
		useGetPostComments({
			postId: post.id,
			orderTypes: ['CREATED_AT_DESC'],
		})
	const { mutate: deletePost } = useDeletePost()

	const writtenAt = useMemo(
		() => moment(post?.created_at).format('YYYY-MM-DD'),
		[post],
	)
	const isWriter = useMemo(() => post.writer.id === me?.id, [post, me])
	const writer = useMemo(() => post.writer, [post])
	return (
		<Flex direction={'column'} gap={6} py={6}>
			<TagList tags={post.tags} />
			<Flex direction={'column'} gap={2}>
				<Text fontSize={'lg'} fontWeight={'bold'}>
					{post.title}
				</Text>
				<Text>{post.sub_title}</Text>
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
				<Flex align={'center'} gap={2}>
					<Text fontSize={'sm'} color={'gray'}>
						{writtenAt}
					</Text>
					<IoShareSocialSharp
						size={20}
						cursor={'pointer'}
						onClick={() => {
							if (!navigator.share) {
								toaster.create({
									type: 'error',
									title: '현재 환경에서는 공유기능을 제공하지 않습니다.',
								})
								return
							}
							navigator.share({
								url: location.href,
								title: post.title,
								text: post.sub_title,
							})
						}}
					/>
				</Flex>
			</Flex>
			<Separator />
			<Prose minW={'100%'} dangerouslySetInnerHTML={{ __html: post.content }} />
			<Flex direction={'column'} gap={4}>
				<Text fontWeight={'bold'}>{`댓글(${postComments?.total_count})`}</Text>
				{postComments ? (
					<>
						<WriterPostCommentForm post={post} />
						<PostCommentList postComments={postComments.data} />
					</>
				) : (
					<>
						{isPostCommentsFetching ? (
							<Flex h={300} align={'center'} justify={'center'}>
								<Spinner size={'lg'} />
							</Flex>
						) : (
							<EmptyState
								icon={<FaCommentDots />}
								title={'댓글을 찾을 수 없습니다.'}
							/>
						)}
					</>
				)}
			</Flex>
			{isWriter && (
				<Flex align={'center'} justify={'end'} gap={2}>
					<Button
						colorPalette={'green'}
						fontWeight={'bold'}
						onClick={() => {
							router.push(toUrl(PagePaths.EDIT_POST, { id: post.id }))
						}}
					>
						수정
					</Button>
					<Button
						colorPalette={'green'}
						variant={'outline'}
						fontWeight={'bold'}
						onClick={() => {
							open({
								title: '로그 삭제',
								description: '정말 로그를 삭제하시겠습니까?',
								onConfirm: () => {
									deletePost(
										{ id: post.id },
										{
											onSuccess: () => {
												router.push(toUrl(PagePaths.POSTS)).then(() => {
													toaster.create({
														type: 'success',
														title: '로그 삭제 완료',
													})
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
				</Flex>
			)}
		</Flex>
	)
}

export default PostDetail
