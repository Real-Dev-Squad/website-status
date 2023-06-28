import { rest } from 'msw';
const URL = process.env.NEXT_PUBLIC_BASE_URL;

const standupHandler = [
    rest.post(`${URL}/progresses`, async (req, _, ctx) => {
        const body = await req.json();
        console.log(body);
        ctx.status(200);
        ctx.json({
            message: 'User Progress document created successfully.',
            data: body,
        });
    }),
];

export const failedToSendStandup = {
    statusCode: 500,
    error: 'Internal Server Error',
    message: 'success',
};

export const failedPostStandup = rest.post(
    `${URL}/progresses`,
    (_, res, ctx) => {
        return res.once(ctx.status(500), ctx.json(failedToSendStandup));
    }
);

export default standupHandler;
