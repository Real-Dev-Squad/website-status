import { DONE, VERIFIED } from '@/constants/task-status';
import { Tab } from '@/interfaces/task.type';
import getFilteredTasks from '@/utils/getFilteredTasks';

describe('Unit | Util | Get Filtered Tasks', () => {
    const TASK = {
        id: 'firestoreDocumentId123',
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
        assignee: 'shmbajaj',
        startedOn: '1618790400',
        isNoteworthy: true,
        title: 'Testing and Determinsitic State',
        purpose: 'string',
        percentCompleted: 0,
        endsOn: 1618790400,
        status: 'progress',
        featureUrl: 'progress',
        type: 'feature',
        createdBy: 'shmbajaj',
        priority: 'TBD',
    };
    const VERIFIED_TASK = [
        { ...TASK, status: VERIFIED, id: TASK.id + 2 },
        { ...TASK, status: VERIFIED, id: TASK.id + 3 },
    ];

    const TASK_HAVING_TITLE_DONE = [
        { ...TASK, id: TASK.id + 1, title: DONE },
        { ...TASK, title: DONE, status: DONE, id: TASK.id + 4 },
    ];
    const tasks = [...TASK_HAVING_TITLE_DONE, ...VERIFIED_TASK];

    test('should return an empty list', () => {
        expect(getFilteredTasks([], Tab.ALL, [], '')).toStrictEqual([]);
    });

    test('should return all tasks', () => {
        expect(getFilteredTasks(tasks, Tab.ALL, [], '')).toStrictEqual(tasks);
    });

    test('should return all tasks with verified status', () => {
        expect(getFilteredTasks(tasks, Tab.VERIFIED, [], '')).toStrictEqual(
            VERIFIED_TASK
        );
    });

    test('should return all tasks with `verified` status and title `Testing and Determinsitic State`', () => {
        expect(
            getFilteredTasks(
                tasks,
                Tab.VERIFIED,
                [],
                'Testing and Determinsitic State'
            )
        ).toStrictEqual(VERIFIED_TASK);
    });

    test('should return all tasks with title `DONE` and assignee `shmbajaj`', () => {
        expect(
            getFilteredTasks(tasks, Tab.ALL, ['shmbajaj'], DONE)
        ).toStrictEqual(TASK_HAVING_TITLE_DONE);
    });
});
