import { useEffect, useState, createContext, FC, ReactNode } from 'react';
import { useGetUserQuery } from '@/app/services/userApi';
export const isUserAuthorizedContext = createContext<boolean>(false);

interface Props {
    children: ReactNode;
}

const IsUserAuthorizedContext: FC<Props> = ({ children }) => {
    const [isUserAuthorized, setIsUserAuthorized] = useState<boolean>(false);
    const { data: userData } = useGetUserQuery();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const userRoles = {
                    adminUser: userData?.roles?.admin,
                    superUser: userData?.roles?.super_user,
                };
                const { adminUser, superUser } = userRoles;
                setIsUserAuthorized(!!adminUser || !!superUser);
            } catch (err) {
                console.error(err);
                setIsUserAuthorized(false);
            }
        };
        fetchData();

        return () => {
            setIsUserAuthorized(false);
        };
    }, []);
    return (
        <isUserAuthorizedContext.Provider value={isUserAuthorized}>
            {children}
        </isUserAuthorizedContext.Provider>
    );
};

export default IsUserAuthorizedContext;
