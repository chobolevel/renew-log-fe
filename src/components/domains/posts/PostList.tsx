import { Grid } from '@chakra-ui/react'
import { Post } from '@/apis'
import { EmptyState, PostListItem } from '@/components'
import React from 'react'
import { MdArticle } from 'react-icons/md'

interface PostListProps {
	posts: Post[]
}

const PostList = ({ posts }: PostListProps) => {
	return (
		<>
			{posts.length > 0 ? (
				<Grid
					templateColumns={{
						base: 'repeat(1, 1fr)',
						md: 'repeat(2, 1fr)',
						lg: 'repeat(3, 1fr)',
					}}
					gap={10}
				>
					{posts.map((post, idx) => {
						return <PostListItem key={idx} post={post} />
					})}
				</Grid>
			) : (
				<EmptyState
					icon={<MdArticle size={20} />}
					title={'게시글을 찾을 수 없습니다.'}
				/>
			)}
		</>
	)
}

export default PostList
