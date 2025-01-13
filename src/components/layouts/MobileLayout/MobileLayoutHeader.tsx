import {
	Flex,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'

const MobileLayoutHeader = () => {
	return (
		<Flex
			as={'header'}
			direction={'column'}
			align={'center'}
			justify={'center'}
			position={'sticky'}
			top={0}
			bgColor={'white'}
			zIndex={100}
		>
			<Flex
				w={'100%'}
				maxW={'1000px'}
				p={2}
				align={'center'}
				justify={'space-between'}
			>
				<Flex>
					<Text fontSize={'xl'} fontWeight={'bold'}>
						Cholo
					</Text>
				</Flex>
				<Menu>
					<MenuButton>
						<HamburgerIcon fontSize={30} />
					</MenuButton>
					<MenuList>
						<MenuItem>Posts</MenuItem>
						<MenuItem>Tags</MenuItem>
						<MenuItem>Guest Books</MenuItem>
						<MenuItem>Channels</MenuItem>
					</MenuList>
				</Menu>
			</Flex>
		</Flex>
	)
}

export default MobileLayoutHeader
