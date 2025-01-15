import {
	MutationCache,
	QueryCache,
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { ApiErrorCode, ApiErrorResponse } from '@/apis'
import React from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { toaster } from '@/components'

interface ReactQueryProviderProps {
	children: React.ReactNode
}

const client = new QueryClient({
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
		},
	}),
	mutationCache: new MutationCache({
		onError: (error) => {
			if (!isAxiosError<ApiErrorResponse>(error)) return
			if (error.response?.data.error_code === ApiErrorCode.ACCESS_DENIED) {
				toaster.create({
					type: 'error',
					title: '비로그인 회원',
					description: '로그인한 회원만 접근 가능한 기능입니다.',
				})
			} else {
				toaster.create({
					type: 'error',
					title: error.response?.data.error_message ?? error.message,
				})
			}
		},
	}),
})

const ReactQueryProvider = ({ children }: ReactQueryProviderProps) => {
	return (
		<QueryClientProvider client={client}>
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}

export default ReactQueryProvider
