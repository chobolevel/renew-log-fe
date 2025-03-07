import { Tag } from '@/apis'
import { Tag as _Tag } from '@/components'

interface TagListItemProps {
	tag: Tag
}

const TagListItem = ({ tag }: TagListItemProps) => {
	return (
		<_Tag
			size={'lg'}
			fontWeight={'bold'}
			colorPalette={'green'}
			variant={'outline'}
			borderRadius={30}
			py={2}
			px={4}
			cursor={'pointer'}
			transition={'all 0.1s ease-in-out'}
			_hover={{
				bgColor: 'point',
				color: 'white',
			}}
		>
			{tag.name}
		</_Tag>
	)
}

export default TagListItem
