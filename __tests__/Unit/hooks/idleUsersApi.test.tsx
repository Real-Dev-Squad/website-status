import { setupServer } from 'msw/node';
import handlers, {
    failedIdleUsersHandler,
} from '../../../__mocks__/handlers/idle-users.handler.js';

import { PropsWithChildren } from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { useGetIdleUsersQuery } from '@/app/services/idleUsersApi';

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

describe('useGetIdleUsersQuery', () => {
    test('returns idle users', async () => {
        const { result, waitForNextUpdate } = renderHook(
            () => useGetIdleUsersQuery(),
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

    test('checks for error response', async () => {
        server.use(failedIdleUsersHandler);
        const { result, waitForNextUpdate } = renderHook(
            () => useGetIdleUsersQuery(),
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
            error: 'Internal Server Error',
            message: 'An internal server error occurred',
        });
    });
});
