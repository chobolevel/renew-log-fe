import { Flex, Text } from '@chakra-ui/react'

const GeneralLayoutFooter = () => {
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
				py={50}
			>
				<Text fontSize={'sm'} fontWeight={'bold'}>
					Copyright 2025 chobolevel. All rights reserved.
				</Text>
			</Flex>
		</Flex>
	)
}

export default GeneralLayoutFooter
