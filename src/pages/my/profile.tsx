import { images } from '@/constants'
import Head from 'next/head'
import React from 'react'
import { EmptyState, MyProfile, ResponsiveLayout } from '@/components'
import { useGetMe } from '@/apis'
import { RiAccountCircleFill } from 'react-icons/ri'

const MyProfilePage = () => {
	const { data: me } = useGetMe()
	return (
		<>
			<Head>
				<title>{'나의 프로필 - TIL'}</title>
				<meta name={'title'} content={'나의 프로필 -TIL'} />
				<meta
					name={'description'}
					content={'TIL(Today I Logged)에서 내 프로필을 확인하고 수정해보세요.'}
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="robots" content="index, follow" />

				<meta property={'og:type'} content={'article'} />
				<meta property={'og.locale'} content={'ko_KR'} />
				<meta property={'og:title'} content={'나의 프로필 - TIL'} />
				<meta
					property={'og:description'}
					content={'TIL(Today I Logged)에서 내 프로필을 확인하고 수정해보세요.'}
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

				<meta name={'twitter:title'} content={'나의 프로필 - TIL'} />
				<meta
					name={'twitter:description'}
					content={'TIL(Today I Logged)에서 내 프로필을 확인하고 수정해보세요.'}
				/>
				<meta name={'twitter:image'} content={images.logo.src} />
			</Head>
			<ResponsiveLayout>
				{me ? (
					<MyProfile user={me} />
				) : (
					<EmptyState
						icon={<RiAccountCircleFill size={20} />}
						title={'내 정보를 찾을 수 없습니다.'}
					/>
				)}
			</ResponsiveLayout>
		</>
	)
}

export default MyProfilePage
