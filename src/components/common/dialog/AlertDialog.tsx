'use client'

import { Button, Flex, Text } from '@chakra-ui/react'
import {
	DialogBody,
	DialogContent,
	DialogHeader,
	DialogRoot,
	DialogTitle,
} from '@/components'
import alert from '@/store/alert'

const AlertDialog = () => {
	const { visible, title, description, close } = alert()
	return (
		<DialogRoot open={visible}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
				</DialogHeader>
				<DialogBody>
					<Flex direction={'column'} gap={6}>
						<Text>{description}</Text>
						<Flex justify={'end'}>
							<Button
								colorPalette={'green'}
								fontWeight={'bold'}
								onClick={() => {
									close()
								}}
							>
								확인
							</Button>
						</Flex>
					</Flex>
				</DialogBody>
			</DialogContent>
		</DialogRoot>
	)
}

export default AlertDialog
