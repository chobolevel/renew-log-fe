import { Tag as _Tag } from '@/components'
import { Tag } from '@/apis'

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
			py={4}
			px={6}
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
