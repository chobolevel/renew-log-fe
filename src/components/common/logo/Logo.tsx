import { Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { PagePaths, toUrl } from '@/constants'

interface LogoProps {
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const Logo = ({ size = 'lg' }: LogoProps) => {
	const router = useRouter()
	return (
		<Text
			p={2}
			fontSize={size}
			borderRadius={10}
			fontWeight={'bold'}
			bgColor={'point'}
			color={'white'}
			cursor={'pointer'}
			onClick={() => {
				router.push(toUrl(PagePaths.HOME))
			}}
		>
			Cholo
		</Text>
	)
}

export default Logo
