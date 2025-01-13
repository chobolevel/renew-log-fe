import { AppProps } from 'next/app'
import { ChakraProvider, ReactQueryProvider } from '@/components'
import { Toaster } from '@/components/ui/toaster'

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<ReactQueryProvider>
			<ChakraProvider>
				<Component {...pageProps} />
				<Toaster />
			</ChakraProvider>
		</ReactQueryProvider>
	)
}

export default App
