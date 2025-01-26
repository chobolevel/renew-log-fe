import { User, useResignUser, useUpdateMe } from '@/apis'
import { Button, Editable, Flex, IconButton, Text } from '@chakra-ui/react'
import { Avatar, toaster } from '@/components'
import React, { useMemo, useState } from 'react'
import moment from 'moment'
import { LuCheck, LuX } from 'react-icons/lu'
import { useConfirm } from '@/store'
import { useRouter } from 'next/router'
import { PagePaths, toUrl } from '@/constants'

interface MyProfileProps {
	user: User
}

const MyProfile = ({ user }: MyProfileProps) => {
	const router = useRouter()
	const { open } = useConfirm()
	const [nickname, setNickname] = useState<string>(user.nickname)

	const { mutate: updateMe } = useUpdateMe()
	const { mutate: resign } = useResignUser()

	const profileImage = useMemo(() => user?.profile_image, [user])
	const joinedAt = useMemo(
		() => moment(user.created_at).format('YYYY-MM-DD'),
		[user],
	)
	return (
		<Flex direction={'column'} gap={6}>
			<Flex p={4} gap={6}>
				<Avatar size={'2xl'} src={profileImage?.origin_url} />
				<Flex direction={'column'} gap={6}>
					<Flex direction={'column'} gap={2}>
						<Text fontWeight={'bold'}>이메일</Text>
						<Text>{user.email}</Text>
					</Flex>
					<Flex direction={'column'} gap={2}>
						<Text fontWeight={'bold'}>닉네임</Text>
						<Editable.Root
							value={nickname}
							onValueChange={(e) => setNickname(e.value)}
							onValueCommit={() => {
								updateMe(
									{
										nickname,
										update_mask: ['NICKNAME'],
									},
									{
										onSuccess: () => {
											toaster.create({
												type: 'success',
												title: '닉네임 수정 완료',
											})
										},
									},
								)
							}}
						>
							<Editable.Preview />
							<Editable.Input />
							<Editable.Control>
								<Editable.SubmitTrigger asChild>
									<IconButton variant="outline" size="xs">
										<LuCheck />
									</IconButton>
								</Editable.SubmitTrigger>
								<Editable.CancelTrigger asChild>
									<IconButton variant="outline" size="xs">
										<LuX />
									</IconButton>
								</Editable.CancelTrigger>
							</Editable.Control>
						</Editable.Root>
					</Flex>
					<Flex direction={'column'} gap={2}>
						<Text fontWeight={'bold'}>가입일</Text>
						<Text>{joinedAt}</Text>
					</Flex>
				</Flex>
			</Flex>
			<Flex align={'center'} justify={'end'} gap={2}>
				<Button
					colorPalette={'green'}
					fontWeight={'bold'}
					onClick={() => {
						router.push(toUrl(PagePaths.MY_CHANGE_PASSWORD))
					}}
				>
					비밀번호 변경
				</Button>
			</Flex>
			<Flex align={'center'} justify={'center'} h={100}>
				<Button
					size={'sm'}
					variant={'ghost'}
					colorPalette={'red'}
					fontWeight={'bold'}
					onClick={() => {
						open({
							title: '회원 탈퇴',
							description:
								'정말 회원을 탈퇴하시겠습니까?\n로거님의 모든 정보는 삭제됩니다.',
							onConfirm: () => {
								resign({
									id: user.id,
								})
							},
						})
					}}
				>
					회원 탈퇴
				</Button>
			</Flex>
		</Flex>
	)
}

export default MyProfile
