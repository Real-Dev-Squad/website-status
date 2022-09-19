import { useEffect, useState } from 'react';
import { USER_SELF } from '@/components/constants/url';

export const DEFAULT_AVATAR = '/Avatar.png';

interface Userdata {
  userName: string;
  firstName: string;
  profilePicture: string;
}

interface HooksReturnType {
  userData: Userdata;
  isLoggedIn: boolean;
  isLoading: boolean;
}

const useAuthenticated = (): HooksReturnType => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<Userdata>({
    userName: '',
    firstName: '',
    profilePicture: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await fetch(USER_SELF, { credentials: 'include' })
        .then((response) => {
          if (!response.ok) {
            setIsLoggedIn(false);
            console.log('response :>> ', response);
            throw new Error(`${response.status} (${response.statusText})`);
          }
          return response.json();
        })
        .then((responseJson) => {
          if (responseJson.incompleteUserDetails) {
            window.open(
              'https://my.realdevsquad.com/signup',
              '_blank',
              'noopener'
            );
          }
          setIsLoggedIn(true);
          setUserData({
            userName: responseJson.username,
            firstName: responseJson.first_name,
            profilePicture: responseJson.picture?.url ?? DEFAULT_AVATAR,
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
