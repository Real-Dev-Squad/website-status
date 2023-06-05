import { useGetUserQuery } from '@/app/services/userApi';

const useUserData = () => {
    const { data } = useGetUserQuery();
    const adminData = data?.roles.admin;
    const superUserData = data?.roles.super_user;
    const isUserAuthorized = !!adminData || !!superUserData;
    console.log('the data is ', data);
    return { data, isUserAuthorized };
};

export default useUserData;
