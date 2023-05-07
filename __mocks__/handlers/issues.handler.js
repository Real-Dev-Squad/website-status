import {
    issuesResponseSearchedWithQuery,
    issuesResponseSearchedWithoutQuery,
} from '../db/issues';
import { rest } from 'msw';
const URL = process.env.NEXT_PUBLIC_BASE_URL;

const issuesHandler = [
    rest.get(`${URL}/issues`, (req, res, ctx) => {
        const queryString = req.url.searchParams.get('q');
        if (queryString) {
            return res(
                ctx.status(200),
                ctx.json({
                    message: 'Issues returned successfully!',
                    issues: issuesResponseSearchedWithQuery,
                })
            );
        }
        return res(
            ctx.status(200),
            ctx.json({
                message: 'Issues returned successfully!',
                issues: issuesResponseSearchedWithoutQuery,
            })
        );
    }),
];

export const issuesNoDataFoundHandler = rest.get(
    `${URL}/issues`,
    (_, res, ctx) => {
        return res(
            ctx.json({
                message: 'Issues returned successfully!',
                issues: [],
            })
        );
    }
);

export default issuesHandler;
