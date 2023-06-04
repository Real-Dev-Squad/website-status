import { createSlice } from '@reduxjs/toolkit';

type initialState = {
    userData: object | null | undefined;
    adminUser: boolean | null | undefined;
    superUser: boolean | null | undefined;
};

const initialState = {
    userData: null,
    adminUser: null,
    superUser: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            (state.userData = action.payload),
                (state.adminUser = action.payload?.roles.admin);
            state.superUser = action.payload?.roles.superUser;
        },
    },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
