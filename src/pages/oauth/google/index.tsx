import Head from 'next/head'
import { toaster, UnAuthenticatedLayout } from '@/components'
import { Flex, Spinner } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Api, GoogleApi, LoginRequest } from '@/apis'
import { ApiV1Paths, PagePaths, toUrl } from '@/constants'
import { encodeToBase64 } from 'next/dist/build/webpack/loaders/utils'

const OauthGoogle = () => {
	const router = useRouter()

	useEffect(() => {
		const code = router.query.code as string
		if (!code) return
		GoogleApi.issueToken({
			client_id: process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string,
			client_secret: process.env.NEXT_PUBLIC_GOOGLE_API_SECRET as string,
			redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI as string,
			grant_type: 'authorization_code',
			code,
		})
			.then((res) => {
				GoogleApi.getProfile({ access_token: res.data.access_token })
					.then((res) => {
						const id = res.data.id
						const email = res.data.email
						const loginRequest = {
							email,
							social_id: id.toString(),
							login_type: 'GOOGLE',
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
								title: '구글 로그인 실패',
								description:
									'구글 로그인에 실패하였습니다. 다시 시도해 주세요.',
							})
						})
					})
			})
			.catch(() => {
				router.push(toUrl(PagePaths.SIGN_IN)).then(() => {
					toaster.create({
						type: 'error',
						title: '구글 로그인 실패',
						description: '구글 로그인에 실패하였습니다. 다시 시도해 주세요.',
					})
				})
			})
	}, [router.query.code])
	return (
		<>
			<Head>
				<title>{'구글 로그인 - TIL'}</title>

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

export default OauthGoogle
