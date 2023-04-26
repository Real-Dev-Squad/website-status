import {
    useEffect,
    useState,
    createContext,
    FC,
    Children,
    ReactNode,
} from 'react';
import fetch from '@/helperFunctions/fetch';
import { toast, ToastTypes } from '@/helperFunctions/toast';
import { USER_SELF } from '@/components/constants/url';
import { useGetUserDataQuery } from '@/app/services/usersApi';

const { ERROR } = ToastTypes;
export const isUserAuthorizedContext = createContext<boolean>(false);

interface Props {
    children: ReactNode;
}

const IsUserAuthorizedContext: FC<Props> = ({ children }) => {
  const [isUserAuthorized, setIsUserAuthorized] = useState<boolean>(false);
  const {data,isError, error,isSuccess} = useGetUserDataQuery({});
  
  useEffect(() => {
    if(isSuccess){
        const userRoles = {
          adminUser: data?.roles?.admin,
          superUser: data?.roles?.super_user,
        };
        const { adminUser, superUser } = userRoles;
        setIsUserAuthorized(!!adminUser || !!superUser);
      }else if(isError){
        console.error(error);
        setIsUserAuthorized(false);
      }

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
