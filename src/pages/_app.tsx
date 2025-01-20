import { AppProps } from 'next/app'
import {
	AlertDialog,
	ChakraProvider,
	ConfirmDialog,
	ReactQueryProvider,
} from '@/components'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Flex, Spinner } from '@chakra-ui/react'

const App = ({ Component, pageProps }: AppProps) => {
	const router = useRouter()
	const [loading, setLoading] = useState<boolean>(false)

	useEffect(() => {
		const handleStart = () => {
			setLoading(true)
		}
		const handleComplete = () => {
			setLoading(false)
		}

		router.events.on('routeChangeStart', handleStart)
		router.events.on('routeChangeComplete', handleComplete)
		router.events.on('routeChangeError', handleComplete)
		return () => {
			router.events.off('routeChangeStart', handleStart)
			router.events.off('routeChangeComplete', handleComplete)
			router.events.off('routeChangeError', handleComplete)
		}
	}, [router])
	return (
		<ReactQueryProvider>
			<ChakraProvider>
				{loading ? (
					<Flex w={'100vw'} h={'100vh'} justify={'center'} align={'center'}>
						<Spinner size={'xl'} />
					</Flex>
				) : (
					<Component {...pageProps} />
				)}
				<AlertDialog />
				<ConfirmDialog />
			</ChakraProvider>
		</ReactQueryProvider>
	)
}

export default App
