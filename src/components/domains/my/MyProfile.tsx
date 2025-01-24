import { User } from '@/apis'
import { Editable, Flex, IconButton, Text } from '@chakra-ui/react'
import { Avatar } from '@/components'
import React, { useMemo, useState } from 'react'
import moment from 'moment'
import { LuCheck, LuX } from 'react-icons/lu'

interface MyProfileProps {
	user: User
}

const MyProfile = ({ user }: MyProfileProps) => {
	const [nickname, setNickname] = useState<string>(user.nickname)

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
							onValueCommit={(e) => {
								console.log(e)
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
				</Flex>
			</Flex>
		</Flex>
	)
}

export default MyProfile
