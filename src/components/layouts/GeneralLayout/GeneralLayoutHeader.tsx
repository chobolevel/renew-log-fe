import { Flex, Text } from '@chakra-ui/react'

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
					<Text fontSize={'2xl'} fontWeight={'bold'}>
						Cholo
					</Text>
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
