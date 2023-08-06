import { setupServer } from 'msw/node';
import handlers from '../../../__mocks__/handlers';
import React, { PropsWithChildren } from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { useFetchSearchResultsQuery } from '@/app/services/taskSearchApi';

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
describe('useGetUsersByUsernameQuery', () => {
    test('returns users by username prefix', async () => {
        const { result, waitForNextUpdate } = renderHook(
            () => useFetchSearchResultsQuery('task'),
            {
                wrapper: Wrapper,
            }
        );
        const initialResponse = result.current;
        console.log('initial response', initialResponse);
        expect(initialResponse.data).toBeUndefined();
        expect(initialResponse.isLoading).toBe(true);

        await act(() => waitForNextUpdate());

        const nextResponse = result.current;
        console.log(nextResponse);
    });
});
