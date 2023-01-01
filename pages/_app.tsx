import '@/vendors/normalize.css';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

function AppRenderer({ Component: PageComponent, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Retone HERO</title>
			</Head>
			<PageComponent {...pageProps} />
		</>
	);
}

export default AppRenderer;
