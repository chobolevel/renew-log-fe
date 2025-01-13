import { Flex } from '@chakra-ui/react'
import { GeneralLayoutFooter, GeneralLayoutHeader } from '@/components'

interface GeneralLayoutProps {
	children: React.ReactNode
}

const GeneralLayout = ({ children }: GeneralLayoutProps) => {
	return (
		<Flex direction={'column'} position={'relative'}>
			<GeneralLayoutHeader />
			<Flex direction={'column'} align={'center'} justify={'center'}>
				<Flex w={'100%'} maxW={'1000px'} direction={'column'} p={4}>
					{children}
				</Flex>
			</Flex>
			<GeneralLayoutFooter />
		</Flex>
	)
}

export default GeneralLayout
