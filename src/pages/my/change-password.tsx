import { images, PagePaths, toUrl } from '@/constants'
import Head from 'next/head'
import React, { useCallback } from 'react'
import { InputErrorMessage, ResponsiveLayout, toaster } from '@/components'
import { Button, Flex, Input, Separator, Text } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { ChangeUserPasswordRequest, useChangeUserPassword } from '@/apis'
import { useRouter } from 'next/router'
import { ErrorMessage } from '@hookform/error-message'

const ChangePasswordPage = () => {
	const router = useRouter()
	const {
		handleSubmit,
		register,
		watch,
		formState: { errors },
	} = useForm<ChangeUserPasswordRequest>()

	const { mutate: changePassword } = useChangeUserPassword()
	return (
		<>
			<Head>
				<title>{'나의 비밀번호 관리 - TIL'}</title>
				<meta name={'title'} content={'나의 비밀번호 관리 -TIL'} />
				<meta
					name={'description'}
					content={'TIL(Today I Logged)에서 로거님의 비밀번호를 관리해보세요.'}
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="robots" content="index, follow" />

				<meta property={'og:type'} content={'article'} />
				<meta property={'og.locale'} content={'ko_KR'} />
				<meta property={'og:title'} content={'나의 비밀번호 관리 - TIL'} />
				<meta
					property={'og:description'}
					content={'TIL(Today I Logged)에서 로거님의 비밀번호를 관리해보세요.'}
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

				<meta name={'twitter:title'} content={'나의 비밀번호 관리 - TIL'} />
				<meta
					name={'twitter:description'}
					content={'TIL(Today I Logged)에서 로거님의 비밀번호를 관리해보세요.'}
				/>
				<meta name={'twitter:image'} content={images.logo.src} />
			</Head>
			<ResponsiveLayout>
				<Flex
					direction={'column'}
					gap={6}
					as={'form'}
					onSubmit={handleSubmit(
						useCallback((data) => {
							changePassword(data, {
								onSuccess: () => {
									toaster.create({
										type: 'success',
										title: '비밀번호 변경 완료',
									})
									router.push(toUrl(PagePaths.MY_PROFILE))
								},
							})
						}, []),
					)}
				>
					<Flex direction={'column'} gap={2}>
						<Text fontWeight={'bold'}>현재 비밀번호</Text>
						<Input
							type={'password'}
							placeholder={'현재 비밀번호'}
							{...register('cur_password', {
								required: '현재 비밀번호를 입력되지 않았습니다.',
							})}
						/>
						<ErrorMessage
							name={'cur_password'}
							errors={errors}
							render={({ message }) => (
								<InputErrorMessage>{message}</InputErrorMessage>
							)}
						/>{' '}
					</Flex>
					<Separator />
					<Flex direction={'column'} gap={2}>
						<Text fontWeight={'bold'}>변경할 비밀번호</Text>
						<Input
							type={'password'}
							placeholder={'변경할 비밀번호'}
							{...register('new_password', {
								required: '변경할 비밀번호가 입력되지 않았습니다.',
								pattern: {
									value:
										/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
									message:
										'비밀번호는 영문 + 숫자 + 특수문자 조합으로 8자리 이상이어야 합니다.',
								},
							})}
						/>
						<ErrorMessage
							name={'new_password'}
							errors={errors}
							render={({ message }) => (
								<InputErrorMessage>{message}</InputErrorMessage>
							)}
						/>
					</Flex>
					<Flex direction={'column'} gap={2}>
						<Text fontWeight={'bold'}>변경할 비밀번호 확인</Text>
						<Input
							type={'password'}
							placeholder={'변경할 비밀번호 확인'}
							{...register('check_new_password', {
								required: '확인 비밀번호가 입력되지 않았습니다.',
								validate: (val: string) => {
									if (watch('new_password') != val) {
										return '비밀번호가 일치하지 않습니다.'
									}
								},
							})}
						/>
						<ErrorMessage
							name={'check_new_password'}
							errors={errors}
							render={({ message }) => (
								<InputErrorMessage>{message}</InputErrorMessage>
							)}
						/>
					</Flex>
					<Flex align={'center'} justify={'end'} gap={2}>
						<Button colorPalette={'green'} fontWeight={'bold'} type={'submit'}>
							변경
						</Button>
						<Button
							colorPalette={'green'}
							variant={'outline'}
							fontWeight={'bold'}
							onClick={() => {
								router.push(toUrl(PagePaths.MY_PROFILE))
							}}
						>
							취소
						</Button>
					</Flex>
				</Flex>
			</ResponsiveLayout>
		</>
	)
}

export default ChangePasswordPage
