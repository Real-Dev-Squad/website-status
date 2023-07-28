import { setupServer } from 'msw/node';
import handlers from '../../../__mocks__/handlers';
import React, { PropsWithChildren } from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { useGetPrsQuery } from '@/app/services/pullRequestsApi';
import { mockGetOpenPrs, mockGetStalePrs } from '../../../__mocks__/db/prs';

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

describe('useGetOpenPrsQuery', () => {
    test('Returns open Prs', async () => {
        const { result, waitForNextUpdate } = renderHook(
            () =>
                useGetPrsQuery({
                    prType: 'open',
                    page: 1,
                    numberOfCards: 3,
                }),
            {
                wrapper: Wrapper,
            }
        );
        const initialResponse = result.current;
        expect(initialResponse.data).toBeUndefined();
        expect(initialResponse.isLoading).toBe(true);

        await act(() => waitForNextUpdate());

        const nextResponse = result.current;
        const openPrResponse = nextResponse.data;

        expect(openPrResponse).not.toBeUndefined();
        expect(openPrResponse).toEqual(mockGetOpenPrs);
    });

    test('returns stale PRs', async () => {
        const { result, waitForNextUpdate } = renderHook(
            () =>
                useGetPrsQuery({
                    prType: 'stale',
                    page: 1,
                    numberOfCards: 3,
                }),
            {
                wrapper: Wrapper,
            }
        );
        const initialResponse = result.current;
        expect(initialResponse.data).toBeUndefined();
        expect(initialResponse.isLoading).toBe(true);

        await act(() => waitForNextUpdate());

        const nextResponse = result.current;
        const stalePrResponse = nextResponse.data;

        expect(stalePrResponse).not.toBeUndefined();
        expect(stalePrResponse).toEqual(mockGetStalePrs);
    });
});
