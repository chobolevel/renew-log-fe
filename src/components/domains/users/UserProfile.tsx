import { Flex, Separator, Spinner, Tabs, Text } from '@chakra-ui/react'
import {
	Avatar,
	EmptyState,
	PaginationNextTrigger,
	PaginationPageText,
	PaginationPrevTrigger,
	PaginationRoot,
	PostCommentList,
	PostList,
} from '@/components'
import { useGetPostComments, useGetPosts, User } from '@/apis'
import React, { useMemo, useState } from 'react'
import moment from 'moment/moment'
import { MdArticle } from 'react-icons/md'
import { FaCommentDots } from 'react-icons/fa'

const POST_LIMIT_COUNT = 6
const POST_COMMENT_LIMIT_COUNT = 10

interface UserProfileProps {
	user: User
}

const UserProfile = ({ user }: UserProfileProps) => {
	const [postsPage, setPostsPage] = useState<number>(1)
	const [postCommentsPage, setPostCommentsPage] = useState<number>(1)

	const { data: posts, isFetching: isPostsFetching } = useGetPosts({
		skipCount: (postsPage - 1) * POST_LIMIT_COUNT,
		limitCount: POST_LIMIT_COUNT,
		orderTypes: ['CREATED_AT_DESC'],
	})
	const { data: postComments, isFetching: isPostCommentsFetching } =
		useGetPostComments({
			skipCount: (postCommentsPage - 1) * POST_COMMENT_LIMIT_COUNT,
			limitCount: POST_COMMENT_LIMIT_COUNT,
			writerId: user.id,
		})

	const profileImage = useMemo(() => user.profile_image, [user])
	const joinedAt = useMemo(
		() => moment(user.created_at).format('YYYY-MM-DD'),
		[user],
	)
	return (
		<Flex direction={'column'} gap={6}>
			<Flex p={4} gap={6}>
				<Avatar size={'2xl'} src={profileImage?.origin_url} />
				<Flex direction={'column'} gap={2}>
					<Text fontSize={'lg'} fontWeight={'bold'}>
						{user.nickname}
					</Text>
					<Text>{`가입일: ${joinedAt}`}</Text>
				</Flex>
			</Flex>
			<Separator py={6} />
			<Tabs.Root lazyMount unmountOnExit defaultValue={'posts'}>
				<Tabs.List>
					<Tabs.Trigger value={'posts'} fontWeight={'bold'}>
						작성한 게시글
					</Tabs.Trigger>
					<Tabs.Trigger value={'comments'} fontWeight={'bold'}>
						작성한 댓글
					</Tabs.Trigger>
				</Tabs.List>
				<Tabs.Content value={'posts'}>
					<Flex direction={'column'} gap={6}>
						{posts ? (
							<>
								<PostList posts={posts.data} />
								<Flex align={'center'} justify={'center'}>
									<PaginationRoot
										page={postsPage}
										pageSize={POST_LIMIT_COUNT}
										count={posts.total_count}
										siblingCount={1}
										onPageChange={(e) => {
											setPostsPage(e.page)
										}}
									>
										<Flex align={'center'} gap={2}>
											<PaginationPrevTrigger />
											<PaginationPageText />
											<PaginationNextTrigger />
										</Flex>
									</PaginationRoot>
								</Flex>
							</>
						) : (
							<>
								{isPostsFetching ? (
									<Flex h={300} align={'center'} justify={'center'}>
										<Spinner size={'lg'} />
									</Flex>
								) : (
									<EmptyState
										icon={<MdArticle size={20} />}
										title={'게시글을 찾을 수 없습니다.'}
									/>
								)}
							</>
						)}
					</Flex>
				</Tabs.Content>
				<Tabs.Content value={'comments'}>
					<Flex direction={'column'} gap={6}>
						{postComments ? (
							<>
								<PostCommentList postComments={postComments.data} />
								<Flex align={'center'} justify={'center'}>
									<PaginationRoot
										page={postCommentsPage}
										pageSize={POST_COMMENT_LIMIT_COUNT}
										count={postComments.total_count}
										siblingCount={1}
										onPageChange={(e) => {
											setPostCommentsPage(e.page)
										}}
									>
										<Flex align={'center'} gap={2}>
											<PaginationPrevTrigger />
											<PaginationPageText />
											<PaginationNextTrigger />
										</Flex>
									</PaginationRoot>
								</Flex>
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
				</Tabs.Content>
			</Tabs.Root>
		</Flex>
	)
}

export default UserProfile
