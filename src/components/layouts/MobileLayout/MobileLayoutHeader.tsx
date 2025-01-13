import { Flex, Text } from '@chakra-ui/react'
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from '@/components'
import { GiHamburgerMenu } from 'react-icons/gi'

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
				<MenuRoot>
					<MenuTrigger asChild>
						<GiHamburgerMenu size={30} />
					</MenuTrigger>
					<MenuContent>
						<MenuItem value={'posts'}>Posts</MenuItem>
						<MenuItem value={'tags'}>Tags</MenuItem>
						<MenuItem value={'guest books'}>Guest Books</MenuItem>
						<MenuItem value={'channels'}>Channels</MenuItem>
					</MenuContent>
				</MenuRoot>
			</Flex>
		</Flex>
	)
}

export default MobileLayoutHeader
