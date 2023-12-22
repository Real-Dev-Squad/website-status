import { store } from '@/app/store';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';
import handlers from '../../../__mocks__/handlers';
import { PropsWithChildren } from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import { useAddOrUpdateMutation } from '@/app/services/taskRequestApi';
import { taskRequestErrorHandler } from '../../../__mocks__/handlers/task-request.handler';
import { TASK_REQUEST_TYPES } from '@/constants/tasks';

function Wrapper({
    children,
}: PropsWithChildren<Record<string, never>>): JSX.Element {
    return <Provider store={store()}>{children}</Provider>;
}

const server = setupServer(...handlers);

describe('useAddOrUpdateMutation', () => {
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    it('should update the user', async () => {
        const { result, waitForNextUpdate } = renderHook(
            () => useAddOrUpdateMutation(),
            { wrapper: Wrapper }
        );

        const [addTask, initialResponse] = result.current;
        expect(initialResponse.data).toBeUndefined();
        expect(initialResponse.isLoading).toBe(false);

        act(() => {
            addTask({
                taskId: 'taskId',
                userId: 'userId',
                requestType: TASK_REQUEST_TYPES.ASSIGNMENT,
                description: '',
                proposedStartDate: Date.now(),
                proposedDeadline: Date.now(),
            });
        });

        expect(result.current[1].isLoading).toBe(true);

        await act(() => waitForNextUpdate());

        const response = result.current[1];
        expect(response.data).not.toBeUndefined();
        expect(response.data?.message).toBe(
            'Task request successfully created'
        );
        expect(response.isLoading).toBe(false);
        expect(response.isSuccess).toBe(true);
        expect(response.isError).toBe(false);
    });

    it('should return error while updating the user', async () => {
        server.use(...taskRequestErrorHandler);
        const { result, waitForNextUpdate } = renderHook(
            () => useAddOrUpdateMutation(),
            { wrapper: Wrapper }
        );

        const [addTask, initialResponse] = result.current;
        expect(initialResponse.data).toBeUndefined();
        expect(initialResponse.isLoading).toBe(false);

        act(() => {
            addTask({ taskId: 'taskId', userId: 'userId' });
        });

        expect(result.current[1].isLoading).toBe(true);

        await act(() => waitForNextUpdate());

        const response = result.current[1];
        expect(response.error).not.toBeUndefined();
        expect(response.isLoading).toBe(false);
        expect(response.isSuccess).toBe(false);
        expect(response.isError).toBe(true);
    });

    it('should update successfully', async () => {
        const { result, waitForNextUpdate } = renderHook(
            () => useAddOrUpdateMutation(),
            { wrapper: Wrapper }
        );

        const [addTask, initialResponse] = result.current;
        expect(initialResponse.data).toBeUndefined();
        expect(initialResponse.isLoading).toBe(false);

        act(() => {
            addTask({
                taskId: 'taskId',
                userId: 'userId',
                externalIssueUrl:
                    'https://api.github.com/repos/Real-Dev-Squad/website-status/issues/1050',
                externalIssueHtmlUrl:
                    'https://github.com/Real-Dev-Squad/website-status/issues/1050',
                requestType: TASK_REQUEST_TYPES.ASSIGNMENT,
                description: '',
                proposedStartDate: Date.now(),
                proposedDeadline: Date.now(),
            });
        });

        expect(result.current[1].isLoading).toBe(true);

        await act(() => waitForNextUpdate());

        const response = result.current[1];
        expect(response.data).not.toBeUndefined();
        expect(response.data?.message).toBe(
            'Task request successfully created'
        );
        expect(response.isLoading).toBe(false);
        expect(response.isSuccess).toBe(true);
        expect(response.isError).toBe(false);
    });
});
