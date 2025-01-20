import { Button, Flex, Separator, Text } from '@chakra-ui/react'
import { Prose, TagList, toaster } from '@/components'
import React, { useMemo } from 'react'
import { Post, useDeletePost, useGetMe } from '@/apis'
import moment from 'moment/moment'
import { IoShareSocialSharp } from 'react-icons/io5'
import { useConfirm } from '@/store'
import { useRouter } from 'next/router'
import { PagePaths, toUrl } from '@/constants'

interface PostDetailProps {
	post: Post
}

const PostDetail = ({ post }: PostDetailProps) => {
	const router = useRouter()
	const { open } = useConfirm()

	const { data: me } = useGetMe()
	const { mutate: deletePost } = useDeletePost()

	const writtenAt = useMemo(
		() => moment(post?.created_at).format('YYYY-MM-DD'),
		[post],
	)
	const isWriter = useMemo(() => post.writer.id === me?.id, [post, me])
	return (
		<Flex direction={'column'} gap={6} py={6}>
			<TagList tags={post.tags} />
			<Flex direction={'column'} gap={2}>
				<Text fontSize={'lg'} fontWeight={'bold'}>
					{post.title}
				</Text>
				<Text>{post.sub_title}</Text>
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
									title: '현재 환경에서는 공유기능을 제고하지 않습니다.',
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
			{isWriter && (
				<Flex align={'center'} justify={'end'} gap={2}>
					<Button colorPalette={'green'} fontWeight={'bold'}>
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
