import { Flex, Text } from '@chakra-ui/react'
import {
	Avatar,
	Logo,
	MenuContent,
	MenuItem,
	MenuRoot,
	MenuTrigger,
} from '@/components'
import { GiHamburgerMenu } from 'react-icons/gi'
import { useGetMe, useLogout } from '@/apis'
import { useMemo } from 'react'
import { useRouter } from 'next/router'
import { PagePaths, toUrl } from '@/constants'

const MobileLayoutHeader = () => {
	const router = useRouter()

	const { data: me } = useGetMe()
	const { mutate: logout } = useLogout()

	const profileImage = useMemo(() => me?.profile_image, [me])
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
				p={2}
				align={'center'}
				justify={'space-between'}
			>
				<Flex>
					<Logo />
				</Flex>
				<MenuRoot>
					<MenuTrigger asChild>
						<GiHamburgerMenu size={30} />
					</MenuTrigger>
					<MenuContent>
						{me ? (
							<>
								<MenuItem
									value={'profile'}
									onClick={() => {
										router.push(toUrl(PagePaths.HOME))
									}}
								>
									<Flex align={'center'} gap={2}>
										<Text>마이페이지</Text>
										<Avatar src={profileImage?.origin_url} size={'xs'} />
									</Flex>
								</MenuItem>
								<MenuItem
									value={'logout'}
									onClick={() => {
										logout()
									}}
								>
									로그아웃
								</MenuItem>
							</>
						) : (
							<>
								<MenuItem
									value={'login'}
									onClick={() => {
										router.push(toUrl(PagePaths.SIGN_IN))
									}}
								>
									로그인
								</MenuItem>
								<MenuItem
									value={'join'}
									onClick={() => {
										router.push(toUrl(PagePaths.SIGN_UP))
									}}
								>
									회원가입
								</MenuItem>
							</>
						)}
					</MenuContent>
				</MenuRoot>
			</Flex>
		</Flex>
	)
}

export default MobileLayoutHeader
