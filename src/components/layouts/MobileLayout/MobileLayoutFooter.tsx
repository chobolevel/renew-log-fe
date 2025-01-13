import { Flex, Text } from '@chakra-ui/react'

const MobileLayoutFooter = () => {
	return (
		<Flex
			as={'footer'}
			direction={'column'}
			align={'center'}
			justify={'center'}
		>
			<Flex
				w={'100%'}
				maxW={'1000px'}
				align={'center'}
				justify={'center'}
				py={30}
			>
				<Text fontSize={'sm'} fontWeight={'bold'}>
					Copyright &copy; chobolevel. All Rights Reserved.
				</Text>
			</Flex>
		</Flex>
	)
}

export default MobileLayoutFooter
