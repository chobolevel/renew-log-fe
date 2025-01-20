import { images } from '@/constants'
import Head from 'next/head'
import { CenterTagList, EmptyState, ResponsiveLayout } from '@/components'
import { Flex, Text } from '@chakra-ui/react'
import { useGetTags } from '@/apis'
import { FaHashtag } from 'react-icons/fa'
import React from 'react'

const TagListPage = () => {
	const { data: tags } = useGetTags()
	return (
		<>
			<Head>
				<title>{'태그 - TIL'}</title>
				<meta name={'title'} content={'태그 -TIL'} />
				<meta
					name={'description'}
					content={'TIL(Today I Logged)에서 다양한 태그를 확인해보세요!'}
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="robots" content="index, follow" />

				<meta property={'og:type'} content={'article'} />
				<meta property={'og.locale'} content={'ko_KR'} />
				<meta property={'og:title'} content={'태그 - TIL'} />
				<meta
					property={'og:description'}
					content={'TIL(Today I Logged)에서 다양한 태그를 확인해보세요!'}
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

				<meta name={'twitter:title'} content={'태그 - TIL'} />
				<meta
					name={'twitter:description'}
					content={'TIL(Today I Logged)에서 다양한 태그를 확인해보세요!'}
				/>
				<meta name={'twitter:image'} content={images.logo.src} />
			</Head>
			<ResponsiveLayout>
				<Flex direction={'column'} gap={6}>
					<Text fontSize={'lg'} fontWeight={'bold'}>
						모든 태그
					</Text>
					{tags ? (
						<CenterTagList tags={tags.data} />
					) : (
						<EmptyState
							icon={<FaHashtag size={20} />}
							title={'태그를 찾을 수 없습니다.'}
						/>
					)}
				</Flex>
			</ResponsiveLayout>
		</>
	)
}

export default TagListPage
