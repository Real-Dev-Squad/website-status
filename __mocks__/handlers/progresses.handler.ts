import { rest } from 'msw';
import { mockGetTaskProgress } from '../db/progresses';

const URL = process.env.NEXT_PUBLIC_BASE_URL;

export const progressHandler = [
    rest.get(`${URL}/progresses?taskId=OxYqJgf6Tyl90uci1mzs`, (_, res, ctx) => {
        return res(ctx.status(200), ctx.json(mockGetTaskProgress));
    }),
];
