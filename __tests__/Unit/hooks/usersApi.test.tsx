
import { setupServer } from 'msw/node';
import { useGetUsersQuery, useGetUsersByLinkQuery, useGetUsersByUsernameQuery } from '@/app/services/usersApi';
import { usersHandler } from "../../../__mocks__/handlers/users.handler";


import React, { PropsWithChildren } from 'react'
import { renderHook } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import type { PreloadedState } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { setupStore } from '@/app/store'
import type { AppStore,RootState } from '@/app/store'

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>
  store?: AppStore
}

const server = setupServer(...usersHandler);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());


export function renderWithProviders<P, R>(
  callback: (props: P) => R,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>
  }
  return { store, ...renderHook(callback, { wrapper: Wrapper, ...renderOptions }) }
}

describe('useGetUsersQuery', () => {
  test('returns users', async () => {
  
    const { result } = renderWithProviders(() => useGetUsersQuery())
    expect(result.current.data).toBeUndefined();
  });
});
