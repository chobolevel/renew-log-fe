import { Flex } from '@chakra-ui/react'

interface GeneralLayoutProps {
	children: React.ReactNode
}

const GeneralLayout = ({ children }: GeneralLayoutProps) => {
	return <Flex>{children}</Flex>
}

export default GeneralLayout
