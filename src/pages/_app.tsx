import { AppProps } from 'next/app'
import { ChakraProvider, ReactQueryProvider } from '@/components'

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<ReactQueryProvider>
			<ChakraProvider>
				<Component {...pageProps} />
			</ChakraProvider>
		</ReactQueryProvider>
	)
}

export default App
