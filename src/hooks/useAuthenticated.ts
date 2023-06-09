import { useEffect, useState } from 'react';
import { DEFAULT_AVATAR, SIGNUP_LINK } from '@/constants/url';
import useUserData from './useUserData';
import { Userdata } from '@/interfaces/userDataType';
import { HooksReturnType } from '@/interfaces/HooksReturnsType';

const useAuthenticated = (): HooksReturnType => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [userData, setUserData] = useState<Userdata>({
        userName: '',
        firstName: '',
        profilePicture: DEFAULT_AVATAR,
    });

    const { data, isSuccess } = useUserData();

    const [isLoading, setIsLoading] = useState(false);
    const fetchData = async () => {
        setIsLoading(true);

        if (data?.incompleteUserDetails) {
            window.open(`${SIGNUP_LINK}`, '_blank', 'noopener');
        }
        setUserData({
            userName: data?.username ?? '',
            firstName: data?.first_name ?? '',
            profilePicture: data?.picture?.url ?? DEFAULT_AVATAR,
        });

        if (isSuccess) setIsLoggedIn(true);

        setIsLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);
    return { userData, isLoggedIn, isLoading };
};

export default useAuthenticated;
