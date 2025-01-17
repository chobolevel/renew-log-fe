import Head from 'next/head'
import { toaster, UnAuthenticatedLayout } from '@/components'
import { Flex, Spinner } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Api, LoginRequest, NaverApi } from '@/apis'
import { ApiV1Paths, PagePaths, toUrl } from '@/constants'
import { encodeToBase64 } from 'next/dist/build/webpack/loaders/utils'

const OauthNaver = () => {
	const router = useRouter()

	useEffect(() => {
		const code = router.query.code as string
		const state = router.query.state as string
		if (!code || !state) return
		NaverApi.issueToken({
			grant_type: 'authorization_code',
			client_id: process.env.NEXT_PUBLIC_NAVER_API_KEY as string,
			client_secret: process.env.NEXT_PUBLIC_NAVER_API_SECRET as string,
			code,
			state,
		})
			.then((res) => {
				NaverApi.getProfile({ access_token: res.data.access_token })
					.then((res) => {
						const id = res.data.response.id
						const email = res.data.response.email
						const loginRequest = {
							email,
							social_id: id,
							login_type: 'NAVER',
						} as LoginRequest
						Api.post<boolean>(toUrl(ApiV1Paths.LOGIN), loginRequest)
							.then(() => {
								router.push(toUrl(PagePaths.HOME))
							})
							.catch(() => {
								const base = encodeToBase64(loginRequest)
								router.push({
									pathname: toUrl(PagePaths.SOCIAL_SIGN_UP),
									query: { base },
								})
							})
					})
					.catch(() => {
						router.push(toUrl(PagePaths.SIGN_IN)).then(() => {
							toaster.create({
								type: 'error',
								title: '네이버 로그인 실패',
								description:
									'네이버 로그인에 실패하였습니다. 다시 시도해 주세요.',
							})
						})
					})
			})
			.catch(() => {
				router.push(toUrl(PagePaths.SIGN_IN)).then(() => {
					toaster.create({
						type: 'error',
						title: '네이버 로그인 실패',
						description: '네이버 로그인에 실패하였습니다. 다시 시도해 주세요.',
					})
				})
			})
	}, [router.query.code, router.query.state])
	return (
		<>
			<Head>
				<title>{'네이버 로그인 - TIL'}</title>

				{/*view port*/}
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<UnAuthenticatedLayout>
				<Flex w={'100vw'} h={'100vh'} align={'center'} justify={'center'}>
					<Spinner size={'xl'} />
				</Flex>
			</UnAuthenticatedLayout>
		</>
	)
}

export default OauthNaver
