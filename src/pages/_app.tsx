import { FC } from 'react';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/index.scss';

const MyApp: FC<AppProps> = ({ Component, pageProps }) => (
  <>
    <ToastContainer />
    <Component {...pageProps} />
  </>
);

export default MyApp;
