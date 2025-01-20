import { Tag as _Tag } from '@/components'
import { Tag } from '@/apis'

interface CenterTagListItemProps {
	tag: Tag
}

const CenterTagListItem = ({ tag }: CenterTagListItemProps) => {
	return (
		<_Tag
			size={'lg'}
			fontWeight={'bold'}
			colorPalette={'green'}
			variant={'outline'}
			borderRadius={30}
			py={4}
			px={6}
			cursor={'pointer'}
			transition={'all 0.1s ease-in-out'}
			_hover={{
				bgColor: 'point',
				color: 'white',
			}}
		>
			{`${tag.name}(${tag.posts_count})`}
		</_Tag>
	)
}

export default CenterTagListItem
