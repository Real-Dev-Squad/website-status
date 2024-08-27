import { rest } from 'msw';
const URL = process.env.NEXT_PUBLIC_BASE_URL;

const taskDetailsHandler = [
    rest.get(`${URL}/tasks/12345/details`, (_, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                message: 'task returned successfully',
                taskData: {
                    id: '12345',
                    isNoteworthy: true,
                    lossRate: {
                        dinero: 0,
                        neelam: 0,
                    },
                    purpose: 'This is a sample description',
                    endsOn: 1618790410,
                    title: 'test 1 for drag and drop',
                    status: 'COMPLETED',
                    assignee: 'ankur',
                    links: [],
                    dependsOn: [],
                    percentCompleted: 0,
                    type: 'feature',
                    priority: 'high',
                    featureUrl: 'https://www.sampleUrl.com',
                    startedOn: 1617062400,
                    completionAward: {
                        neelam: 0,
                        dinero: 110,
                    },
                    github: {
                        issue: {
                            html_url:
                                'https://github.com/sample-org/sample-repo/issues/000',
                        },
                    },
                },
            })
        );
    }),
    rest.get(`${URL}/tasks/6KhcLU3yr45dzjQIVm0J/details`, (_, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                message: 'task returned successfully',
                taskData: {
                    id: '6KhcLU3yr45dzjQIVm0J',
                    isNoteworthy: true,
                    lossRate: {
                        dinero: 0,
                        neelam: 0,
                    },
                    purpose: 'This is a sample description',
                    endsOn: 1618790410,
                    title: 'test 1 for drag and drop',
                    status: 'assigned',
                    assignee: 'ankur',
                    links: [],
                    dependsOn: [],
                    percentCompleted: 0,
                    type: 'feature',
                    priority: 'high',
                    featureUrl: 'https://www.sampleUrl.com',
                    startedOn: 1617062400,
                    completionAward: {
                        neelam: 0,
                        dinero: 110,
                    },
                    github: {
                        issue: {
                            html_url:
                                'https://github.com/sample-org/sample-repo/issues/000',
                        },
                    },
                },
            })
        );
    }),
    rest.get(`${URL}/tasks/6KhcLU3yr45dzjQIVm0k/details`, (_, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                message: 'task returned successfully',
                taskData: {
                    id: '6KhcLU3yr45dzjQIVm0k',
                    isNoteworthy: true,
                    lossRate: {
                        dinero: 0,
                        neelam: 0,
                    },
                    endsOn: 1618790410,
                    title: 'test 1 for drag and drop',
                    status: 'assigned',
                    assignee: 'ankur',
                    links: [],
                    dependsOn: [],
                    percentCompleted: 0,
                    type: 'feature',
                    priority: 'high',
                    featureUrl: 'https://www.sampleUrl.com',
                    startedOn: 1617062400,
                    completionAward: {
                        neelam: 0,
                        dinero: 110,
                    },
                },
            })
        );
    }),
    rest.patch(`${URL}/tasks/:taskId`, (_, res, ctx) => {
        return res(ctx.status(204));
    }),
];

const failedTaskDependencyDetails = rest.get(
    `${URL}/tasks/:taskId`,
    (_, res, ctx) => {
        return res(
            ctx.status(404),
            ctx.json({
                statusCode: 404,
                error: 'Not Found',
                message: 'Task not found',
            })
        );
    }
);

export { taskDetailsHandler, failedTaskDependencyDetails };
