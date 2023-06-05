import { setupServer } from 'msw/node';

import handlers from '../../../__mocks__/handlers';
import { PropsWithChildren } from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { useGetOrgIssuesQuery } from '@/app/services/issuesApi';
import {
    failedGetIssuesHandler,
    issuesNoDataFoundHandler,
} from '../../../__mocks__/handlers/issues.handler';

const server = setupServer(...handlers);

beforeAll(() => {
    server.listen();
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

function Wrapper({
    children,
}: PropsWithChildren<Record<string, never>>): JSX.Element {
    return <Provider store={store()}>{children}</Provider>;
}

describe('useGetAllTasksQuery()', () => {
    test('returns all issues when searched without query string', async () => {
        const { result, waitForNextUpdate } = renderHook(
            () => useGetOrgIssuesQuery(''),
            {
                wrapper: Wrapper,
            }
        );
        const initialResponse = result.current;
        expect(initialResponse.data).toBeUndefined();
        expect(initialResponse.isLoading).toBe(true);

        await act(() => waitForNextUpdate());

        const { data: issuesData, isLoading, isSuccess } = result.current;
        expect(issuesData).not.toBeUndefined();
        expect(isLoading).toBe(false);
        expect(isSuccess).toBe(true);
    });

    test('should return issues when searched with query string', async () => {
        const { result, waitForNextUpdate } = renderHook(
            () => useGetOrgIssuesQuery('one-click'),
            {
                wrapper: Wrapper,
            }
        );
        const initialResponse = result.current;
        expect(initialResponse.data).toBeUndefined();
        expect(initialResponse.isLoading).toBe(true);

        await act(() => waitForNextUpdate());

        const { data: issuesData, isLoading, isSuccess } = result.current;
        expect(issuesData).not.toBeUndefined();
        expect(isLoading).toBe(false);
        expect(isSuccess).toBe(true);
    });

    test('issues data should be empty when no issues are found', async () => {
        server.use(issuesNoDataFoundHandler);
        const { result, waitForNextUpdate } = renderHook(
            () => useGetOrgIssuesQuery('unknown_query'),
            {
                wrapper: Wrapper,
            }
        );
        const initialResponse = result.current;
        expect(initialResponse.isLoading).toBe(true);
        expect(initialResponse.data).toBeUndefined();

        await act(() => waitForNextUpdate());

        const { data, isLoading, isSuccess } = result.current;
        expect(data).toHaveLength(0);
        expect(isLoading).toBe(false);
        expect(isSuccess).toBeTruthy();
    });

    test('should fail to fetch org issues', async () => {
        server.use(failedGetIssuesHandler);
        const { result, waitForNextUpdate } = renderHook(
            () => useGetOrgIssuesQuery(''),
            {
                wrapper: Wrapper,
            }
        );
        const initialResponse = result.current;
        expect(initialResponse.data).toBeUndefined();
        expect(initialResponse.isLoading).toBe(true);

        await act(() => waitForNextUpdate());

        const nextResponse = result.current;
        expect(nextResponse.isError).toBe(true);
        expect(nextResponse.error).toHaveProperty('status', 500);
        expect(nextResponse.error).toHaveProperty('data', {
            statusCode: 500,
            message: 'Internal server occurred!',
        });
    });
});
