import { Flex } from '@chakra-ui/react'
import { Tag } from '@/apis'
import { TagListItem } from '@/components'

interface TagListProps {
	tags: Tag[]
}

const TagList = ({ tags }: TagListProps) => {
	return (
		<Flex align={'center'} gap={2} flexWrap={'wrap'}>
			{tags.map((tag, idx) => {
				return <TagListItem key={idx} tag={tag} />
			})}
		</Flex>
	)
}

export default TagList
