import { Flex } from '@chakra-ui/react'
import React from 'react'

interface UnAuthenticatedLayoutProps {
	children: React.ReactNode
}

const UnAuthenticatedLayout = ({ children }: UnAuthenticatedLayoutProps) => {
	return (
		<Flex w={'100vw'} h={'100vh'} direction={'column'}>
			{children}
		</Flex>
	)
}

export default UnAuthenticatedLayout