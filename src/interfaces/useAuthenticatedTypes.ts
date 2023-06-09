export type Userdata = {
    userName: string | undefined;
    firstName: string | undefined;
    profilePicture: string | undefined;
};

export type HooksReturnType = {
    userData: Userdata;
    isLoggedIn: boolean;
    isLoading: boolean;
};
