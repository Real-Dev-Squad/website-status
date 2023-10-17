import { rest } from 'msw';
const URL = process.env.NEXT_PUBLIC_BASE_URL;

const idleUsersHandler = [
    rest.get(`${URL}/users/search?state=IDLE`, (_, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                message: 'Users found successfully!',
                users: [
                    {
                        id: '26gZFJaXRfd8ghb3p0at',
                        discordId: '759647978121068544',
                        last_name: 'reddy',
                        first_name: 'chandra',
                        updated_at: 1695404825067,
                        username: 'chandra',
                        picture: {
                            url: 'https://res.cloudinary.com/realdevsquad/image/upload/v1689296550/profile/It0BbP0M2Wh8vdWUmMJB/a4j7tbh4g5ccbfepss88.jpg',
                        },
                        roles: {
                            archived: false,
                            in_discord: true,
                            member: false,
                        },
                    },
                    {
                        id: '2iaxlIok0itcIhD0zlsT',
                        discordId: '824562502310035487',
                        last_name: 'joy',
                        first_name: 'khushi',
                        roles: {
                            archived: false,
                        },
                        updated_at: 1695404825078,
                        username: 'khushi',
                    },
                    {
                        id: '3KeWfLRLN98L0QGv0hdL',
                        discordId: '619787720713175040',
                        roles: {
                            archived: false,
                        },
                        last_name: 'b',
                        first_name: 'pronoy',
                        updated_at: 1695404825079,
                        username: 'pronoy',
                    },
                ],
                count: 3,
            })
        );
    }),
];

export const failedIdleUsersHandler = rest.get(
    `${URL}/users/search?state=IDLE`,
    (_, res, ctx) => {
        return res(
            ctx.status(500),
            ctx.json({
                statusCode: 500,
                error: 'Internal Server Error',
                message: 'An internal server error occurred',
            })
        );
    }
);

export default idleUsersHandler;
