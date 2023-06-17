import { setupServer } from 'msw/node';
import handlers from '../../../__mocks__/handlers';
import React, { PropsWithChildren } from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import {
    useGetTaskDetailsQuery,
    useGetTasksDependencyDetailsQuery,
} from '@/app/services/taskDetailsApi';
import { failedTaskDependencyDetails } from '../../../__mocks__/handlers/task-details.handler';

const server = setupServer(...handlers);

beforeAll(() => {
    server.listen();
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
const taskIds = ['6KhcLU3yr45dzjQIVm0J', '6KhcLU3yr45dzjQIVmod'];
const details = {
    url: 'https://realdevsquad.com/tasks/6KhcLU3yr45dzjQIVm0J/details',
    taskID: '6KhcLU3yr45dzjQIVm0J',
};
function Wrapper({
    children,
}: PropsWithChildren<Record<string, never>>): JSX.Element {
    return <Provider store={store()}>{children}</Provider>;
}

describe('useGetTaskDetailsQuery', () => {
    test('returns taskDetails', async () => {
        const { result, waitForNextUpdate } = renderHook(
            () => useGetTaskDetailsQuery(details.taskID),
            {
                wrapper: Wrapper,
            }
        );
        const initialResponse = result.current;
        expect(initialResponse.data).toBeUndefined();
        expect(initialResponse.isLoading).toBe(true);

        await act(() => waitForNextUpdate());
        const nextResponse = result.current;

        expect(nextResponse.data).not.toBeUndefined();
        expect(nextResponse.isLoading).toBe(false);
        expect(nextResponse.isSuccess).toBe(true);
        expect(nextResponse.data).toBeDefined();
    });
});

describe('useGetTasksDependencyDetailsQuery', () => {
    test('returns DependencyDetails', async () => {
        const { result, waitForNextUpdate } = renderHook(
            () => useGetTasksDependencyDetailsQuery(taskIds),
            {
                wrapper: Wrapper,
            }
        );
        const initialResponse = result.current;
        expect(initialResponse.data).toBeUndefined();
        expect(initialResponse.isLoading).toBe(true);

        await act(() => waitForNextUpdate());
        const nextResponse = result.current;

        expect(nextResponse.data).not.toBeUndefined();
        expect(nextResponse.isLoading).toBe(false);
        expect(nextResponse.isSuccess).toBe(true);
        expect(nextResponse.isError).toBeDefined();
        expect(nextResponse.data).toBeDefined();
    });
    test('should fail to return all tasks with error', async () => {
        server.use(failedTaskDependencyDetails);
        const { result, waitForNextUpdate } = renderHook(
            () => useGetTasksDependencyDetailsQuery(taskIds),
            {
                wrapper: Wrapper,
            }
        );

        await act(() => waitForNextUpdate());

        const nextResponse = result.current.data ?? [];
        expect(nextResponse).toHaveLength(taskIds.length);
        nextResponse.forEach((response) => {
            if (response.status === 'fulfilled') {
                expect(response.value.title).toBe('test 1 for drag and drop');
                expect(response.value.id).toBe('6KhcLU3yr45dzjQIVm0J');
            } else if (response.status === 'rejected') {
                expect(response.reason.error.error).toBe(
                    'TypeError: Network request failed'
                );
                expect(response.reason.error.status).toBe('FETCH_ERROR');
            }
        });
    });
});
