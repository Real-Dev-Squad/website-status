import { setupServer } from "msw/node";
import {
    useGetUsersQuery,
    useGetUsersByLinkQuery,
    useGetUsersByUsernameQuery,
} from "@/app/services/usersApi";
import handlers from "../../../__mocks__/handlers";
import React, { PropsWithChildren } from "react";
import { act, renderHook } from "@testing-library/react-hooks";
import { Provider } from "react-redux";
import { store } from "@/app/store";

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

describe("useGetUsersQuery", () => {
    test("returns users", async () => {
        const { result, waitForNextUpdate } = renderHook(
            () => useGetUsersQuery({ size: 2 }),
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
        expect(nextResponse.data?.users).toHaveLength(2);
    });
});

describe("useGetUsersByLinkQuery", () => {
    test("returns users", async () => {
        const { result: initialResult, waitForNextUpdate: initialWait } =
            renderHook(() => useGetUsersQuery({ size: 2 }), {
                wrapper: Wrapper,
            });
        await act(() => initialWait());
        const initialResponse = initialResult.current;

        // get next page users
        const { result: nextPageResult, waitForNextUpdate: nextPageWait } =
            renderHook(
                () =>
                    useGetUsersByLinkQuery({
                        paginatedLink: initialResponse.data?.links.next ?? "",
                    }),
                {
                    wrapper: Wrapper,
                }
            );
        await act(() => nextPageWait());
        const nextPageResponse = nextPageResult.current;

        expect(nextPageResponse.data).toBeDefined();
        expect(nextPageResponse.isLoading).toBe(false);
        expect(nextPageResponse.isSuccess).toBe(true);
        expect(nextPageResponse.data?.users).toBeDefined();
        expect(nextPageResponse.data?.links.next).toBeDefined();
        expect(nextPageResponse.data?.links.prev).toBeDefined();

        // get previous page users
        const { result: prevPageResult, waitForNextUpdate: prevPageWait } =
            renderHook(
                () =>
                    useGetUsersByLinkQuery({
                        paginatedLink: nextPageResponse.data?.links.prev ?? "",
                    }),
                {
                    wrapper: Wrapper,
                }
            );
        await act(() => prevPageWait());
        const prevPageResponse = prevPageResult.current;

        expect(prevPageResponse.data).toBeDefined();
        expect(prevPageResponse.isLoading).toBe(false);
        expect(prevPageResponse.isSuccess).toBe(true);
        expect(nextPageResponse.data?.users).toBeDefined();
        expect(prevPageResponse.data?.links.next).toBeDefined();
        expect(prevPageResponse.data?.links.prev).toBeDefined();
    });
});

describe("useGetUsersByUsernameQuery", () => {
    test("returns users by username prefix", async () => {
        const { result, waitForNextUpdate } = renderHook(
            () => useGetUsersByUsernameQuery({ searchString: "mu", size: 2 }),
            {
                wrapper: Wrapper,
            }
        );
        const initialResponse = result.current;
        expect(initialResponse.data).toBeUndefined();
        expect(initialResponse.isLoading).toBe(true);

        await act(() => waitForNextUpdate());

        const nextResponse = result.current;
        const users = nextResponse.data?.users;
        expect(nextResponse.data).not.toBeUndefined();
        expect(users).toHaveLength(2);
        expect(nextResponse.isLoading).toBe(false);
        expect(nextResponse.isSuccess).toBe(true);
        users?.forEach((user) => {
            expect(user.username).toMatch(/^mu/);
        });
    });
});
