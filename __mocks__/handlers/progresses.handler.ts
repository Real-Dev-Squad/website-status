import { rest } from 'msw';
import { mockGetTaskProgress } from '../db/progresses';
const URL = process.env.NEXT_PUBLIC_BASE_URL;

export const progressHandler = [
    rest.get(
        `${URL}/progresses?taskId=OxYqJgf6Tyl90uci1mzs`,
        (req, res, ctx) => {
            const devFlag = req.url.searchParams.get('dev');

            const progressData = {
                ...mockGetTaskProgress,
                data: mockGetTaskProgress.data.map((progress) =>
                    devFlag === 'true'
                        ? { ...progress }
                        : { ...progress, userData: undefined }
                ),
            };

            return res(ctx.status(200), ctx.json(progressData));
        }
    ),
];
