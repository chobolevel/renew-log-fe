import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { Api, User } from '@/apis'
import { ApiV1Paths, images, toUrl } from '@/constants'
import Head from 'next/head'
import { EmptyState, ResponsiveLayout, UserProfile } from '@/components'
import { Nullable } from '@zag-js/types'
import { FaUserAlt } from 'react-icons/fa'

const LoggerDetail = ({
	user,
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
				{user ? (
					<UserProfile user={user} />
				) : (
					<EmptyState icon={<FaUserAlt />} title={'로거를 찾을 수 없습니다.'} />
				)}
			</ResponsiveLayout>
		</>
	)
}

export default LoggerDetail

export const getServerSideProps: GetServerSideProps<{
	user: Nullable<User>
	metadata: { title: string; description: string }
}> = async (context) => {
	const metadata = {
		title: '로거 - TIL',
		description:
			'TIL(Today I Logged)에서 다른 개발자들의 학습한 내용을 확인해보세요!',
	}
	const id = Number(context.query.id)
	if (!id) {
		return {
			props: {
				user: null,
				metadata,
			},
		}
	}
	const user = await Api.get<User>(toUrl(ApiV1Paths.USERS, { id }))
	if (user) {
		return {
			props: {
				user,
				metadata: {
					title: `${user.nickname} - 초로`,
					description: `${user.nickname}로거의 학습 내용을 확인해보세요!`,
				},
			},
		}
	} else {
		return {
			props: {
				user: null,
				metadata,
			},
		}
	}
}
