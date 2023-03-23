import { setupServer } from 'msw/node';
import { useGetIdleStatusQuery } from "@/app/services/statusApi";
import idleUserHandler from '../../../__mocks__/handlers/idle-users.handler';
import React, { PropsWithChildren } from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { store } from "@/app/store";

const server = setupServer(...idleUserHandler);

beforeAll(() => {
  server.listen();
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
  return <Provider store={store()}>{children}</Provider>;
}

describe('useGetUsersQuery', () => {
  test('returns users', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useGetIdleStatusQuery("IDLE"), {
      wrapper: Wrapper,
    });
    const initialResponse = result.current;
    expect(initialResponse.data).toBeUndefined();
    expect(initialResponse.isLoading).toBe(true);
    console.log({initialResponse})
    await act(() => waitForNextUpdate());
    const nextResponse = result.current;
    console.log({nextResponse})
    expect(nextResponse.data).not.toBeUndefined();
    expect(nextResponse.isLoading).toBe(false);
    expect(nextResponse.isSuccess).toBe(true);
  });
  
  test('returns 400 state param missing', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useGetIdleStatusQuery(""), {
      wrapper: Wrapper,
    });
    const initialResponse = result.current;
    expect(initialResponse.data).toBeUndefined();
    expect(initialResponse.isLoading).toBe(true);

    await act(() => waitForNextUpdate());

    const nextResponse = result.current;
    expect(nextResponse.data).toBeUndefined();
    expect(nextResponse.isError).toBe(true);
  });
});