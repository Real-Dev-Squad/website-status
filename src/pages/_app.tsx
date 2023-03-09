import { FC } from 'react';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import AppWrapperContext from '@/context';
import IsUserAuthorizedContext from '@/context/isUserAuthorized';
import { Provider } from 'react-redux';
import { setupStore } from '@/app/store';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/index.scss';

if (process.env.NEXT_PUBLIC_API_MOCKING === 'ON') {
  require('../../__mocks__/mswInit');
}

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Provider store={setupStore()}>
        <AppWrapperContext>
          <IsUserAuthorizedContext>
            <ToastContainer />
            <Component {...pageProps} />
          </IsUserAuthorizedContext>
        </AppWrapperContext>
    </Provider>
  );
}


export default MyApp;
