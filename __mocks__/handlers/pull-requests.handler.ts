import { rest } from 'msw';
import { mockGetOpenPrs, mockGetStalePrs } from '../db/prs';
const URL = process.env.NEXT_PUBLIC_BASE_URL;

export const openPrsHandler = [
    rest.get(`${URL}/pullrequests/open?page=1&size=3`, (_, res, ctx) => {
        return res(ctx.status(200), ctx.json(mockGetOpenPrs));
    }),
];

export const stalePrsHandler = [
    rest.get(`${URL}/pullrequests/stale?page=1&size=3`, (_, res, ctx) => {
        return res(ctx.status(200), ctx.json(mockGetStalePrs));
    }),
];
