import taskItem from '@/interfaces/taskItem.type';
import { rest } from 'msw';
const URL = process.env.NEXT_PUBLIC_BASE_URL;

const tagsData =[
    {
        id: 'S02fv4NPNDucOBHsMoji',
        reason: 'adding skills to users',
        name: 'TEST2-TAG',
        createdBy: 'XAF7rSUvk4p0d098qWYS',
        type: 'SKILL',
        date: {
            _seconds: 1670515455,
            _nanoseconds: 617000000,
        },
    },
    {
        id: 'UNr4wG3uKxCsD1GORUzi',
        createdBy: 'XAF7rSUvk4p0d098qWYS',
        reason: 'adding skills to users',
        name: 'TEST-SKILL',
        date: {
            _seconds: 1670105813,
            _nanoseconds: 422000000,
        },
        type: 'SKILL',
    },
    {
        id: 'fzCcp4slrqIENsks4Tai',
        date: {
            _seconds: 1677194119,
            _nanoseconds: 484000000,
        },
        name: 'DEBUGGING',
        type: 'SKILL',
        createdBy: 'XAF7rSUvk4p0d098qWYS',
        reason: 'adding skills to users',
    },
    {
        id: 'nf7GTgWI1bT1C0VUQp9O',
        name: 'TEST-DEC-8',
        createdBy: 'XAF7rSUvk4p0d098qWYS',
        type: 'SKILL',
        reason: 'adding skills to users',
        date: {
            _seconds: 1670518002,
            _nanoseconds: 287000000,
        },
    },
];
const tagsHandler = [
    rest.get(`${URL}/tags`, (_, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                message: 'Tags returned successfully',
                tags: tagsData,
            })
        );
    }),
];

export default tagsHandler;
