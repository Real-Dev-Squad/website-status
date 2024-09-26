import { DONE, VERIFIED } from '@/constants/task-status';
import task, { Tab } from '@/interfaces/task.type';
import getFilteredTasks from '@/utils/getFilteredTasks';
import { TASK } from '../../../fixture/task';

let VERIFIED_TASKS: task[];
let TASKS_HAVING_TITLE_DONE: task[];
let ALL_TASKS: task[];

beforeAll(() => {
    VERIFIED_TASKS = [
        { ...TASK, status: VERIFIED, id: TASK.id + 2 },
        { ...TASK, status: VERIFIED, id: TASK.id + 3 },
    ];
    TASKS_HAVING_TITLE_DONE = [
        { ...TASK, id: TASK.id + 1, title: DONE },
        { ...TASK, title: DONE, status: DONE, id: TASK.id + 4 },
    ];
    ALL_TASKS = [...TASKS_HAVING_TITLE_DONE, ...VERIFIED_TASKS];
});

describe('Unit | Util | Get Filtered Tasks', () => {
    test('should return an empty list', () => {
        expect(getFilteredTasks([], Tab.ALL, '')).toStrictEqual([]);
    });

    test('should return all tasks', () => {
        expect(getFilteredTasks(ALL_TASKS, Tab.ALL, '')).toStrictEqual(
            ALL_TASKS
        );
    });

    test('should return all tasks with verified status', () => {
        expect(getFilteredTasks(ALL_TASKS, Tab.VERIFIED, '')).toStrictEqual(
            VERIFIED_TASKS
        );
    });

    test('should return all tasks with `verified` status and title `Testing and Determinsitic State`', () => {
        expect(
            getFilteredTasks(
                ALL_TASKS,
                Tab.VERIFIED,
                'Testing and Determinsitic State'
            )
        ).toStrictEqual(VERIFIED_TASKS);
    });

    test('should return all tasks with title `DONE`', () => {
        expect(getFilteredTasks(ALL_TASKS, Tab.ALL, DONE)).toStrictEqual(
            TASKS_HAVING_TITLE_DONE
        );
    });
});
