import { USERS_URL, USER_SELF } from '@/constants/url';
import usersData from '../db/users';
import { rest } from 'msw';

const userHandler = [
    rest.get(USER_SELF, (_, res, ctx) => {
        return res(ctx.status(200), ctx.json(usersData[0]));
    }),
];

export default userHandler;
