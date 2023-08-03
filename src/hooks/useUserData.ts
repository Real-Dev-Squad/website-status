import { useGetUserQuery } from '@/app/services/userApi';

const useUserData = () => {
    const { data, isSuccess, isLoading } = useGetUserQuery();
    const adminData = data?.roles.admin;
    const superUserData = data?.roles.super_user;
    const isUserAuthorized = !!adminData || !!superUserData;
    return { data, isUserAuthorized, isSuccess };
};

export default useUserData;
