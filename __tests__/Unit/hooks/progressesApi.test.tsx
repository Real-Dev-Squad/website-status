import { setupServer } from 'msw/node';
import handlers from '../../../__mocks__/handlers';
import React, { PropsWithChildren } from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { useGetProgressDetailsQuery } from '@/app/services/progressesApi';
import { mockGetTaskProgress } from '../../../__mocks__/db/progresses';

const server = setupServer(...handlers);

function Wrapper({
    children,
}: PropsWithChildren<Record<string, never>>): JSX.Element {
    return <Provider store={store()}>{children}</Provider>;
}

beforeAll(() => {
    server.listen();
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('useGetProgressDetails', () => {
    test('Returns Task Progress', async () => {
        const { result, waitForNextUpdate } = renderHook(
            () =>
                useGetProgressDetailsQuery({ taskId: 'OxYqJgf6Tyl90uci1mzs' }),
            { wrapper: Wrapper }
        );

        const initialResponse = result.current;
        expect(initialResponse.data).toBeUndefined();
        expect(initialResponse.isLoading).toBe(true);

        await act(() => waitForNextUpdate());

        const nextResponse = result.current;
        const taskProgressResponse = nextResponse.data;
        expect(nextResponse.status).toEqual('fulfilled');
        expect(nextResponse.error).toBeUndefined();
        expect(nextResponse.isSuccess).toEqual(true);
        expect(taskProgressResponse).not.toBeUndefined();
        expect(taskProgressResponse).toEqual(mockGetTaskProgress);
    });
    test('Returns Task Progress with userData in response if dev is true', async () => {
        const { result, waitForNextUpdate } = renderHook(
            () =>
                useGetProgressDetailsQuery({
                    taskId: 'OxYqJgf6Tyl90uci1mzs',
                    dev: true,
                }),
            { wrapper: Wrapper }
        );

        const initialResponse = result.current;
        expect(initialResponse.data).toBeUndefined();
        expect(initialResponse.isLoading).toBe(true);

        await act(() => waitForNextUpdate());

        const nextResponse = result.current;
        const taskProgressResponse = nextResponse.data;
        expect(nextResponse.status).toEqual('fulfilled');
        expect(nextResponse.error).toBeUndefined();
        expect(nextResponse.isSuccess).toEqual(true);
        expect(taskProgressResponse).not.toBeUndefined();
        expect(taskProgressResponse).toEqual(mockGetTaskProgress);
        expect(taskProgressResponse?.data[0].userData).toEqual(
            mockGetTaskProgress.data[0].userData
        );
    });
});
