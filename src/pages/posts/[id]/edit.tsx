import { images } from '@/constants'
import Head from 'next/head'
import React from 'react'
import { EditPostForm, EmptyState, ResponsiveLayout } from '@/components'
import { useRouter } from 'next/router'
import { useGetPost } from '@/apis'
import { MdArticle } from 'react-icons/md'

const EditPost = () => {
	const router = useRouter()

	const { data: post } = useGetPost(
		{
			id: Number(router.query.id ?? 0),
		},
		!!router.query.id,
	)
	return (
		<>
			<Head>
				<title>{'로그 수정 - TIL'}</title>
				<meta name={'title'} content={'로그 수정 -TIL'} />
				<meta
					name={'description'}
					content={'TIL(Today I Logged)에서 작성한 로그를 수정해보세요!'}
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="robots" content="index, follow" />

				<meta property={'og:type'} content={'article'} />
				<meta property={'og.locale'} content={'ko_KR'} />
				<meta property={'og:title'} content={'로그 수정 - TIL'} />
				<meta
					property={'og:description'}
					content={'TIL(Today I Logged)에서 작성한 로그를 수정해보세요!'}
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

				<meta name={'twitter:title'} content={'로그 수정 - TIL'} />
				<meta
					name={'twitter:description'}
					content={'TIL(Today I Logged)에서 작성한 로그를 수정해보세요!'}
				/>
				<meta name={'twitter:image'} content={images.logo.src} />
			</Head>
			<ResponsiveLayout>
				{post ? (
					<EditPostForm post={post} />
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

export default EditPost
