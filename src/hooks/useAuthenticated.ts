import { useEffect, useState } from 'react';
import { USER_SELF, DEFAULT_AVATAR, SIGNUP_LINK } from '@/components/constants/url';

type Userdata = {
  userName: string;
  firstName: string;
  profilePicture: string;
};

type HooksReturnType = {
  userData: Userdata;
  isLoggedIn: boolean;
  isLoading: boolean;
};

const useAuthenticated = (): HooksReturnType => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userData, setUserData] = useState<Userdata>({
    userName: '',
    firstName: '',
    profilePicture: DEFAULT_AVATAR
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await fetch(USER_SELF, { credentials: 'include' })
        .then((response) => {
          if (!response.ok) {
            setIsLoggedIn(false);
            throw new Error(`${response.status} (${response.statusText})`);
          }
          return response.json();
        })
        .then((responseJson) => {
          if (responseJson.incompleteUserDetails) {
            window.open(
              `${SIGNUP_LINK}`,
              '_blank',
              'noopener'
            );
          }
          setIsLoggedIn(true);
          setUserData({
            userName: responseJson.username,
            firstName: responseJson.first_name,
            profilePicture: responseJson?.picture?.url
          });
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => setIsLoading(false));
    };
    fetchData();
  }, []);
  return { userData, isLoggedIn, isLoading };
};

export default useAuthenticated;
