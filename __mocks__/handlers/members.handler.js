import { rest } from 'msw';
const URL = process.env.NEXT_PUBLIC_BASE_URL;

const membersHandlers = [
    rest.get(`${URL}/members/idle`, (_, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                message: 'Idle members returned successfully!',
                idleMemberUserNames: [
                    'rohan-rajgupta',
                    'sumit',
                    'swaraj',
                    'rohit',
                    'tanya',
                    'akshay',
                    'shubham',
                    'devashish',
                    'lakshay',
                    'rucha',
                    'swebert',
                    'nikhil',
                    'ishika',
                    'rajakvk',
                    'moses',
                    'prem',
                    'bhavesh',
                    'ankush',
                    'prakash',
                    'deipayan',
                    'mehul',
                    'ashwini',
                    'amanA',
                    'sagar',
                    'shankar',
                    'aman-saxena',
                    'harshith',
                    'pranav',
                    'ankur',
                    'pujarini',
                    'sanyogita',
                    'pavan',
                    'ankita',
                    'shashwat',
                    'vividh',
                    'rahil',
                ],
            })
        );
    }),
];

export const failedIdleMembersHandler = rest.get(
    `${URL}/members/idle`,
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

export default membersHandlers;
