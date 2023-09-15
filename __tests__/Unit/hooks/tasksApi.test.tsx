import { setupServer } from 'msw/node';

import handlers from '../../../__mocks__/handlers';
import { PropsWithChildren } from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import {
    useAddTaskMutation,
    useGetAllTasksQuery,
    useUpdateSelfTaskMutation,
    useUpdateTaskMutation,
    useGetMineTasksQuery,
} from '@/app/services/tasksApi';
import { QueryStatus } from '@reduxjs/toolkit/dist/query';
import {
    failedAddNewTaskHandler,
    failedAddNewTaskResponse,
    failedGetMineTask,
    failedGetTasks,
    failedGetTasksResponse,
    failedUpdateSelfTaskHandler,
    failedUpdateTaskHandler,
    filterTaskHandler,
} from '../../../__mocks__/handlers/tasks.handler';

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

function Wrapper({
    children,
}: PropsWithChildren<Record<string, never>>): JSX.Element {
    return <Provider store={store()}>{children}</Provider>;
}
describe('useGetAllTasksQuery()', () => {
    test('returns all tasks', async () => {
        const { result, waitForNextUpdate } = renderHook(
            () =>
                useGetAllTasksQuery({
                    status: 'all',
                }),
            {
                wrapper: Wrapper,
            }
        );
        const initialResponse = result.current;
        expect(initialResponse.data).toBeUndefined();
        expect(initialResponse.isLoading).toBe(true);

        await act(() => waitForNextUpdate());

        const nextResponse = result.current;
        const tasksData = nextResponse.data;
        expect(tasksData).not.toBeUndefined();
        expect(nextResponse.isLoading).toBe(false);
        expect(nextResponse.isSuccess).toBe(true);
    });

    test('should fail to return all tasks with error', async () => {
        server.use(failedGetTasks);
        const { result, waitForNextUpdate } = renderHook(
            () =>
                useGetAllTasksQuery({
                    status: 'all',
                }),
            {
                wrapper: Wrapper,
            }
        );
        const initialResponse = result.current;
        expect(initialResponse.isLoading).toBe(true);
        expect(initialResponse.data).toBeUndefined();

        await act(() => waitForNextUpdate());

        const nextResponse = result.current;
        expect(nextResponse.isError).toBe(true);
        expect(nextResponse.error).toHaveProperty('status', 500);
        expect(nextResponse.error).toHaveProperty(
            'data',
            failedGetTasksResponse
        );
    });
    test('returns filtered tasks', async () => {
        const { result, waitForNextUpdate } = renderHook(
            () =>
                useGetAllTasksQuery({
                    status: 'blocked',
                }),
            {
                wrapper: Wrapper,
            }
        );
        const initialResponse = result.current;
        expect(initialResponse.data).toBeUndefined();
        expect(initialResponse.isLoading).toBe(true);

        await act(() => waitForNextUpdate());

        const nextResponse = result.current;
        const tasksData = nextResponse.data;
        expect(tasksData).not.toBeUndefined();
        expect(nextResponse.isLoading).toBe(false);
        expect(nextResponse.isSuccess).toBe(true);
    });

    test('returns filtered tasks based on overdue status', async () => {
        const { result, waitForNextUpdate } = renderHook(
            () =>
                useGetAllTasksQuery({
                    status: 'overdue',
                }),
            {
                wrapper: Wrapper,
            }
        );
        const initialResponse = result.current;
        expect(initialResponse.data).toBeUndefined();
        expect(initialResponse.isLoading).toBe(true);

        await act(() => waitForNextUpdate());

        const nextResponse = result.current;
        const tasksData = nextResponse.data;
        console.log(tasksData.tasks);
        expect(tasksData).not.toBeUndefined();
        expect(nextResponse.isLoading).toBe(false);
        expect(nextResponse.isSuccess).toBe(true);
    });

    test('returns next page of tasks', async () => {
        const { result, waitForNextUpdate } = renderHook(
            () =>
                useGetAllTasksQuery({
                    nextTasks:
                        '/tasks?status=AVAILABLE&dev=true&size=5&next=yVC1KqYuUTZdkUFqF9NY',
                }),
            {
                wrapper: Wrapper,
            }
        );
        const initialResponse = result.current;
        expect(initialResponse.data).toBeUndefined();
        expect(initialResponse.isLoading).toBe(true);

        await act(() => waitForNextUpdate());

        const nextResponse = result.current;
        const tasksData = nextResponse.data;
        expect(tasksData).not.toBeUndefined();
        expect(nextResponse.isLoading).toBe(false);
        expect(nextResponse.isSuccess).toBe(true);
    });

    test('returns prev page of tasks', async () => {
        const { result, waitForNextUpdate } = renderHook(
            () =>
                useGetAllTasksQuery({
                    prevTasks:
                        '/tasks?status=AVAILABLE&dev=true&size=5&prev=ARn1G8IxUt1zrfMdTyfn',
                }),
            {
                wrapper: Wrapper,
            }
        );
        const initialResponse = result.current;
        expect(initialResponse.data).toBeUndefined();
        expect(initialResponse.isLoading).toBe(true);

        await act(() => waitForNextUpdate());

        const nextResponse = result.current;
        const tasksData = nextResponse.data;
        expect(tasksData).not.toBeUndefined();
        expect(nextResponse.isLoading).toBe(false);
        expect(nextResponse.isSuccess).toBe(true);
    });

    test('returns tasks filtered by title', async () => {
        server.use(filterTaskHandler);
        const { result, waitForNextUpdate } = renderHook(
            () =>
                useGetAllTasksQuery({
                    title: 'task',
                }),
            {
                wrapper: Wrapper,
            }
        );
        const initialResponse = result.current;
        expect(initialResponse.data).toBeUndefined();
        expect(initialResponse.isLoading).toBe(true);

        await act(() => waitForNextUpdate());

        const nextResponse = result.current;
        const tasksData = nextResponse.data;
        expect(tasksData).not.toBeUndefined();
        expect(nextResponse.isLoading).toBe(false);
        expect(nextResponse.isSuccess).toBe(true);
    });

    test('returns tasks filtered by assignee', async () => {
        server.use(filterTaskHandler);
        const { result, waitForNextUpdate } = renderHook(
            () =>
                useGetAllTasksQuery({
                    assignee: 'sunny-s',
                }),
            { wrapper: Wrapper }
        );
        const initialResponse = result.current;
        expect(initialResponse.data).toBeUndefined();
        expect(initialResponse.isLoading).toBe(true);

        await act(() => waitForNextUpdate());

        const nextResponse = result.current;
        const tasksData = nextResponse.data;
        expect(tasksData).not.toBeUndefined();
        expect(nextResponse.isLoading).toBe(false);
        expect(nextResponse.isSuccess).toBe(true);
    });

    test('returns overdue tasks filtered by assignee', async () => {
        server.use(filterTaskHandler);
        const { result, waitForNextUpdate } = renderHook(
            () =>
                useGetAllTasksQuery({
                    assignee: 'shmbajaj',
                    status: 'overdue',
                }),
            { wrapper: Wrapper }
        );
        const initialResponse = result.current;
        expect(initialResponse.data).toBeUndefined();
        expect(initialResponse.isLoading).toBe(true);

        await act(() => waitForNextUpdate());

        const nextResponse = result.current;
        const tasksData = nextResponse.data;
        expect(tasksData.tasks.length).not.toBe(0);
        expect(nextResponse.isLoading).toBe(false);
        expect(nextResponse.isSuccess).toBe(true);
    });

    test('returns empty array when no tasks are found by title', async () => {
        server.use(filterTaskHandler);
        const { result, waitForNextUpdate } = renderHook(
            () =>
                useGetAllTasksQuery({
                    title: 'task',
                }),
            { wrapper: Wrapper }
        );
        const initialResponse = result.current;
        expect(initialResponse.data).toBeUndefined();
        expect(initialResponse.isLoading).toBe(true);

        await act(() => waitForNextUpdate());

        const nextResponse = result.current;
        const tasksData = nextResponse.data;
        expect(tasksData).not.toBeUndefined();
        expect(nextResponse.isLoading).toBe(false);
        expect(nextResponse.isSuccess).toBe(true);
        expect(tasksData?.tasks).toHaveLength(0);
    });
});

describe('useAddTaskMutation()', () => {
    test('creates a new task', async () => {
        const newTask = {
            title: 'SSG and SSR config to be setup ',
            type: 'feature',
            status: 'AVAILABLE',
            percentCompleted: 0,
            priority: 'TBD',
            github: {
                issue: {
                    status: 'open',
                    id: 697061944,
                },
            },
        };
        const { result, waitForNextUpdate } = renderHook(
            () => useAddTaskMutation(),
            {
                wrapper: Wrapper,
            }
        );
        const [addTask, initialResponse] = result.current;
        expect(initialResponse.isLoading).toBe(false);
        expect(initialResponse.data).toBeUndefined();

        act(() => {
            addTask(newTask);
        });

        const loadingResponse = result.current[1];
        expect(loadingResponse.isLoading).toBe(true);

        await act(() => waitForNextUpdate());

        const nextResponse = result.current[1];
        expect(nextResponse.data).not.toBeUndefined();
        expect(nextResponse.data?.message).toBe('Task created successfully!');
        expect(nextResponse.data?.task).not.toBeUndefined();
        expect(nextResponse.data?.task).toStrictEqual(newTask);
    });

    test('should fail to create a new task with error', async () => {
        server.use(failedAddNewTaskHandler);
        const { result, waitForNextUpdate } = renderHook(
            () => useAddTaskMutation(),
            {
                wrapper: Wrapper,
            }
        );
        const [addTask, initialResponse] = result.current;
        expect(initialResponse.isLoading).toBe(false);
        expect(initialResponse.data).toBeUndefined();

        act(() => {
            const task = {
                type: 'feature',
                status: 'AVAILABLE',
                percentCompleted: 0,
            };
            addTask(task);
        });

        await act(() => waitForNextUpdate());

        const nextResponse = result.current[1];
        expect(nextResponse.isError).toBe(true);
        expect(nextResponse.error).toHaveProperty('status', 400);
        expect(nextResponse.error).toHaveProperty(
            'data',
            failedAddNewTaskResponse
        );
    });
});

describe('useUpdateTaskMutation()', () => {
    const updatedTaskData = {
        status: 'COMPLETED',
    };

    test('updates a task', async () => {
        const taskId = '1eJhUW19D556AhPEpdPr';
        const { result, waitForNextUpdate } = renderHook(
            () => useUpdateTaskMutation(),
            {
                wrapper: Wrapper,
            }
        );
        const [updateTask, initialResponse] = result.current;
        expect(initialResponse.isLoading).toBe(false);
        expect(initialResponse.data).toBeUndefined();

        act(() => {
            const task = {
                task: updatedTaskData,
                id: taskId,
            };
            updateTask(task);
        });

        const loadingResponse = result.current[1];
        expect(loadingResponse.isLoading).toBe(true);

        await waitForNextUpdate({ timeout: 7000 });

        const nextResponse = result.current[1];
        expect(nextResponse.data).toBeNull();
        expect(nextResponse.isSuccess).toBe(true);
        expect(nextResponse.isLoading).toBe(false);
        expect(nextResponse.status).toBe(QueryStatus.fulfilled);
    }, 7000);

    test('should fail to update a task with error when invalid id is passed', async () => {
        server.use(failedUpdateTaskHandler);
        const { result, waitForNextUpdate } = renderHook(
            () => useUpdateTaskMutation(),
            {
                wrapper: Wrapper,
            }
        );
        const [updateTask, initialResponse] = result.current;
        expect(initialResponse.isLoading).toBe(false);
        expect(initialResponse.data).toBeUndefined();

        act(() => {
            updateTask({ task: updatedTaskData, id: 'incorrectId' });
        });

        await act(() => waitForNextUpdate());

        const nextResponse = result.current[1];
        expect(nextResponse.isError).toBe(true);
        expect(nextResponse.error).toHaveProperty('status', 404);
        expect(nextResponse.error).toHaveProperty('data', {
            statusCode: 404,
            error: 'Not Found',
            message: 'Task not found',
        });
    });
});

describe('useUpdateSelfTaskMutation', () => {
    const updatedSelfTaskData = {
        status: 'COMPLETED',
    };
    test('updates a task', async () => {
        const taskId = '1eJhUW19D556AhPEpdRd';
        const { result, waitForNextUpdate } = renderHook(
            () => useUpdateSelfTaskMutation(),
            {
                wrapper: Wrapper,
            }
        );
        const [updateTask, initialResponse] = result.current;
        expect(initialResponse.isLoading).toBe(false);
        expect(initialResponse.data).toBeUndefined();

        act(() => {
            const task = {
                task: updatedSelfTaskData,
                id: taskId,
            };
            updateTask(task);
        });

        const loadingResponse = result.current[1];
        expect(loadingResponse.isLoading).toBe(true);

        await waitForNextUpdate({ timeout: 7000 });

        const nextResponse = result.current[1];
        expect(nextResponse.data).toBeNull();
        expect(nextResponse.isSuccess).toBe(true);
        expect(nextResponse.isLoading).toBe(false);
        expect(nextResponse.status).toBe(QueryStatus.fulfilled);
    }, 7000);

    test('should fail to update a task with error when invalid id is passed', async () => {
        server.use(failedUpdateSelfTaskHandler);
        const { result, waitForNextUpdate } = renderHook(
            () => useUpdateSelfTaskMutation(),
            {
                wrapper: Wrapper,
            }
        );
        const [updateTask, initialResponse] = result.current;
        expect(initialResponse.isLoading).toBe(false);
        expect(initialResponse.data).toBeUndefined();

        act(() => {
            updateTask({ task: updatedSelfTaskData, id: 'incorrectId' });
        });

        await act(() => waitForNextUpdate());

        const nextResponse = result.current[1];
        expect(nextResponse.isError).toBe(true);
        expect(nextResponse.error).toHaveProperty('status', 404);
        expect(nextResponse.error).toHaveProperty('data', {
            statusCode: 404,
            error: 'Not Found',
            message: 'Task not found',
        });
    });
});
describe('useGetMineTasksQuery()', () => {
    test('returns all tasks', async () => {
        const { result, waitForNextUpdate } = renderHook(
            () => useGetMineTasksQuery(),
            {
                wrapper: Wrapper,
            }
        );
        const initialResponse = result.current;
        expect(initialResponse.data).toBeUndefined();
        expect(initialResponse.isLoading).toBe(true);

        await act(() => waitForNextUpdate());

        const nextResponse = result.current;
        const tasksData = nextResponse.data;
        expect(tasksData).not.toBeUndefined();
        expect(nextResponse.isLoading).toBe(false);
        expect(nextResponse.isSuccess).toBe(true);
    });

    test('should fail to return all tasks with error', async () => {
        server.use(failedGetMineTask);
        const { result, waitForNextUpdate } = renderHook(
            () => useGetMineTasksQuery(),
            {
                wrapper: Wrapper,
            }
        );
        const initialResponse = result.current;
        expect(initialResponse.isLoading).toBe(true);
        expect(initialResponse.data).toBeUndefined();

        await act(() => waitForNextUpdate());

        const nextResponse = result.current;
        expect(nextResponse.isError).toBe(true);
        expect(nextResponse.error).toHaveProperty('status', 500);
        expect(nextResponse.error).toHaveProperty(
            'data',
            failedGetTasksResponse
        );
    });
});
