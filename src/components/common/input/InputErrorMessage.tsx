import { Text } from '@chakra-ui/react'
import React from 'react'

interface InputErrorMessageProps {
	children: React.ReactNode
}

const InputErrorMessage = ({ children }: InputErrorMessageProps) => {
	return (
		<Text fontSize={'xs'} color={'red'}>
			{children}
		</Text>
	)
}

export default InputErrorMessage
