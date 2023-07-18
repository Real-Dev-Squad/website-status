import { setupServer } from 'msw/node';

import handlers from '../../../__mocks__/handlers';
import { PropsWithChildren } from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import {
    useAddTaskMutation,
    useGetAllTasksQuery,
    useUpdateTaskMutation,
    useAssignTaskMutation,
} from '@/app/services/tasksApi';
import { QueryStatus } from '@reduxjs/toolkit/dist/query';
import {
    failedAddNewTaskHandler,
    failedAddNewTaskResponse,
    failedGetTasks,
    failedGetTasksResponse,
    failedUpdateTaskHandler,
} from '../../../__mocks__/handlers/tasks.handler';
import { selfHandlerFn } from '../../../__mocks__/handlers/self.handler';
import usersData from '../../../__mocks__/db/users';
import { RequestHandler } from 'msw';

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

function Wrapper({
    children,
}: PropsWithChildren<Record<string, never>>): JSX.Element {
    return <Provider store={store()}>{children}</Provider>;
}

type useAssignTaskMutationType = {
    handler: RequestHandler[];
    payload: {
        taskId: string;
        assignee: string;
    };
    targetRes: {
        target: 'isSuccess' | 'isError';
        value: boolean;
    };
    targetStatus: {
        target: 'data' | 'error';
        value: number;
    };
    targetData: {
        target: 'data' | 'error';
        value: object;
    };
};
const useAssignTaskMutationTestWrapper = async ({
    handler,
    payload,
    targetRes,
    targetStatus,
    targetData,
}: useAssignTaskMutationType) => {
    server.use(...handler);
    const { result, waitForNextUpdate } = renderHook(
        () => useAssignTaskMutation(),
        {
            wrapper: Wrapper,
        }
    );
    const [assignTask, initialResponse] = result.current;
    expect(initialResponse.isLoading).toBe(false);
    expect(initialResponse.data).toBeUndefined();

    act(() => {
        assignTask(payload);
    });

    const loadingResponse = result.current[1];
    expect(loadingResponse.isLoading).toBe(true);

    await act(() => waitForNextUpdate({ timeout: 7000 }));

    const nextResponse = result.current[1];
    expect(nextResponse[targetRes.target]).toBe(targetRes.value);
    if (targetStatus.target !== 'data')
        expect(nextResponse[targetStatus.target]).toHaveProperty(
            'status',
            targetStatus.value
        );
    targetData.target !== 'data'
        ? expect(nextResponse[targetData.target]).toHaveProperty(
              'data',
              targetData.value
          )
        : expect(nextResponse).toHaveProperty('data', targetData.value);
};
describe('useGetAllTasksQuery()', () => {
    test('returns all tasks', async () => {
        const dev = false;
        const { result, waitForNextUpdate } = renderHook(
            () =>
                useGetAllTasksQuery({
                    dev: dev as boolean,
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
        const dev = false;
        const { result, waitForNextUpdate } = renderHook(
            () =>
                useGetAllTasksQuery({
                    dev: dev as boolean,
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
    test('returns all tasks if dev is true', async () => {
        const dev = true;
        const { result, waitForNextUpdate } = renderHook(
            () =>
                useGetAllTasksQuery({
                    dev: dev as boolean,
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
    test('returns filtered tasks if dev is true', async () => {
        const dev = true;
        const { result, waitForNextUpdate } = renderHook(
            () =>
                useGetAllTasksQuery({
                    dev: dev as boolean,
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
    test('returns next page of tasks', async () => {
        const dev = true;
        const { result, waitForNextUpdate } = renderHook(
            () =>
                useGetAllTasksQuery({
                    dev: dev as boolean,
                    nextPage:
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
        const dev = true;
        const { result, waitForNextUpdate } = renderHook(
            () =>
                useGetAllTasksQuery({
                    dev: dev as boolean,
                    prevPage:
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

    test('updates a task with the isDevEnabled set to true', async () => {
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
                isDevEnabled: true,
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
});

describe('useAssignTaskMutation', () => {
    const payload = { taskId: 'firestoreDocumentId1230', assignee: '19sriram' };

    test('should fail when the user is not Authorized', async () => {
        await useAssignTaskMutationTestWrapper({
            handler: [selfHandlerFn(200, usersData[0])],
            payload,
            targetRes: { target: 'isError', value: true },
            targetStatus: { target: 'error', value: 401 },
            targetData: {
                target: 'error',
                value: {
                    message: 'You are not authorized for this action.',
                    error: 'Unauthorized',
                },
            },
        });
    }, 7000);

    test('should fail when the user is not Authenticated', async () => {
        await useAssignTaskMutationTestWrapper({
            handler: [
                selfHandlerFn(404, {
                    message: "User doesn't exist",
                    error: 'Not Found',
                }),
            ],
            payload,
            targetRes: { target: 'isError', value: true },
            targetStatus: { target: 'error', value: 403 },
            targetData: {
                target: 'error',
                value: {
                    message: 'You are restricted from performing this action',
                    error: 'Forbidden',
                },
            },
        });
    });

    test('should fail to assign task with error when invalid taskId is passed', async () => {
        await useAssignTaskMutationTestWrapper({
            handler: [
                selfHandlerFn(200, {
                    ...usersData[0],
                    roles: { super_user: true },
                    status: 'idle',
                }),
            ],
            payload: { ...payload, taskId: 'incorrectId' },
            targetRes: { target: 'isError', value: true },
            targetStatus: { target: 'error', value: 404 },
            targetData: {
                target: 'error',
                value: {
                    message: 'Task not found',
                    error: 'Not Found',
                },
            },
        });
    });

    test('should fail to assign task with error when invalid assignee is passed', async () => {
        await useAssignTaskMutationTestWrapper({
            handler: [
                selfHandlerFn(200, {
                    ...usersData[0],
                    roles: { super_user: true },
                    status: 'idle',
                }),
            ],
            payload: { ...payload, assignee: 'incorrectAssignee' },
            targetRes: { target: 'isError', value: true },
            targetStatus: { target: 'error', value: 404 },
            targetData: {
                target: 'error',
                value: {
                    message: "User doesn't exist",
                    error: 'Not Found',
                },
            },
        });
    });

    test('should fail to assign task with error when a active or ooo assignee is passed', async () => {
        await useAssignTaskMutationTestWrapper({
            handler: [
                selfHandlerFn(200, {
                    ...usersData[0],
                    roles: { super_user: true },
                    status: 'active',
                }),
            ],
            payload,
            targetRes: { target: 'isError', value: true },
            targetStatus: { target: 'error', value: 404 },
            targetData: {
                target: 'error',
                value: {
                    message:
                        'Task cannot be assigned to users with active or OOO status',
                },
            },
        });
    });

    test('should pass if everything is fine', async () => {
        await useAssignTaskMutationTestWrapper({
            handler: [
                selfHandlerFn(200, {
                    ...usersData[0],
                    roles: { super_user: true },
                }),
            ],
            payload: { ...payload, assignee: 'munish' },
            targetRes: { target: 'isSuccess', value: true },
            targetStatus: { target: 'data', value: 200 },
            targetData: {
                target: 'data',
                value: {
                    message: 'Task assigned',
                    Id: payload.taskId,
                },
            },
        });
    });
});
