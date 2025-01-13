import {
	ChakraProvider as _ChakraProvider,
	extendTheme,
} from '@chakra-ui/react'
import React from 'react'
import { fonts } from '@/constants'

interface ChakraProviderProps {
	children: React.ReactNode
}

const theme = extendTheme({
	colors: {
		purple: '#5046e5',
	},
	fonts: {
		heading: fonts.oneMobileRegular.style.fontFamily,
		body: fonts.oneMobileRegular.style.fontFamily,
	},
})

const ChakraProvider = ({ children }: ChakraProviderProps) => {
	return <_ChakraProvider theme={theme}>{children}</_ChakraProvider>
}

export default ChakraProvider
