import { Flex } from '@chakra-ui/react'
import React from 'react'
import {
	MobileLayoutFooter,
	MobileLayoutHeader,
	MobileLayoutNav,
} from '@/components'

interface MobileLayoutProps {
	children: React.ReactNode
}

const MobileLayout = ({ children }: MobileLayoutProps) => {
	return (
		<Flex direction={'column'} position={'relative'}>
			<MobileLayoutHeader />
			<Flex direction={'column'} align={'center'} justify={'center'}>
				<Flex w={'100%'} maxW={'1000px'} direction={'column'} p={4}>
					{children}
				</Flex>
			</Flex>
			<MobileLayoutNav />
			<MobileLayoutFooter />
		</Flex>
	)
}

export default MobileLayout
