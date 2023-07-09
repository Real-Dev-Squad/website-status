export type Userdata = {
    userName: string | undefined;
    firstName: string | undefined;
    profilePicture: string | undefined;
};

export type userDetails = {
    userData: Userdata;
    isLoggedIn: boolean;
    isLoading: boolean;
};
