import useUserData from '@/hooks/useUserData';

const userData = async () => {
    const { data } = useUserData();
    try {
        return data;
    } catch (error) {
        console.error(error);
        return error;
    }
};

export default userData;
