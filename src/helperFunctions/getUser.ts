import { useGetUserQuery } from '@/app/services/userApi';
import { useSelector } from 'react-redux';

const userData = async () => {
    const user = useSelector((state: any) => state.user);
    const data = user.userData;
    try {
        return data;
    } catch (error) {
        console.error(error);
        return error;
    }
};

export default userData;
