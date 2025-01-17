import { images } from '@/constants'
import Head from 'next/head'
import { Flex } from '@chakra-ui/react'
import { QuillEditor, ResponsiveLayout } from '@/components'
import 'react-quill-new/dist/quill.snow.css'

const WritePost = () => {
	return (
		<>
			<Head>
				<title>{'로그 작성 - TIL'}</title>
				<meta name={'title'} content={'로그 작성 -TIL'} />
				<meta
					name={'description'}
					content={
						'TIL(Today I Logged)에서 로그를 작성하고 다른 개발자들과 학습한 내용을 공유해보세요!'
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
						'TIL(Today I Logged)에서 로그를 작성하고 다른 개발자들과 학습한 내용을 공유해보세요!'
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
						'TIL(Today I Logged)에서 로그를 작성하고 다른 개발자들과 학습한 내용을 공유해보세요!'
					}
				/>
				<meta name={'twitter:image'} content={images.logo.src} />
			</Head>
			<ResponsiveLayout>
				<Flex direction={'column'} gap={6}>
					<QuillEditor />
				</Flex>
			</ResponsiveLayout>
		</>
	)
}

export default WritePost
