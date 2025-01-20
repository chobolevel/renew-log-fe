import { Flex } from '@chakra-ui/react'
import { Tag } from '@/apis'
import { CenterTagListItem, EmptyState } from '@/components'

interface CenterTagListProps {
	tags: Tag[]
}

const CenterTagList = ({ tags }: CenterTagListProps) => {
	return (
		<>
			{tags.length > 0 ? (
				<Flex
					align={'center'}
					justify={'center'}
					gap={2}
					flexWrap={'wrap'}
					py={'50px'}
				>
					{tags.map((tag, idx) => {
						return <CenterTagListItem key={idx} tag={tag} />
					})}
				</Flex>
			) : (
				<EmptyState title={'태그를 찾을 수 없습니다.'} />
			)}
		</>
	)
}

export default CenterTagList
