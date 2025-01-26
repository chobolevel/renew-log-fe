'use client'

import {
	DialogBody,
	DialogContent,
	DialogHeader,
	DialogRoot,
	DialogTitle,
} from '@/components'
import { Button, Flex, Text } from '@chakra-ui/react'
import { useConfirm } from '@/store'

const ConfirmDialog = () => {
	const { visible, title, description, close, onConfirm } = useConfirm()
	return (
		<DialogRoot open={visible}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
				</DialogHeader>
				<DialogBody>
					<Flex direction={'column'} gap={6}>
						<Text whiteSpace={'break-spaces'} textAlign={'center'}>
							{description}
						</Text>
						<Flex align={'center'} justify={'end'} gap={2}>
							<Button
								colorPalette={'green'}
								fontWeight={'bold'}
								onClick={() => {
									onConfirm()
									close()
								}}
							>
								확인
							</Button>
							<Button
								colorPalette={'green'}
								fontWeight={'bold'}
								variant={'outline'}
								onClick={() => {
									close()
								}}
							>
								취소
							</Button>
						</Flex>
					</Flex>
				</DialogBody>
			</DialogContent>
		</DialogRoot>
	)
}

export default ConfirmDialog
