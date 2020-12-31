import { FC } from 'react';
import type { AppProps } from 'next/app';
import '../styles/index.scss';

const MyApp: FC<AppProps> = ({ Component, pageProps }) => <Component {...pageProps} />;

export default MyApp;
