import { FC } from 'react';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/index.scss';
import AppWrapperContext from '@/context';
import KeyboardWrapperContext from '@/context/keyboard';

if (process.env.NEXT_PUBLIC_API_MOCKING === 'ON') {
  require('../../__mocks__/mswInit');
}

const MyApp: FC<AppProps> = ({ Component, pageProps }) => (
  <AppWrapperContext>
    <KeyboardWrapperContext>
      <ToastContainer />
      <Component {...pageProps} />
    </KeyboardWrapperContext>
  </AppWrapperContext>
);


export default MyApp;
