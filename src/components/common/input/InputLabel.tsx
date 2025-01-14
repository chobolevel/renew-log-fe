import { Text } from '@chakra-ui/react'
import React from 'react'

interface InputLabelProps {
	children: React.ReactNode
}

const InputLabel = ({ children }: InputLabelProps) => {
	return (
		<Text fontSize={'sm'} fontWeight={'bold'}>
			{children}
		</Text>
	)
}

export default InputLabel
