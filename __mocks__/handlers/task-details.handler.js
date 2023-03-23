import { rest } from 'msw';
const URL = process.env.NEXT_PUBLIC_BASE_URL;

const taskDetailsHandler = [
  rest.get(`${URL}/tasks/0CZnoSLruyIihibT1F6m`, (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: 'Task Details found successfully.',
        taskDetails: [
          {
            url: 'https://realdevsquad.com/learn-site',
            taskID: '0CZnoSLruyIihibT1F6m',
            content: {
              lossRate: {
                dinero: 10,
                neelam: 5,
              },
              links: ['https://realdevsquad.com/learn-site'],
              completionAward: {
                dinero: 110,
                neelam: 10,
              },
              dependsOn: [],
              assignee: 'shreya',
              startedOn: '1618790400',
              isNoteworthy: true,
              title: 'Mobile app SignIn GitHub deeplinking',
              purpose: 'string',
              percentCompleted: 0,
              endsOn: '1618790400',
              status: 'assigned',
              featureUrl: 'string',
              type: 'feature',
              createdBy: 'ankush',
            },
            shouldEdit: false,
            onContentChange: jest.fn(),
          },
        ],
      })
    );
  }),
];

export default taskDetailsHandler;
