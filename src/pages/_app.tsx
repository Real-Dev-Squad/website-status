import { FC, useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/index.scss';
import classNames from '@/styles/toast.module.scss';
import { setCookie, checkThemeHistory } from '@/helperFunctions/themeHistoryCheck';

if (process.env.NEXT_PUBLIC_API_MOCKING === 'ON') {
  require('../../__mocks__/mswInit');
}

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  const [mainDarkMode, setMainDarkMode] = useState(false)

  useEffect(() => {
    setMainDarkMode(checkThemeHistory(document.cookie) === "dark");
  }, []);

  const themeSetter = () => {
    document.cookie = setCookie(!mainDarkMode);
    setMainDarkMode(!mainDarkMode);
  }
  
  return (
    <>
      <div className={mainDarkMode ? classNames.darkTheme : classNames.lightTheme} style={{height: "100%"}}>
        <ToastContainer toastClassName={classNames.toast} />
        <Component {...pageProps} themeSetter={themeSetter} theme={mainDarkMode}/>
      </div>
    </>
  )
};

export default MyApp;
