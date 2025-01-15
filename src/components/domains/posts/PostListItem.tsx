import { Flex, GridItem, Image, Text } from '@chakra-ui/react'
import { Post } from '@/apis'
import { useMemo } from 'react'
import { images } from '@/constants'
import { Tag } from '@/components'
import moment from 'moment'

interface PostListItemProps {
	post: Post
}

const PostListItem = ({ post }: PostListItemProps) => {
	const thumbNailImageUrl = useMemo(
		() => post?.thumb_nail_image?.url ?? images.logo.src,
		[post],
	)
	const writtenAt = useMemo(
		() => moment(post.created_at).format('YYYY-MM-DD'),
		[post],
	)
	return (
		<GridItem
			display={'flex'}
			flexDirection={'column'}
			gap={2}
			cursor={'pointer'}
		>
			<Image
				w={'100%'}
				h={{ base: 300, lg: 200 }}
				src={thumbNailImageUrl}
				alt={`${post.title} 섬네일 이미지`}
				objectFit={'cover'}
				borderRadius={10}
			/>
			<Flex direction={'column'} gap={2}>
				<Flex align={'center'} gap={2} flexWrap={'wrap'}>
					{post.tags.map((tag, idx) => {
						return (
							<Tag key={idx} colorPalette={'green'} fontWeight={'bold'}>
								{tag.name}
							</Tag>
						)
					})}
				</Flex>
				<Text fontWeight={'bold'} lineClamp={1}>
					{post.title}
				</Text>
				<Text fontSize={'sm'} lineClamp={2}>
					{post.sub_title}
				</Text>
				<Text color={'gray'} fontSize={'sm'}>
					{writtenAt}
				</Text>
			</Flex>
		</GridItem>
	)
}

export default PostListItem
