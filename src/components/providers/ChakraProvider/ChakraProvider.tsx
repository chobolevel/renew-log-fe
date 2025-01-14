import {
	ChakraProvider as _ChakraProvider,
	createSystem,
	defaultConfig,
} from '@chakra-ui/react'
import React from 'react'
import { fonts } from '@/constants'
import { Toaster } from '@/components'

interface ChakraProviderProps {
	children: React.ReactNode
}

const system = createSystem(defaultConfig, {
	theme: {
		tokens: {
			colors: {
				point: { value: '#38a16a' },
			},
			fonts: {
				heading: { value: fonts.oneMobileRegular.style.fontFamily },
				body: { value: fonts.oneMobileRegular.style.fontFamily },
			},
		},
	},
})

const ChakraProvider = ({ children }: ChakraProviderProps) => {
	return (
		<_ChakraProvider value={system}>
			{children}
			<Toaster />
		</_ChakraProvider>
	)
}

export default ChakraProvider
