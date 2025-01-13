import { Flex, Text } from '@chakra-ui/react'
import { MdArticle } from 'react-icons/md'
import { FaHashtag, FaHome } from 'react-icons/fa'
import { HiOutlinePencilAlt } from 'react-icons/hi'
import { IoChatbubbleEllipsesSharp } from 'react-icons/io5'
import React from 'react'

interface MobileLayoutNavItemProps {
	icon: React.ReactNode
	text: string
}

const MobileLayoutNavItem = ({ icon, text }: MobileLayoutNavItemProps) => {
	return (
		<Flex direction={'column'} align={'center'} gap={1} w={50}>
			{icon}
			<Text fontSize={'2xs'} fontWeight={'bold'}>
				{text}
			</Text>
		</Flex>
	)
}

const MobileLayoutNav = () => {
	return (
		<Flex
			position={'fixed'}
			bottom={0}
			w={'100%'}
			p={2}
			align={'center'}
			justify={'space-between'}
			bgColor={'white'}
			zIndex={100}
			pb={6}
		>
			<MobileLayoutNavItem icon={<MdArticle size={20} />} text={'Posts'} />
			<MobileLayoutNavItem icon={<FaHashtag size={20} />} text={'Tags'} />
			<MobileLayoutNavItem icon={<FaHome size={20} />} text={'Home'} />
			<MobileLayoutNavItem
				icon={<HiOutlinePencilAlt size={20} />}
				text={'Guests'}
			/>
			<MobileLayoutNavItem
				icon={<IoChatbubbleEllipsesSharp size={20} />}
				text={'Channels'}
			/>
		</Flex>
	)
}

export default MobileLayoutNav
