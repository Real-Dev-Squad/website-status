import { rest } from 'msw';
const URL = process.env.NEXT_PUBLIC_BASE_URL;

const taskHandlers = [
	rest.get(`${URL}/tasks`, (_, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.json({
				message: 'Tasks returned successfully!',
				tasks: [
					{
						id: '06HLDLh6qA80U50FVHwM',
						title: 'blocked',
						type: 'task',
						status: 'blocked',
						assignee: 'deipayan',
						percentCompleted: 20,
					},
					{
						id: '1eJhUW19D556AhPEpdPr',
						percentCompleted: 0,
						completionAward: {
							dinero: 1500,
							neelam: 1,
						},
						lossRate: {
							dinero: 100,
						},
						isNoteworthy: true,
						status: 'assigned',
						title: 'test 7 for dnd',
						startedOn: 1618531200,
						type: 'feature',
						endsOn: 1618790400,
					},
					{
						id: '2Um4nbrjHM2pCXtYSmti',
						percentCompleted: 0,
						assignee: 'deipayan',
						type: 'task',
						title: 'active task',
						status: 'active',
					},
					{
						id: '3v9cI9VZP4r6vhkExPJc',
						percentCompleted: 0,
						completionAward: {
							dinero: 2500,
							neelam: 0,
						},
						assignee: false,
						startedOn: 1640131200,
						lossRate: {
							neelam: 0,
							dinero: 100,
						},
						isNoteworthy: true,
						type: 'feature',
						endsOn: 1640217600,
						status: 'active',
						title: 'test for dashboard',
					},
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
						type: 'string',
						startedOn: 1618790410,
						featureUrl: 'string',
						completionAward: {
							neelam: 0,
							dinero: 110,
						},
					},
					{
						id: '7aGM2AbwDobdYcDNiHdB',
						assignee: 'ankur',
						startedOn: 1618531200,
						type: 'feature',
						endsOn: 1618790400,
						lossRate: {
							dinero: 100,
						},
						status: 'assigned',
						title: 'test 3 for dnd',
						percentCompleted: 0,
						completionAward: {
							neelam: 1,
							dinero: 1500,
						},
						isNoteworthy: true,
					},
					{
						id: 'AUe4uoWkU1Qi0UT7Hlwc',
						links: ['null'],
						dependsOn: ['null'],
						percentCompleted: 0,
						purpose: 'string',
						status: 'assigned',
						type: 'string',
						title: 'test 1 for drag and drop',
						isNoteworthy: true,
						featureUrl: 'string',
						assignee: 'ankur',
						lossRate: {
							dinero: 0,
							neelam: 0,
						},
						completionAward: {
							dinero: 110,
							neelam: 0,
						},
					},
					{
						id: 'CICLGKwS5VP8ju6q8lm6',
						endsOn: 1618790400,
						startedOn: 1618790400,
						purpose: 'string',
						percentCompleted: 0,
						status: 'unassigned',
						lossRate: {
							dinero: 0,
							neelam: 0,
						},
						links: ['null'],
						type: 'string',
						assignee: false,
						featureUrl: 'string',
						completionAward: {
							dinero: 0,
							neelam: 0,
						},
						dependsOn: ['null'],
						isNoteworthy: true,
						title: 'test 1 for drag and drop',
					},
					{
						id: 'DDGHg8KRgqi9AKn8ONZK',
						startedOn: 1618790400,
						dependsOn: ['null'],
						completionAward: {
							neelam: 0,
							dinero: 110,
						},
						lossRate: {
							dinero: 0,
							neelam: 0,
						},
						title: 'test 1 for drag and drop',
						featureUrl: 'string',
						assignee: false,
						purpose: 'string',
						percentCompleted: 0,
						type: 'string',
						isNoteworthy: true,
						endsOn: 1618790400,
						links: ['null'],
						status: 'unassigned',
					},
					{
						id: 'E1T2spZWfvlou4jH7vWZ',
						assignee: false,
						percentCompleted: 0,
						dependsOn: ['null'],
						startedOn: 1618790400,
						title: 'test 1 for drag and drop',
						completionAward: {
							dinero: 0,
							neelam: 0,
						},
						status: 'unassigned',
						featureUrl: 'string',
						links: ['null'],
						isNoteworthy: true,
						lossRate: {
							neelam: 0,
							dinero: 0,
						},
						type: 'string',
						purpose: 'string',
						endsOn: 1618790400,
					},
					{
						id: 'IBKIUhErmS8E5Ej8UC5W',
						lossRate: {
							gold: 1,
							bronze: 0,
							silver: 0,
						},
						links: ['testLink delete latedr'],
						featureUrl:
							'https://github.com/Real-Dev-Squad/website-status/issues/98',
						assignee: 'aman-saxena',
						status: 'pending',
						participants: [],
						percentCompleted: 0,
						completionAward: {
							silver: 0,
							bronze: 0,
							gold: 2,
						},
						dependsOn: [' Zf96HaV16AdYsVIORpSm'],
						type: 'Dev',
						endsOn: '1618787349',
						purpose: 'Button to show on whom this task is blah blah',
						title: 'Show task dependencies on button click',
						isNoteworthy: false,
						startedOn: '1618203600',
					},
					{
						id: 'PUpZjwvBv7pXccEXxMbZ',
						status: 'assigned',
						startedOn: 1618790400,
						links: ['null'],
						assignee: 'nikhil',
						type: 'string',
						percentCompleted: 0,
						featureUrl: 'string',
						dependsOn: ['null'],
						lossRate: {
							neelam: 0,
							dinero: 0,
						},
						purpose: 'string',
						endsOn: 1618790400,
						title: 'test 1 for drag and drop',
						completionAward: {
							dinero: 110,
							neelam: 0,
						},
						isNoteworthy: true,
					},
					{
						id: 'TYGpmAWKsVX6Ri1Pe2Rj',
						percentCompleted: 20,
						status: 'pending',
						title: 'testing',
					},
					{
						id: 'V8bDOxcd8ZNaqs3jvFmv',
						percentCompleted: 0,
						status: 'assigned',
						startedOn: 1618531200,
						title: 'test 7 for dnd',
						type: 'feature',
						isNoteworthy: true,
						assignee: false,
						lossRate: {
							dinero: 100,
						},
						completionAward: {
							neelam: 1,
							dinero: 1500,
						},
						endsOn: 1618790400,
					},
					{
						id: 'WreC8jAYrjwsiNjXHX6Y',
						endsOn: 1618790400,
						assignee: 'ankur',
						title: 'test 4 for dnd',
						percentCompleted: 0,
						participants: [false],
						lossRate: {
							dinero: 100,
						},
						completionAward: {
							dinero: 1500,
							neelam: 1,
						},
						isNoteworthy: true,
						startedOn: 1618531200,
						status: 'assigned',
						type: 'feature',
					},
					{
						id: 'YMy457yScZBkDKqAunJW',
						endsOn: 1618790400,
						percentCompleted: 0,
						links: ['null'],
						type: 'string',
						assignee: false,
						completionAward: {
							dinero: 110,
							neelam: 0,
						},
						featureUrl: 'string',
						lossRate: {
							neelam: 0,
							dinero: 0,
						},
						isNoteworthy: true,
						title: 'test 1 for drag and drop',
						status: 'unassigned',
						startedOn: 1618790400,
						dependsOn: ['null'],
						purpose: 'string',
					},
					{
						id: 'YoFZ6Em8JsfXYHHOkXZm',
						endsOn: 1618790400,
						lossRate: {
							dinero: 100,
						},
						completionAward: {
							dinero: 1500,
							neelam: 1,
						},
						status: 'unassigned',
						startedOn: 1618531200,
						assignee: false,
						title: 'test 1 for dnd',
						percentCompleted: 0,
						type: 'feature',
						isNoteworthy: true,
					},
					{
						id: 'Zf96HaV16AdYsVIORpSm',
						links: ['testLink delete latedr'],
						startedOn: '1618203600',
						endsOn: '1618787349',
						dependsOn: ['IBKIUhErmS8E5Ej8UC5W'],
						percentCompleted: 0,
						lossRate: {
							gold: 1,
							bronze: 0,
							silver: 0,
						},
						title: 'Keep active accordion open by default',
						isNoteworthy: false,
						purpose: 'Its needed',
						assignee: 'aman-saxena',
						completionAward: {
							silver: 0,
							gold: 2,
							bronze: 0,
						},
						type: 'Dev',
						participants: [],
						status: 'pending',
						featureUrl:
							'https://github.com/Real-Dev-Squad/website-status/issues/94',
					},
					{
						id: 'b2D07SwQaRICrRfhI0EA',
						status: 'active',
						lossRate: {
							dinero: 100,
							neelam: 0,
						},
						completionAward: {
							neelam: 0,
							dinero: 1000,
						},
						assignee: false,
						percentCompleted: 0,
						isNoteworthy: false,
						type: 'feature',
						title: 'sd',
						startedOn: 1640131200,
						endsOn: 1640217600,
					},
					{
						id: 'dB4MIKH2ieb4jS8ENud4',
						startedOn: 1618531200,
						endsOn: 1618790400,
						lossRate: {
							dinero: 100,
						},
						percentCompleted: 0,
						completionAward: {
							dinero: 1500,
							neelam: 1,
						},
						title: 'test 7 for dnd',
						isNoteworthy: true,
						type: 'feature',
						status: 'assigned',
					},
					{
						id: 'f1ippJNjpXRvq4Hew4GP',
						startedOn: 1618790400,
						title: 'test 1 for drag and drop',
						dependsOn: ['null'],
						isNoteworthy: true,
						percentCompleted: 0,
						completionAward: {
							dinero: 0,
							neelam: 0,
						},
						endsOn: 1618790400,
						lossRate: {
							neelam: 0,
							dinero: 0,
						},
						assignee: false,
						purpose: 'string',
						featureUrl: 'string',
						type: 'string',
						links: ['null'],
						status: 'unassigned',
					},
					{
						id: 'gImRKjivttEivGW0HJDc',
						assignee: false,
						percentCompleted: 0,
						isNoteworthy: true,
						type: 'feature',
						lossRate: {
							dinero: 100,
						},
						startedOn: 1618531200,
						endsOn: 1618790400,
						completionAward: {
							dinero: 1500,
							neelam: 1,
						},
						status: 'unassigned',
						title: 'test 6 for dnd',
					},
					{
						id: 'gNrlDtxrkiIfsMXuQASb',
						type: 'task',
						percentCompleted: 20,
						status: 'pending',
						assignee: 'deipayan',
						title: 'pending',
					},
					{
						id: 'gzFUHuUIXIGnxmjZKjJI',
						status: 'unassigned',
						title: 'test 2 for dnd',
						completionAward: {
							dinero: 1500,
							neelam: 1,
						},
						endsOn: 1618790400,
						isNoteworthy: true,
						startedOn: 1618531200,
						assignee: false,
						lossRate: {
							dinero: 100,
						},
						type: 'feature',
						percentCompleted: 0,
					},
					{
						id: 'iFVd4PDBJ3P3ZOLek0eh',
						title: 'test 1 for drag and drop',
						startedOn: 1618790400,
						isNoteworthy: true,
						status: 'unassigned',
						endsOn: 1618790400,
						dependsOn: ['null'],
						lossRate: {
							neelam: 0,
							dinero: 0,
						},
						completionAward: {
							dinero: 0,
							neelam: 0,
						},
						percentCompleted: 0,
						featureUrl: 'string',
						assignee: false,
						purpose: 'string',
						type: 'string',
						links: ['null'],
					},
					{
						id: 'lvcEidrRn6OlxkyODdwQ',
						type: 'feature',
						title: 'test 7 for dnd',
						status: 'assigned',
						completionAward: {
							dinero: 1500,
							neelam: 1,
						},
						endsOn: 1618790400,
						isNoteworthy: true,
						percentCompleted: 0,
						lossRate: {
							dinero: 100,
						},
						startedOn: 1618531200,
					},
					{
						id: 'pTmTzojeOTeCHNy5B54h',
						startedOn: 1618531200,
						assignee: false,
						lossRate: {
							dinero: 100,
						},
						completionAward: {
							dinero: 1500,
							neelam: 1,
						},
						type: 'feature',
						status: 'unassigned',
						percentCompleted: 0,
						endsOn: 1618790400,
						isNoteworthy: true,
						title: 'test 5 for dnd',
					},
					{
						id: 'ra51cLGfGhjjz0b5bZVi',
						percentCompleted: '0',
						endsOn: '1618704000',
						startedOn: '1618272000',
						purpose: 'test purpose',
						status: 'pending',
						createdBy: 'nikhil',
						assignee: 'nikhil',
						links: ['realdevsquad.com'],
						isNoteworthy: false,
						completionAward: {
							neelam: '0',
							dinero: '100',
						},
						type: 'feature',
						featureUrl:
							'https://github.com/Real-Dev-Squad/website-status/issues/59',
						lossRate: {
							dinero: '0',
							neelam: '0',
						},
						title: 'test task',
					},
					{
						id: 'sVPON1C3uPZT0cHoJuV3',
						assignee: 'nikhil',
						title: 'Testing inline editing',
						status: 'blocked',
						participants: [false],
						endsOn: 1634149800,
						startedOn: 1633026600,
						percentCompleted: 50,
					},
					{
						id: 'sru8AeJN8rZnW3q5G9iy',
						dependsOn: ['null'],
						type: 'string',
						title: 'test 1 for drag and drop',
						participants: [],
						featureUrl: 'string',
						status: 'unassigned',
						completionAward: {
							neelam: 0,
							dinero: 0,
						},
						isNoteworthy: true,
						percentCompleted: 0,
						startedOn: 1618790400,
						purpose: 'string',
						lossRate: {
							dinero: 0,
							neelam: 0,
						},
						endsOn: 1618790400,
						links: ['null'],
						assignee: false,
					},
					{
						id: 'uAROzkH0JJ9ptFoZROi8',
						assignee: false,
						status: 'unassigned',
						completionAward: {
							neelam: 1,
							dinero: 1500,
						},
						percentCompleted: 0,
						title: 'test 6 for dnd',
						endsOn: 1618790400,
						isNoteworthy: true,
						type: 'feature',
						startedOn: 1618531200,
						lossRate: {
							dinero: 100,
						},
					},
					{
						id: 'vQOGGT841qw50HrlxWd0',
						isNoteworthy: true,
						startedOn: 1618790400,
						purpose: 'string',
						dependsOn: ['null'],
						title: 'test 1 for drag and drop',
						type: 'string',
						assignee: 'ankur',
						completionAward: {
							dinero: 110,
							neelam: 0,
						},
						percentCompleted: 0,
						endsOn: 1618790400,
						lossRate: {
							dinero: 0,
							neelam: 0,
						},
						status: 'assigned',
						featureUrl: 'string',
						links: ['null'],
					},
					{
						id: 'zBqHuzw5fMokmXw0Fquz',
						status: 'active',
						title: 'Test for devashish',
						percentCompleted: 75,
						assignee: 'devashish',
					},
				],
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
				task: body
			})
		);
	})
];

export const failedGetTasksResponse = {
	error: 'Internal Server Error',
	message: 'An internal server error occurred',
	statusCode: 500
};

export const failedGetTasks = rest.get(
	`${URL}/tasks`,
	(_, res, ctx) => {
		return res(ctx.status(500), ctx.json(failedGetTasksResponse));
	}
);

export const failedAddNewTaskResponse = {
	'statusCode': 400,
	'error': 'Bad Request',
	'message': '"title" is required'
};
export const failedAddNewTaskHandler = rest.post(
	`${URL}/tasks`,
	(_, res, ctx) => {
		return res(ctx.status(400), ctx.json(failedAddNewTaskResponse)
		);
	}
);

export const failedUpdateTaskResponse = {
	statusCode: 404,
	error: 'Not Found',
	message: 'Task not found'
};
export const failedUpdateTaskHandler = rest.patch(
	`${URL}/tasks/:taskId`,
	(_, res, ctx) => {
		return res(ctx.status(404), ctx.json(failedUpdateTaskResponse)
		);
	}
);

export default taskHandlers;
