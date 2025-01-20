import { images } from '@/constants'
import Head from 'next/head'
import {
	PaginationItems,
	PaginationNextTrigger,
	PaginationPrevTrigger,
	PaginationRoot,
	PostList,
	ResponsiveLayout,
} from '@/components'
import { useGetPosts } from '@/apis'
import { Flex, Spinner, Text } from '@chakra-ui/react'
import { useState } from 'react'

const LIMIT_COUNT = 6

const PostListPage = () => {
	const [page, setPage] = useState<number>(1)

	const { data: posts, isFetching } = useGetPosts({
		skipCount: (page - 1) * LIMIT_COUNT,
		limitCount: LIMIT_COUNT,
		orderTypes: ['CREATED_AT_DESC'],
	})
	return (
		<>
			<Head>
				<title>{'로그 목록 - TIL'}</title>
				<meta name={'title'} content={'로그 목록 -TIL'} />
				<meta
					name={'description'}
					content={'TIL(Today I Logged)에서 로그를 보고 정리해보세요!'}
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="robots" content="index, follow" />

				<meta property={'og:type'} content={'article'} />
				<meta property={'og.locale'} content={'ko_KR'} />
				<meta property={'og:title'} content={'로그 목록 - TIL'} />
				<meta
					property={'og:description'}
					content={'TIL(Today I Logged)에서 로그를 보고 정리해보세요!'}
				/>
				<meta
					property={'og:url'}
					content={`https://${process.env.NEXT_PUBLIC_DOMAIN}`}
				/>
				<meta
					property={'og.site_name'}
					content={process.env.NEXT_PUBLIC_DOMAIN}
				/>
				<meta property={'org:image'} content={images.logo.src} />

				<meta name={'twitter:title'} content={'로그 목록 - TIL'} />
				<meta
					name={'twitter:description'}
					content={'TIL(Today I Logged)에서 로그를 보고 정리해보세요!'}
				/>
				<meta name={'twitter:image'} content={images.logo.src} />
			</Head>
			<ResponsiveLayout>
				<Flex direction={'column'} gap={2}>
					<Text fontSize={'lg'} fontWeight={'bold'}>
						모든 로그
					</Text>
					{posts ? (
						<>
							<PostList posts={posts.data} />
							<Flex align={'center'} justify={'center'}>
								<PaginationRoot
									page={page}
									pageSize={LIMIT_COUNT}
									count={posts.total_count}
									siblingCount={2}
									onPageChange={(e) => {
										setPage(e.page)
									}}
								>
									<Flex align={'center'} gap={2}>
										<PaginationPrevTrigger />
										<PaginationItems />
										<PaginationNextTrigger />
									</Flex>
								</PaginationRoot>
							</Flex>
						</>
					) : (
						<Flex h={300} align={'center'} justify={'center'}>
							{isFetching ? (
								<Spinner size={'lg'} />
							) : (
								<Text>로그를 찾을 수 없습니다</Text>
							)}
						</Flex>
					)}
				</Flex>
			</ResponsiveLayout>
		</>
	)
}

export default PostListPage
