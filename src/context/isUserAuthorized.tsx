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

const { ERROR } = ToastTypes;
export const isUserAuthorizedContext = createContext<boolean>(false);

interface Props {
    children: ReactNode;
}

const IsUserAuthorizedContext: FC<Props> = ({ children }) => {
  const [isUserAuthorized, setIsUserAuthorized] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { requestPromise } = fetch({ url: USER_SELF });
        const { data } = await requestPromise;
        const userRoles = {
          adminUser: data.roles?.admin,
          superUser: data.roles?.super_user,
        };
        const { adminUser, superUser } = userRoles;
        setIsUserAuthorized(!!adminUser || !!superUser);
      } catch (err: unknown) {
        console.error(err);
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
