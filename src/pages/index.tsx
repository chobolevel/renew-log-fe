import Head from 'next/head'
import { images } from '@/constants'
import { ResponsiveLayout } from '@/components'
import { Text } from '@chakra-ui/react'

const Home = () => {
	return (
		<>
			<Head>
				<title>{'홈 - 초로'}</title>
				<meta name={'title'} content={'홈 -초로'} />
				<meta name={'description'} content={'초보 개발자의 로그(초로)'} />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="robots" content="index, follow" />

				<meta property={'og:type'} content={'article'} />
				<meta property={'og.locale'} content={'ko_KR'} />
				<meta property={'og:title'} content={'홈 - 초로'} />
				<meta
					property={'og:description'}
					content={'초보 개발자의 로그(초로)'}
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

				<meta name={'twitter:title'} content={'홈 - 초로'} />
				<meta
					name={'twitter:description'}
					content={'초보 개발자의 로그(초로)'}
				/>
				<meta name={'twitter:image'} content={images.logo.src} />
			</Head>
			<ResponsiveLayout>
				<Text h={'100vh'}>123</Text>
			</ResponsiveLayout>
		</>
	)
}

export default Home
