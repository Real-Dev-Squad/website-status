import { useEffect, useState } from 'react';
import { DEFAULT_AVATAR, SIGNUP_LINK } from '@/constants/url';
import { useGetUserQuery } from '@/app/services/userApi';
import { useSelector } from 'react-redux';

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
    const user = useSelector((state: any) => state.user);
    const data = user.userData;

    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                if (data?.incompleteUserDetails) {
                    window.open(`${SIGNUP_LINK}`, '_blank', 'noopener');
                }
                setUserData({
                    userName: data?.username,
                    firstName: data?.first_name,
                    profilePicture: data?.picture?.url,
                });
                setIsLoggedIn(true);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);
    return { userData, isLoggedIn, isLoading };
};

export default useAuthenticated;
