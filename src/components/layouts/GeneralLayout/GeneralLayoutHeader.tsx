import { Flex, Text } from '@chakra-ui/react'
import { Logo } from '@/components'

const GeneralLayoutHeader = () => {
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
				align={'center'}
				justify={'space-between'}
				py={2}
			>
				<Flex>
					<Logo />
				</Flex>
				<Flex align={'center'} gap={2} fontWeight={'semibold'}>
					<Text>Posts</Text>
					<Text>Tags</Text>
					<Text>Guest Books</Text>
					<Text>Channels</Text>
				</Flex>
			</Flex>
		</Flex>
	)
}

export default GeneralLayoutHeader
