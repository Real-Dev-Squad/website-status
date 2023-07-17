export const userLoggedIn = {
    isLoggedIn: true,
    isLoading: true,
    userData: {
        userName: 'Pratiyush',
        firstName: 'Pratiyush',
        profilePicture: '',
    },
};

export const userNotLoggedIn = {
    isLoggedIn: false,
    isLoading: false,
    userData: {
        userName: 'Pratiyush',
        firstName: 'Pratiyush',
        profilePicture: '',
    },
};

export const notLoading = {
    isLoggedIn: true,
    isLoading: false,
    userData: {
        userName: 'Pratiyush',
        firstName: 'Pratiyush',
        profilePicture: '',
    },
};

export const failedToSendStandup = {
    statusCode: 500,
    error: 'Internal Server Error',
    message: 'success',
};