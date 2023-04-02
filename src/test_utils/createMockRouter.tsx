import { render } from "@testing-library/react";
import { NextRouter } from "next/router";
import { RouterContext } from "next/dist/shared/lib/router-context";

export const createMockRouter = (router: Partial<NextRouter> | undefined) => {
  return {
    isFallback: false,
    query: {},
    back: jest.fn(),
    ...router,
  };
};

export const renderWithRouter = (
  ui: React.ReactNode,
  props?: Partial<NextRouter>
) => {
  return {
    ...render(
      <RouterContext.Provider value={createMockRouter(props) as NextRouter}>
        {ui}
      </RouterContext.Provider>
    ),
  };
};
