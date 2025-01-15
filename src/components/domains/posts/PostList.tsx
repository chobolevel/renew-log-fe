import { Flex, Grid, Text } from '@chakra-ui/react'
import { Post } from '@/apis'
import { PostListItem } from '@/components'

interface PostListProps {
	posts: Post[]
}

const PostList = ({ posts }: PostListProps) => {
	return (
		<>
			{posts ? (
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
				<Flex h={300} align={'center'} justify={'center'}>
					<Text>조건에 맞는 게시글을 찾을 수 없습니다.</Text>
				</Flex>
			)}
		</>
	)
}

export default PostList
