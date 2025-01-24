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
import { PagePaths, toUrl } from '@/constants'
import { match } from 'path-to-regexp'
import { useRouter } from 'next/router'

const navs = [
	{
		pathname: PagePaths.POSTS,
		label: '게시글',
		matchers: [
			match(PagePaths.POSTS),
			match(PagePaths.WRITE_POST),
			match(PagePaths.POST_DETAIL),
			match(PagePaths.EDIT_POST),
		],
	},
	{
		pathname: PagePaths.TAGS,
		label: '태그',
		matchers: [match(PagePaths.TAGS)],
	},
]

const GeneralLayoutHeader = () => {
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
				align={'center'}
				justify={'space-between'}
				py={2}
			>
				<Flex align={'center'} gap={4}>
					<Logo />
					{navs.map((nav, idx) => {
						const isMatch = nav.matchers.some((matcher) =>
							matcher(router.pathname),
						)
						return (
							<Link
								key={idx}
								href={nav.pathname}
								style={{
									padding: '4px 10px',
									fontWeight: 'bold',
									color: isMatch ? '#38a16a' : 'none',
								}}
							>
								{nav.label}
							</Link>
						)
					})}
				</Flex>
				<Flex align={'center'} gap={2} fontWeight={'semibold'}>
					{me ? (
						<MenuRoot>
							<MenuTrigger>
								<Avatar src={profileImage?.origin_url} cursor={'pointer'} />
							</MenuTrigger>
							<MenuContent>
								<MenuItem
									value={'my-page'}
									onClick={() => {
										router.push(toUrl(PagePaths.MyProfile))
									}}
								>
									마이페이지
								</MenuItem>
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
