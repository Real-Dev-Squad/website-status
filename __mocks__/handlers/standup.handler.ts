import { rest } from 'msw';
import { failedToSendStandup } from '../../__mocks__/db/standup';

const URL = process.env.NEXT_PUBLIC_BASE_URL;

const standupHandler = [
    rest.post(`${URL}/progresses`, async (req, res, ctx) => {
        const body = await req.json();
        return res(
            ctx.status(200),
            ctx.json({
                message: 'User Progress document created successfully.',
                data: body,
            })
        );
    }),
    rest.get(`${URL}/progresses`, async (req, res, ctx) => {
        console.log('get API is being callled');
        return res(ctx.status(200), ctx.json({ data: [] }));
    }),
];

export const failedPostStandup = rest.post(
    `${URL}/progresses`,
    (_, res, ctx) => {
        return res.once(ctx.status(500), ctx.json(failedToSendStandup));
    }
);

export default standupHandler;
