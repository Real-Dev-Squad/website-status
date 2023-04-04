import { useEffect, useState } from "react";
import {
	USER_SELF,
	DEFAULT_AVATAR,
	SIGNUP_LINK,
} from "@/components/constants/url";
import fetch from "@/helperFunctions/fetch";

type Userdata = {
    userName: string;
    firstName: string;
    profilePicture: string;
};

type HooksReturnType = {
    userData: Userdata;
    isLoggedIn: boolean;
    isLoading: boolean;
};

const useAuthenticated = (): HooksReturnType => {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const [userData, setUserData] = useState<Userdata>({
		userName: "",
		firstName: "",
		profilePicture: DEFAULT_AVATAR,
	});

	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				const { requestPromise } = fetch({ url: USER_SELF });
				const { data } = await requestPromise;
				if (data.incompleteUserDetails) {
					window.open(`${SIGNUP_LINK}`, "_blank", "noopener");
				}
				setUserData({
					userName: data.username,
					firstName: data.first_name,
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
