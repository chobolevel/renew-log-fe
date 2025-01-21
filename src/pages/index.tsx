import Head from 'next/head'
import { images } from '@/constants'
import {
	CenterTagList,
	EmptyState,
	PostList,
	ResponsiveLayout,
} from '@/components'
import { useGetPosts, useGetTags } from '@/apis'
import { Flex, Spinner, Text } from '@chakra-ui/react'
import { FaHashtag } from 'react-icons/fa'
import React from 'react'
import { MdArticle } from 'react-icons/md'

const Home = () => {
	const { data: tags, isFetching: isTagsFetching } = useGetTags({
		skipCount: 0,
		limitCount: 999,
		orderTypes: ['ORDER_ASC'],
	})
	const { data: posts, isFetching: isPostsFetching } = useGetPosts({
		skipCount: 0,
		limitCount: 12,
		orderTypes: ['CREATED_AT_DESC'],
	})
	return (
		<>
			<Head>
				<title>{'홈 - TIL'}</title>
				<meta name={'title'} content={'홈 -TIL'} />
				<meta
					name={'description'}
					content={
						'TIL(Today I Logged)에서 다른 개발자들과 학습한 내용을 공유해보세요!'
					}
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="robots" content="index, follow" />

				<meta property={'og:type'} content={'article'} />
				<meta property={'og.locale'} content={'ko_KR'} />
				<meta property={'og:title'} content={'홈 - TIL'} />
				<meta
					property={'og:description'}
					content={
						'TIL(Today I Logged)에서 다른 개발자들과 학습한 내용을 공유해보세요!'
					}
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

				<meta name={'twitter:title'} content={'홈 - TIL'} />
				<meta
					name={'twitter:description'}
					content={
						'TIL(Today I Logged)에서 다른 개발자들과 학습한 내용을 공유해보세요!'
					}
				/>
				<meta name={'twitter:image'} content={images.logo.src} />
			</Head>
			<ResponsiveLayout>
				<Flex direction={'column'} gap={2}>
					<Text fontSize={'lg'} fontWeight={'bold'}>
						태그
					</Text>
					{tags ? (
						<CenterTagList tags={tags.data} />
					) : (
						<>
							{isTagsFetching ? (
								<Flex h={300} align={'center'} justify={'center'}>
									<Spinner size={'lg'} />
								</Flex>
							) : (
								<EmptyState
									icon={<FaHashtag size={20} />}
									title={'태그를 찾을 수 없습니다.'}
								/>
							)}
						</>
					)}
				</Flex>
				<Flex direction={'column'} gap={2}>
					<Text fontSize={'lg'} fontWeight={'bold'}>
						최신 게시글
					</Text>
					{posts ? (
						<PostList posts={posts.data} />
					) : (
						<>
							{isPostsFetching ? (
								<Flex h={300} align={'center'} justify={'center'}>
									<Spinner size={'lg'} />
								</Flex>
							) : (
								<EmptyState
									icon={<MdArticle size={20} />}
									title={'게시글을 찾을 수 없습니다.'}
								/>
							)}
						</>
					)}
				</Flex>
			</ResponsiveLayout>
		</>
	)
}

export default Home
