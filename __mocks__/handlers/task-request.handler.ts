import { rest } from 'msw';

const URL = process.env.NEXT_PUBLIC_BASE_URL;

export const taskRequestSuccessHandlers = [
    rest.post(`${URL}/taskRequests`, (_, res, ctx) => {
        return res(ctx.status(201), ctx.json({ message: 'Task request successfully created' }));
    }),
];

export const taskRequestErrorHandler = [
    rest.post(`${URL}/taskRequests`, (_, res, ctx) => {
        return res(
            ctx.status(409),
            ctx.json({ message: 'taskId not provided' })
        );
    }),
];
