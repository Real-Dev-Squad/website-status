import { FC, useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import { toast, ToastTypes } from '@/helperFunctions/toast';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/index.scss';
import AppWrapperContext from '@/context';
import fetch from '@/helperFunctions/fetch';

if (process.env.NEXT_PUBLIC_API_MOCKING === 'ON') {
  require('../../__mocks__/mswInit');
}

const SELF_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/users/self`;
const { ERROR } = ToastTypes;

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  const [isUserAuthorized, setIsUserAuthorized] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('checking for superuser from index pages');
        const { requestPromise } = fetch({ url: SELF_URL });
        const { data } = await requestPromise;
        const userRoles = {
          adminUser: data.roles?.admin,
          superUser: data.roles?.super_user,
        };
        const { adminUser, superUser } = userRoles;
        setIsUserAuthorized(!!adminUser || !!superUser);
      } catch (err: any) {
        toast(ERROR, err.message);
      }
    };
    fetchData();

    return (() => {
      setIsUserAuthorized(false);
    });
  }, []);
  return (
    <AppWrapperContext>
      <ToastContainer />
      <Component {...pageProps} isUserAuthorized={isUserAuthorized} />
    </AppWrapperContext>
  );
}


export default MyApp;
