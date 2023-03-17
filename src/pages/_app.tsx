import { FC } from 'react';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import AppWrapperContext from '@/context';
import IsUserAuthorizedContext from '@/context/isUserAuthorized';
import { Provider } from 'react-redux';
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import { statusApi } from 'slices/apiSlice';
import { store } from 'store';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/index.scss';

if (process.env.NEXT_PUBLIC_API_MOCKING === 'ON') {
  require('../../__mocks__/index');
}

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <ApiProvider api={statusApi}>
        <AppWrapperContext>
          <IsUserAuthorizedContext>
            <ToastContainer />
            <Component {...pageProps} />
          </IsUserAuthorizedContext>
        </AppWrapperContext>
      </ApiProvider>
    </Provider>
  );
}


export default MyApp;
