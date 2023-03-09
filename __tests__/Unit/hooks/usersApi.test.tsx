import { setupServer } from 'msw/node';
import { useGetUsersQuery } from '@/app/services/usersApi';
import { usersHandler } from '../../../__mocks__/handlers/users.handler';
import React, { PropsWithChildren } from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { setupStore } from '@/app/store';
import fetchMock from 'jest-fetch-mock';

const server = setupServer(...usersHandler);

beforeAll(() => {
  server.listen();
  fetchMock.enableMocks();
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
  const store = setupStore();
  return <Provider store={store}>{children}</Provider>;
}

describe('useGetUsersQuery', () => {
  // INFO [refference]: [Testing RTK Query with Jest](https://medium.com/@johnmcdowell0801/testing-rtk-query-with-jest-cdfa5aaf3dc1)
  test('returns users', async () => {
    fetchMock.mockResponse(JSON.stringify({}));
    const { result, waitForNextUpdate } = renderHook(() => useGetUsersQuery(), {
      wrapper: Wrapper,
    });
    const initialResponse = result.current;
    expect(initialResponse.data).toBeUndefined();
    expect(initialResponse.isLoading).toBe(true);

    await act(() => waitForNextUpdate());

    const nextResponse = result.current;
    expect(nextResponse.data).not.toBeUndefined();
    expect(nextResponse.isLoading).toBe(false);
    expect(nextResponse.isSuccess).toBe(true);
  });
});
