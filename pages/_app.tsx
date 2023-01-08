import { Header } from '@/components/Header';
import { Sidebar, Provider as SidebarProvider } from '@/components/Sidebar';
import { Provider as PageCarouselProvider } from '@/libs/page-carousel';
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

			<PageCarouselProvider>
				<SidebarProvider>
					<Header />
					<Sidebar />
				</SidebarProvider>
				<PageComponent {...pageProps} />
			</PageCarouselProvider>
		</>
	);
}

export default AppRenderer;
