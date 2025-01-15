import { Flex } from '@chakra-ui/react'
import {
	Avatar,
	Logo,
	MenuContent,
	MenuItem,
	MenuRoot,
	MenuTrigger,
} from '@/components'
import { useGetMe, useLogout } from '@/apis'
import { useMemo } from 'react'
import Link from 'next/link'
import { PagePaths } from '@/constants'

const GeneralLayoutHeader = () => {
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
				align={'center'}
				justify={'space-between'}
				py={2}
			>
				<Flex>
					<Logo />
				</Flex>
				<Flex align={'center'} gap={2} fontWeight={'semibold'}>
					{me ? (
						<MenuRoot>
							<MenuTrigger>
								<Avatar src={profileImage?.origin_url} cursor={'pointer'} />
							</MenuTrigger>
							<MenuContent>
								<MenuItem value={'my-page'}>마이페이지</MenuItem>
								<MenuItem
									value={'logout'}
									onClick={() => {
										logout()
									}}
								>
									로그아웃
								</MenuItem>
							</MenuContent>
						</MenuRoot>
					) : (
						<>
							<Link href={PagePaths.SIGN_IN}>로그인</Link>
							<Link href={PagePaths.SIGN_UP}>회원가입</Link>
						</>
					)}
				</Flex>
			</Flex>
		</Flex>
	)
}

export default GeneralLayoutHeader
