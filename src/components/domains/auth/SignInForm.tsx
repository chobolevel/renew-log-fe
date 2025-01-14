import { Flex, Input, Text } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { LoginRequest, useLogin } from '@/apis'
import { useCallback } from 'react'
import { Button, InputErrorMessage, InputLabel, Logo } from '@/components'
import { ErrorMessage } from '@hookform/error-message'
import { PagePaths, toUrl } from '@/constants'
import Link from 'next/link'
import { useRouter } from 'next/router'

const SignInForm = () => {
	const router = useRouter()
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<LoginRequest>({
		defaultValues: {
			login_type: 'GENERAL',
		},
	})

	const { mutate: login } = useLogin()
	return (
		<Flex
			w={'400px'}
			p={4}
			direction={'column'}
			gap={6}
			as={'form'}
			onSubmit={handleSubmit(
				useCallback((data) => {
					login(data, {
						onSuccess: () => {
							router.push(toUrl(PagePaths.HOME))
						},
					})
				}, []),
			)}
		>
			<Flex direction={'column'} align={'center'} gap={4}>
				<Logo size={'lg'} />
				<Text fontSize={'3xl'} fontWeight={'bold'}>
					로그인
				</Text>
			</Flex>
			<Flex direction={'column'} gap={2}>
				<InputLabel>아이디(이메일)</InputLabel>
				<Input
					type={'text'}
					placeholder={'아이디(이메일)'}
					variant={'flushed'}
					{...register('email', {
						required: '아이디(이메일)이 입력되지 않았습니다.',
					})}
				/>
				<ErrorMessage
					name={'email'}
					errors={errors}
					render={({ message }) => (
						<InputErrorMessage>{message}</InputErrorMessage>
					)}
				/>
			</Flex>
			<Flex direction={'column'} gap={2}>
				<InputLabel>비밀번호</InputLabel>
				<Input
					type={'password'}
					placeholder={'비밀번호'}
					variant={'flushed'}
					{...register('password', {
						required: '비밀번호가 입력되지 않았습니다.',
					})}
				/>
				<ErrorMessage
					name={'password'}
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
					로그인
				</Button>
			</Flex>
			<Flex align={'center'} justify={'space-between'}>
				<Link href={PagePaths.HOME}>아이디 찾기</Link>
				<Link href={PagePaths.SIGN_UP}>회원가입</Link>
			</Flex>
		</Flex>
	)
}

export default SignInForm
