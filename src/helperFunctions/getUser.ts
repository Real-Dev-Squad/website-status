import { useGetUserQuery } from '@/app/services/userApi';

const userData = async () => {
    const { data } = useGetUserQuery();
    try {
        return data;
    } catch (error) {
        console.error(error);
        return error;
    }
};

export default userData;
