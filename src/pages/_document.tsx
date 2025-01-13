import { Head, Html, Main, NextScript } from 'next/document'

const Document = () => {
	return (
		<Html lang="ko" suppressHydrationWarning>
			<Head>
				<link rel="icon" href="/images/favicon.ico" />
				<meta name={'robots'} content={'index, follow'} />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}

export default Document
