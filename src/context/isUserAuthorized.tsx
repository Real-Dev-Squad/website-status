import { useEffect, useState, createContext, FC, Children, ReactNode } from "react";
import fetch from '@/helperFunctions/fetch';
import { toast, ToastTypes } from '@/helperFunctions/toast';

const SELF_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/users/self`;
const { ERROR } = ToastTypes;
export const isUserAuthorizedContext = createContext<Boolean>(false);

interface Props {
  children: ReactNode;
}

const IsUserAuthorizedContext: FC<Props> = ({ children }) => {
  const [isUserAuthorized, setIsUserAuthorized] = useState<Boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { requestPromise } = fetch({ url: SELF_URL });
        const { data } = await requestPromise;
        const userRoles = {
          adminUser: data.roles?.admin,
          superUser: data.roles?.super_user,
        };
        const { adminUser, superUser } = userRoles;
        setIsUserAuthorized(!!adminUser || !!superUser);
      } catch (err: any) {
        toast(ERROR, err.message);
      }
    };
    fetchData();

    return (() => {
      setIsUserAuthorized(false);
    });
  }, []);
  return(
    <isUserAuthorizedContext.Provider value={isUserAuthorized}>
      {children}
    </isUserAuthorizedContext.Provider>
  )
}

export default IsUserAuthorizedContext