import {
	ChakraProvider as _ChakraProvider,
	createSystem,
	defaultConfig,
} from '@chakra-ui/react'
import React from 'react'
import { fonts } from '@/constants'

interface ChakraProviderProps {
	children: React.ReactNode
}

const system = createSystem(defaultConfig, {
	theme: {
		tokens: {
			colors: {
				purple: { value: '#5046e5' },
			},
			fonts: {
				heading: { value: fonts.oneMobileRegular.style.fontFamily },
				body: { value: fonts.oneMobileRegular.style.fontFamily },
			},
		},
	},
})

const ChakraProvider = ({ children }: ChakraProviderProps) => {
	return <_ChakraProvider value={system}>{children}</_ChakraProvider>
}

export default ChakraProvider
