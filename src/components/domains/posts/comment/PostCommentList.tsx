import { Flex } from '@chakra-ui/react'
import { PostComment } from '@/apis'
import { EmptyState, PostCommentListItem } from '@/components'
import { FaCommentDots } from 'react-icons/fa'

interface PostCommentListProps {
	postComments: PostComment[]
}

const PostCommentList = ({ postComments }: PostCommentListProps) => {
	return (
		<>
			{postComments.length > 0 ? (
				<Flex direction={'column'}>
					{postComments.map((postComment, idx) => {
						return <PostCommentListItem key={idx} postComment={postComment} />
					})}
				</Flex>
			) : (
				<EmptyState
					icon={<FaCommentDots />}
					title={'댓글을 찾을 수 없습니다.'}
				/>
			)}
		</>
	)
}

export default PostCommentList
