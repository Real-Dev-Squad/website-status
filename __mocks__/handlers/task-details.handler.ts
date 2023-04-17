import { rest } from 'msw';
const URL = process.env.NEXT_PUBLIC_BASE_URL;

const taskDetailsHandler = [
  rest.get(`${URL}/tasks/6KhcLU3yr45dzjQIVm0J/details`, (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: 'task returned successfully',
        taskData: [
          {
            id: '6KhcLU3yr45dzjQIVm0J',
            isNoteworthy: true,
            lossRate: {
              dinero: 0,
              neelam: 0,
            },
            purpose: 'string',
            endsOn: 1618790400,
            title: 'test 1 for drag and drop',
            status: 'assigned',
            assignee: 'ankur',
            links: ['null'],
            dependsOn: ['null'],
            percentCompleted: 0,
            type: 'feature',
            startedOn: 1618790410,
            featureUrl: 'string',
            completionAward: {
              neelam: 0,
              dinero: 110,
            },
          },
        ],
      })
    );
  }),
];

export default taskDetailsHandler;
