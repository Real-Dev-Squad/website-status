import { setupServer } from 'msw/node';
import { useGetStatusQuery, useGetAllStatusQuery } from "@/app/services/statusApi";
import handlers from '../../../__mocks__/handlers';
import React, { PropsWithChildren } from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { store } from "@/app/store";

const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
  return <Provider store={store()}>{children}</Provider>;
}

describe('useGetStatusQuery', () => {
  test('returns idle status users', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useGetStatusQuery("IDLE"), {
      wrapper: Wrapper,
    });
    const initialResponse = result.current;
    expect(initialResponse.data).toBeUndefined();
    expect(initialResponse.isLoading).toBe(true);

    await act(() => waitForNextUpdate());
    
    const nextResponse = result.current;
    const usersDataWithStatus = nextResponse?.data?.allUserStatus
    expect(nextResponse.data).not.toBeUndefined();
    expect(nextResponse.data?.message).toEqual('Idle user status returned successfully')
    expect(nextResponse.isLoading).toBe(false);
    expect(nextResponse.isSuccess).toBe(true);
    usersDataWithStatus?.forEach((userState) => {
      expect(userState.currentStatus.state).toEqual("IDLE")
    })
  });
});

describe('useGetAllStatusQuery', () => {
  test('returns all status users', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useGetAllStatusQuery(), {
      wrapper: Wrapper,
    });
    const initialResponse = result.current;
    expect(initialResponse.data).toBeUndefined();
    expect(initialResponse.isLoading).toBe(true);

    await act(() => waitForNextUpdate());
    
    const nextResponse = result.current;
    expect(nextResponse.data).not.toBeUndefined();
    expect(nextResponse.data?.message).toEqual('All user status returned successfully')
    expect(nextResponse.isLoading).toBe(false);
    expect(nextResponse.isSuccess).toBe(true);
  });

});