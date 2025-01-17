import { Flex } from '@chakra-ui/react'
import Link from 'next/link'
import { RiKakaoTalkFill } from 'react-icons/ri'
import { FaGoogle } from 'react-icons/fa'
import { SiNaver } from 'react-icons/si'
import {
	GoogleLoginPageUrl,
	KakaoLoginPageUrl,
	NaverLoginPageUrl,
} from '@/apis'

const SocialButtons = () => {
	return (
		<Flex align={'center'} justify={'center'} gap={4}>
			<Link
				style={{
					padding: '10px',
					borderRadius: '10px',
					backgroundColor: '#fde500',
				}}
				href={KakaoLoginPageUrl}
			>
				<RiKakaoTalkFill size={24} color={'#1c1b18'} />
			</Link>
			<Link
				style={{
					padding: '10px',
					borderRadius: '10px',
					backgroundColor: '#03c75b',
				}}
				href={NaverLoginPageUrl}
			>
				<SiNaver size={24} color={'white'} />
			</Link>
			<Link
				style={{
					padding: '10px',
					borderRadius: '10px',
					backgroundColor: 'gray',
				}}
				href={GoogleLoginPageUrl}
			>
				<FaGoogle size={24} color={'white'} />
			</Link>
		</Flex>
	)
}

export default SocialButtons
