import { rest } from 'msw';
const URL = process.env.NEXT_PUBLIC_BASE_URL;

const taskDetailsHandler = [
    rest.get(`${URL}/tasks/:taskId/details`, (_, res, ctx) => {
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
                    links: ['null'],
                    dependsOn: ['null'],
                    percentCompleted: 0,
                    type: 'feature',
                    priority:'high',
                    featureUrl: 'https://www.sampleUrl.com',
                    startedOn:1617062400, 
                    completionAward: {
                        neelam: 0,
                        dinero: 110,
                    },
                },
            })
        );
    }),
];
const failedTaskDependencyDetails = rest.get(
    `${URL}/tasks/:taskId`,
    (_, res, ctx) => {
        return res(ctx.status(404), ctx.json(
            {
                'statusCode': 404,
                'error': 'Not Found',
                'message': 'Task not found'
            }
        )
        );
    }
);

export { taskDetailsHandler, failedTaskDependencyDetails };
