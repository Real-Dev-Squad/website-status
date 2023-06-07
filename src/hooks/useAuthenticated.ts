import { useEffect, useState } from 'react';
import { DEFAULT_AVATAR, SIGNUP_LINK } from '@/constants/url';
import useUserData from './useUserData';

type Userdata = {
    userName: string | undefined;
    firstName: string | undefined;
    profilePicture: string | undefined;
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
        profilePicture: DEFAULT_AVATAR,
    });

    const { data, isUserAuthorized, isSuccess } = useUserData();

    const finalUserName = data?.username !== undefined ? data?.username : '';
    const finalFirstName =
        data?.first_name !== undefined ? data?.first_name : '';
    const finalProfile =
        data?.picture?.url !== undefined ? data?.picture?.url : '';

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);

            if (data?.incompleteUserDetails) {
                window.open(`${SIGNUP_LINK}`, '_blank', 'noopener');
            }
            setUserData({
                userName: finalUserName,
                firstName: finalFirstName,
                profilePicture: finalProfile,
            });

            if (isSuccess) setIsLoggedIn(true);

            setIsLoading(false);
        };
        fetchData();
    }, []);
    return { userData, isLoggedIn, isLoading };
};

export default useAuthenticated;
