import { images, PagePaths, toUrl } from '@/constants'
import Head from 'next/head'
import {
	EmptyState,
	PaginationNextTrigger,
	PaginationPageText,
	PaginationPrevTrigger,
	PaginationRoot,
	PostList,
	ResponsiveLayout,
} from '@/components'
import { useGetPosts } from '@/apis'
import { Flex, Spinner, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { HiPencilAlt } from 'react-icons/hi'
import { MdArticle } from 'react-icons/md'
import { useRouter } from 'next/router'

const LIMIT_COUNT = 6

const PostListPage = () => {
	const router = useRouter()
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
									siblingCount={1}
									onPageChange={(e) => {
										window.scrollTo({ top: 0, behavior: 'smooth' })
										setPage(e.page)
									}}
								>
									<Flex align={'center'} gap={2}>
										<PaginationPrevTrigger />
										<PaginationPageText />
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
								<EmptyState
									icon={<MdArticle size={20} />}
									title={'게시글을 찾을 수 없습니다.'}
								/>
							)}
						</Flex>
					)}
				</Flex>
				<Flex
					p={4}
					position={'fixed'}
					bottom={{ base: 20, lg: 4 }}
					right={{ base: 2, lg: 4 }}
					direction={'column'}
					align={'center'}
					justify={'center'}
					borderRadius={'50%'}
					bgColor={'point'}
					color={'white'}
					cursor={'pointer'}
					onClick={() => {
						router.push(toUrl(PagePaths.WRITE_POST))
					}}
				>
					<HiPencilAlt size={24} />
				</Flex>
			</ResponsiveLayout>
		</>
	)
}

export default PostListPage
