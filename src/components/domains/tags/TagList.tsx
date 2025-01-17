import { Flex, Text } from '@chakra-ui/react'
import { Tag } from '@/apis'
import { TagListItem } from '@/components'

interface TagListProps {
	tags: Tag[]
}

const TagList = ({ tags }: TagListProps) => {
	return (
		<>
			{tags.length > 0 ? <Flex
				align={'center'}
				justify={'center'}
				gap={2}
				flexWrap={'wrap'}
				py={'50px'}
			>
				{tags.map((tag, idx) => {
					return <TagListItem key={idx} tag={tag} />
				})}
			</Flex> : <Flex h={150} align={"center"} justify={"center"}>
				<Text>태그를 찾을 수 없습니다.</Text>
			</Flex>}
		</>
	)
}

export default TagList
