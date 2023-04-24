import { setupServer } from 'msw/node';
import handlers from '../../../__mocks__/handlers';
import React, { PropsWithChildren } from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { useGetUserQuery } from '@/app/services/userApi';

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

describe('useGetUserQuery', () => {
    test('returns users', async () => {
        const { result, waitForNextUpdate } = renderHook(
            () => useGetUserQuery(),
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
        console.log(nextResponse.data);
        expect(nextResponse.data).toBeDefined();
    });
});
