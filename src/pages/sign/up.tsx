import Head from 'next/head'
import { images } from '@/constants'
import { SignUpForm, UnAuthenticatedLayout } from '@/components'

const SignUp = () => {
	return (
		<>
			<Head>
				<title>{'회원가입 - TIL'}</title>
				<meta name={'title'} content={'회원가입 - TIL'} />
				<meta
					name={'description'}
					content={
						'TIL(Today I Learned)에 회원가입하고 다른 개발자들과 학습한 내용을 공유해보세요!'
					}
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="robots" content="index, follow" />

				<meta property={'og:type'} content={'article'} />
				<meta property={'og.locale'} content={'ko_KR'} />
				<meta property={'og:title'} content={'회원가입 - TIL'} />
				<meta
					property={'og:description'}
					content={
						'TIL(Today I Learned)에 회원가입하고 다른 개발자들과 학습한 내용을 공유해보세요!'
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

				<meta name={'twitter:title'} content={'회원가입 - TIL'} />
				<meta
					name={'twitter:description'}
					content={
						'TIL(Today I Learned)에 회원가입하고 다른 개발자들과 학습한 내용을 공유해보세요!'
					}
				/>
				<meta name={'twitter:image'} content={images.logo.src} />
			</Head>
			<UnAuthenticatedLayout>
				<SignUpForm />
			</UnAuthenticatedLayout>
		</>
	)
}

export default SignUp
