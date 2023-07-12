import React, { PropsWithChildren } from 'react';
import useUserData from '@/hooks/useUserData';
import { setupServer } from 'msw/node';
import handlers from '../../../__mocks__/handlers';
import { store } from '@/app/store';
import { act, renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';

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

describe('useUserData', () => {
    test('returns the user as not authorized ', async () => {
        const { result, waitForNextUpdate } = renderHook(() => useUserData(), {
            wrapper: Wrapper,
        });
        const initialResponse = result.current;
        expect(initialResponse.data).toBeUndefined();

        await act(() => waitForNextUpdate());
        const nextResponse = result.current;

        expect(nextResponse.isSuccess).toBe(true);
        expect(nextResponse.isUserAuthorized).toBe(false);
    });
});
