import { ApiV1Paths, images, toUrl } from '@/constants'
import Head from 'next/head'
import { EmptyState, Prose, ResponsiveLayout, Tag } from '@/components'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { Nullable } from '@zag-js/types'
import { Api, Post } from '@/apis'
import { Flex, Separator, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { MdArticle } from 'react-icons/md'
import React from 'react'

const PostDetailPage = ({
	post,
	metadata,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const router = useRouter()
	return (
		<>
			<Head>
				<title>{metadata.title}</title>
				<meta name={'title'} content={metadata.title} />
				<meta name={'description'} content={metadata.description} />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="robots" content="index, follow" />

				<meta property={'og:type'} content={'article'} />
				<meta property={'og.locale'} content={'ko_KR'} />
				<meta property={'og:title'} content={metadata.title} />
				<meta property={'og:description'} content={metadata.description} />
				<meta
					property={'og:url'}
					content={`https://${process.env.NEXT_PUBLIC_DOMAIN}`}
				/>
				<meta
					property={'og.site_name'}
					content={process.env.NEXT_PUBLIC_DOMAIN}
				/>
				<meta property={'org:image'} content={images.logo.src} />

				<meta name={'twitter:title'} content={metadata.title} />
				<meta name={'twitter:description'} content={metadata.description} />
				<meta name={'twitter:image'} content={images.logo.src} />
			</Head>
			<ResponsiveLayout>
				{post ? (
					<Flex direction={'column'} gap={6}>
						<Flex align={'center'} gap={2} flexWrap={'wrap'}>
							{post.tags.map((tag, idx) => {
								return (
									<Tag
										key={idx}
										colorPalette={'green'}
										size={'lg'}
										fontWeight={'bold'}
										variant={'outline'}
										px={4}
										py={2}
										borderRadius={20}
									>
										{tag.name}
									</Tag>
								)
							})}
						</Flex>
						<Flex direction={'column'} gap={2}>
							<Text fontSize={'lg'} fontWeight={'bold'}>
								{post.title}
							</Text>
							<Text>{post.sub_title}</Text>
						</Flex>
						<Separator />
						<Prose dangerouslySetInnerHTML={{ __html: post.content }} />
					</Flex>
				) : (
					<EmptyState
						icon={<MdArticle size={20} />}
						title={'로그를 찾을 수 없습니다.'}
					></EmptyState>
				)}
			</ResponsiveLayout>
		</>
	)
}

export default PostDetailPage

export const getServerSideProps: GetServerSideProps<{
	post: Nullable<Post>
	metadata: { title: string; description: string }
}> = async (context) => {
	const metadata = {
		title: '로그 - TIL',
		description:
			'TIL(Today I Logged)에서 다른 개발자가 작성한 로그를 찾을 수 없습니다.',
	}
	const id = Number(context.query.id)
	if (!id) {
		return {
			props: {
				post: null,
				metadata,
			},
		}
	}
	const post = await Api.get<Post>(toUrl(ApiV1Paths.POSTS, { id }))
	if (post) {
		return {
			props: {
				post,
				metadata: {
					title: `${post.title} - 초로`,
					description: post.sub_title,
				},
			},
		}
	} else {
		return {
			props: {
				post: null,
				metadata,
			},
		}
	}
}
