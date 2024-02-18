import { FC } from 'react';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/index.scss';
import '@/styles/calendar.scss';

if (process.env.NEXT_PUBLIC_API_MOCKING === 'ON') {
    require('../../__mocks__/index');
}

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
    const rdxStore = store();
    return (
        <Provider store={rdxStore}>
            <ToastContainer />
            <Component {...pageProps} />
        </Provider>
    );
};

export default MyApp;
