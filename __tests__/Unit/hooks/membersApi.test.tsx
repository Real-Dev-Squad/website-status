import { setupServer } from 'msw/node';
import handlers from '../../../__mocks__/handlers/members.handler.js';
import { PropsWithChildren } from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { useGetIdleMembersQuery } from '@/app/services/membersApi';

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

describe('useGetIdleMembersQuery', () => {
    test('returns idle members', async () => {
        const { result, waitForNextUpdate } = renderHook(
            () => useGetIdleMembersQuery(),
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
