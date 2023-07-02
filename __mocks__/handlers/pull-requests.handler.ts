import { rest } from 'msw';
import { mockGetOpenPrs } from '../db/prs';
const URL = process.env.NEXT_PUBLIC_BASE_URL;

const openPrsHandler = [
    rest.get(`${URL}/pullrequests/open?page=1&size=3`, (_, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(mockGetOpenPrs)
        );
    }),
];

export default openPrsHandler;
