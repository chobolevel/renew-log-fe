import { ApiV1Paths, images, toUrl } from '@/constants'
import Head from 'next/head'
import { EmptyState, PostDetail, ResponsiveLayout } from '@/components'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { Nullable } from '@zag-js/types'
import { Api, Post } from '@/apis'
import { MdArticle } from 'react-icons/md'
import React from 'react'

const PostDetailPage = ({
	post,
	metadata,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
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
					<PostDetail post={post} />
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
