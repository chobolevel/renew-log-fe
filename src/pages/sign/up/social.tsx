import { images, PagePaths, toUrl } from '@/constants'
import Head from 'next/head'
import {
	Button,
	InputErrorMessage,
	InputLabel,
	Logo,
	UnAuthenticatedLayout,
} from '@/components'
import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { decodeFromBase64 } from 'next/dist/build/webpack/loaders/utils'
import {
	CreateUserRequest,
	LoginRequest,
	useCreateUser,
	useLogin,
} from '@/apis'
import { Flex, Input, Text } from '@chakra-ui/react'
import { ErrorMessage } from '@hookform/error-message'
import { useForm } from 'react-hook-form'

const SocialSignUp = () => {
	const router = useRouter()
	const {
		handleSubmit,
		register,
		setValue,
		formState: { errors },
	} = useForm<CreateUserRequest>()

	const { mutate: createUser } = useCreateUser()
	const { mutate: login } = useLogin()

	useEffect(() => {
		const base = router.query.base as string
		if (!base) return
		const decodedBase = decodeFromBase64(base) as LoginRequest
		setValue('email', decodedBase.email)
		setValue('social_id', decodedBase.social_id)
		setValue('login_type', decodedBase.login_type)
	}, [router.query.base])
	return (
		<>
			<Head>
				<title>{'회원가입 - TIL'}</title>
				<meta name={'title'} content={'회원가입 - TIL'} />
				<meta
					name={'description'}
					content={
						'TIL(Today I Logged)에 회원가입하고 다른 개발자들과 학습한 내용을 공유해보세요!'
					}
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="robots" content="index, follow" />

				<meta property={'og:type'} content={'article'} />
				<meta property={'og.locale'} content={'ko_KR'} />
				<meta property={'og:title'} content={'회원가입 - TIL'} />
				<meta
					property={'og:description'}
					content={
						'TIL(Today I Logged)에 회원가입하고 다른 개발자들과 학습한 내용을 공유해보세요!'
					}
				/>
				<meta
					property={'og:url'}
					content={`https://${process.env.NEXT_PUBLIC_DOMAIN}`}
				/>
				<meta
					property={'og.site_name'}
					content={process.env.NEXT_PUBLIC_DOMAIN}
				/>
				<meta property={'org:image'} content={images.logo.src} />

				<meta name={'twitter:title'} content={'회원가입 - TIL'} />
				<meta
					name={'twitter:description'}
					content={
						'TIL(Today I Logged)에 회원가입하고 다른 개발자들과 학습한 내용을 공유해보세요!'
					}
				/>
				<meta name={'twitter:image'} content={images.logo.src} />
			</Head>
			<UnAuthenticatedLayout>
				<Flex
					w={'100%'}
					maxW={'400px'}
					p={4}
					direction={'column'}
					gap={6}
					as={'form'}
					onSubmit={handleSubmit(
						useCallback((data) => {
							createUser(data, {
								onSuccess: () => {
									login(
										{
											email: data.email,
											social_id: data.social_id,
											login_type: data.login_type,
										},
										{
											onSuccess: () => {
												router.push(toUrl(PagePaths.HOME))
											},
										},
									)
								},
							})
						}, []),
					)}
				>
					<Flex direction={'column'} align={'center'} gap={4}>
						<Logo />
						<Text fontSize={'3xl'} fontWeight={'bold'}>
							회원가입
						</Text>
					</Flex>
					<Flex direction={'column'} gap={2}>
						<InputLabel>닉네임</InputLabel>
						<Input
							type={'text'}
							placeholder={'닉네임'}
							variant={'flushed'}
							{...register('nickname', {
								required: '닉네임이 입력되지 않았습니다,.',
								pattern: {
									value: /^[a-zA-Z가-힣]+$/,
									message: '닉네임은 영어 또는 한글만 사용할 수 있습니다.',
								},
							})}
						/>
						<ErrorMessage
							name={'nickname'}
							errors={errors}
							render={({ message }) => (
								<InputErrorMessage>{message}</InputErrorMessage>
							)}
						/>
					</Flex>
					<Flex direction={'column'}>
						<Button
							fontWeight={'bold'}
							fontSize={'lg'}
							type={'submit'}
							colorPalette={'green'}
						>
							회원가입
						</Button>
					</Flex>
				</Flex>
			</UnAuthenticatedLayout>
		</>
	)
}

export default SocialSignUp
