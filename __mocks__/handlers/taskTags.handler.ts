import taskItem from '@/interfaces/taskItem.type';
import { rest } from 'msw';
const URL = process.env.NEXT_PUBLIC_BASE_URL;

const taskTagsData: taskItem[] = [
    {
        tagId: '1',
        tagName: 'Tag 1',
        levelValue: 1,
        itemId: '1',
        itemType: 'TASK',
        levelId: '1',
        levelName: 'easy',
        tagType: 'SKILL',
    },
    {
        tagId: '2',
        tagName: 'Tag 2',
        levelValue: 2,
        itemId: '1',
        itemType: 'TASK',
        levelId: '1',
        levelName: 'easy',
        tagType: 'SKILL',
    },
];

const taskTagsHandler = [
    rest.get(`${URL}/items/filter`, (_, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                message: 'Tags returned successfully',
                tags: taskTagsData,
            })
        );
    }),
    rest.delete(`${URL}/items`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                message: 'Tags returned successfully',
                tags: taskTagsData[1],
            })
        );
    }),
];

export default taskTagsHandler;
