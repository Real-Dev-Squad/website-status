import { setupServer } from 'msw/node';
import { useGetChallengesQuery } from '@/app/services/challengesApi';
import React, { PropsWithChildren } from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { rest } from 'msw';

const server = setupServer(
    rest.get('/challenges', (req, res, ctx) => {
        return res(
            ctx.json({
                Active: [],
                Completed: [],
            })
        );
    })
);

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

describe('useGetChallengesQuery', () => {
    test('returns challenges', async () => {
        const { result, waitForNextUpdate } = renderHook(
            () => useGetChallengesQuery(),
            {
                wrapper: Wrapper,
            }
        );
        const initialResponse = result.current;
        expect(initialResponse.data).toBeUndefined();
        expect(initialResponse.isLoading).toBe(true);

        await act(async () => {
            await waitForNextUpdate();
        });
        const nextResponse = result.current;

        expect(nextResponse.isLoading).toBe(false);
        expect(nextResponse.isSuccess).toBe(true);
        expect(nextResponse.data).toEqual({ Active: [], Completed: [] });
        expect(nextResponse.data).toBeDefined();
    });
});
