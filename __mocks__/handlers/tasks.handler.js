import { tasks } from '../db/tasks';
import { rest } from 'msw';
const URL = process.env.NEXT_PUBLIC_BASE_URL;

const taskHandlers = [
    rest.get(`${URL}/tasks`, (_, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                message: 'Tasks returned successfully!',
                tasks: tasks,
            })
        );
    }),
    rest.patch(`${URL}/tasks/:taskId`, (_, res, ctx) => {
        return res(ctx.delay(5000), ctx.status(204));
    }),
    rest.post(`${URL}/tasks`, async (req, res, ctx) => {
        const body = await req.json();
        return res(
            ctx.status(200),
            ctx.json({
                message: 'Task created successfully!',
                task: body,
            })
        );
    }),
];

export const failedGetTasksResponse = {
    error: 'Internal Server Error',
    message: 'An internal server error occurred',
    statusCode: 500,
};

export const failedGetTasks = rest.get(`${URL}/tasks`, (_, res, ctx) => {
    return res(ctx.status(500), ctx.json(failedGetTasksResponse));
});

export const failedAddNewTaskResponse = {
    statusCode: 400,
    error: 'Bad Request',
    message: '"title" is required',
};
export const failedAddNewTaskHandler = rest.post(
    `${URL}/tasks`,
    (_, res, ctx) => {
        return res(ctx.status(400), ctx.json(failedAddNewTaskResponse));
    }
);

export const failedUpdateTaskResponse = {
    statusCode: 404,
    error: 'Not Found',
    message: 'Task not found',
};
export const failedUpdateTaskHandler = rest.patch(
    `${URL}/tasks/:taskId`,
    (_, res, ctx) => {
        return res(ctx.status(404), ctx.json(failedUpdateTaskResponse));
    }
);

// no tasks found
export const noTasksFoundResponse = {
	message: 'No tasks found',
	tasks: []
};
export const noTasksFoundHandler = rest.get(
	`${URL}/tasks`,
	(_, res, ctx) => {
		return res(ctx.status(200), ctx.json(noTasksFoundResponse)
		);
	}
);


export default taskHandlers;
