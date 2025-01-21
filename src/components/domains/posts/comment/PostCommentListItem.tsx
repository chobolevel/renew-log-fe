import { Flex, Text } from '@chakra-ui/react'
import { PostComment } from '@/apis'
import { useMemo } from 'react'
import { Avatar } from '@/components'
import { useRouter } from 'next/router'
import { PagePaths, toUrl } from '@/constants'
import moment from 'moment'

interface PostCommentListItemProps {
	postComment: PostComment
}

const PostCommentListItem = ({ postComment }: PostCommentListItemProps) => {
	const router = useRouter()

	const writer = useMemo(() => postComment.writer, [postComment])
	const writtenAt = useMemo(
		() => moment(postComment.created_at).format('YYYY-MM-DD'),
		[postComment],
	)
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
			<Text>{postComment.content}</Text>
			<Text fontSize={'sm'} color={'gray'}>
				{writtenAt}
			</Text>
		</Flex>
	)
}

export default PostCommentListItem
