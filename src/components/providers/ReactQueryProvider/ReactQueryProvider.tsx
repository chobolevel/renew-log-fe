import {
	MutationCache,
	QueryCache,
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { ApiErrorCode, ApiErrorResponse } from '@/apis'
import React from 'react'
import { createStandaloneToast } from '@chakra-ui/react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

interface ReactQueryProviderProps {
	children: React.ReactNode
}

const { toast } = createStandaloneToast()

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 0,
			refetchOnWindowFocus: false,
		},
	},
	queryCache: new QueryCache({
		onError: (error, query) => {
			if (!isAxiosError<ApiErrorResponse>(error) || query.meta?.ignoreError)
				return
			toast({
				status: 'error',
				title: '조회 중 에러가 발생하였습니다.',
			})
		},
	}),
	mutationCache: new MutationCache({
		onError: (error) => {
			if (!isAxiosError<ApiErrorResponse>(error)) return
			if (error.response?.data.error_code === ApiErrorCode.UNAUTHORIZED) {
				toast({
					status: 'error',
					title: '비로그인 회원',
					description: '로그인한 회원만 접근 가능한 기능입니다.',
				})
			} else {
				toast({
					status: 'error',
					title: error.response?.data.error_message ?? error.message,
				})
			}
		},
	}),
})

const ReactQueryProvider = ({ children }: ReactQueryProviderProps) => {
	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}

export default ReactQueryProvider