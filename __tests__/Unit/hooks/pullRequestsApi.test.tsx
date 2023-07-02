import { setupServer } from 'msw/node';
import handlers from '../../../__mocks__/handlers';
import React, { PropsWithChildren } from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { useGetOpenPrsQuery } from '@/app/services/pullRequestsApi';
import { mockGetOpenPrs } from '../../../__mocks__/db/prs';

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

describe.only('useGetOpenPrsQuery', () => {
    test('Returns Prs', async () => {
        const { result, waitForNextUpdate } = renderHook(
            () =>
                useGetOpenPrsQuery({
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
});
