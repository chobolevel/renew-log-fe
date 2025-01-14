import { Flex, Input, Text } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { CreateUserRequest, useCreateUser } from '@/apis'
import { useCallback } from 'react'
import {
	Button,
	InputErrorMessage,
	InputLabel,
	Logo,
	toaster,
} from '@/components'
import { ErrorMessage } from '@hookform/error-message'
import { useRouter } from 'next/router'
import { PagePaths, toUrl } from '@/constants'

const SignUpForm = () => {
	const router = useRouter()
	const {
		handleSubmit,
		register,
		watch,
		formState: { errors },
	} = useForm<CreateUserRequest>({
		defaultValues: {
			login_type: 'GENERAL',
		},
	})

	const { mutate: createUser } = useCreateUser()
	return (
		<Flex
			w={'400px'}
			p={4}
			direction={'column'}
			gap={6}
			as={'form'}
			onSubmit={handleSubmit(
				useCallback((data) => {
					createUser(data, {
						onSuccess: () => {
							router.push(toUrl(PagePaths.SIGN_IN)).then(() => {
								toaster.create({
									type: 'success',
									title: '회원가입 완료, 로그인하고 초로를 이용해보세요!',
								})
							})
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
				<InputLabel>아이디(이메일)</InputLabel>
				<Input
					type={'text'}
					placeholder={'아이디(이메일)'}
					variant={'flushed'}
					{...register('email', {
						required: '아이디(이메일)이 입력되지 않았습니다.',
						pattern: {
							value: /^[a-zA-Z0-9+-\\_.]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+\$/,
							message: '이메일 형식이 올바르지 않습니다.',
						},
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
						pattern: {
							value:
								/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
							message:
								'비밀번호는 영문 + 숫자 + 특수문자 조합으로 8자리 이상이어야 합니다.',
						},
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
			<Flex direction={'column'} gap={2}>
				<InputLabel>비밀번호 확인</InputLabel>
				<Input
					type={'password'}
					placeholder={'비밀번호 확인'}
					variant={'flushed'}
					{...register('check_password', {
						required: '확인 비밀번호가 입력되지 않았습니다.',
						validate: (val?: string) => {
							if (watch('password') != val) {
								return '비밀번호가 일치하지 않습니다.'
							}
						},
					})}
				/>
				<ErrorMessage
					name={'check_password'}
					errors={errors}
					render={({ message }) => (
						<InputErrorMessage>{message}</InputErrorMessage>
					)}
				/>
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
	)
}

export default SignUpForm
