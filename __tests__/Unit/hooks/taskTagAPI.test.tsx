import { act, renderHook } from '@testing-library/react-hooks';
import { PropsWithChildren } from 'react';

import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { useDeleteTaskTagLevelMutation } from '@/app/services/taskTagApi';
import { setupServer } from 'msw/node';
import handlers from '../../../__mocks__/handlers';

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

describe('test task tag API', () => {
    test('Success', async () => {
        const { result, waitForNextUpdate } = renderHook(
            () => useDeleteTaskTagLevelMutation(),
            {
                wrapper: Wrapper,
            }
        );
        const [deleteTaskTagLevel, initialResponse] = result.current;
        expect(initialResponse.data).toBeUndefined();
        expect(initialResponse.isLoading).toBe(false);

        act(() => {
            void deleteTaskTagLevel({
                taskItemToDelete: {
                    tagId: '1',
                    itemType: 'TASK',
                },
                itemId: '1',
            });
        });

        const loadingResponse = result.current[1];
        expect(loadingResponse.data).toBeUndefined();
        expect(loadingResponse.isLoading).toBe(true);

        await waitForNextUpdate();

        const loadedResponse = result.current[1];
        expect(loadedResponse.data).not.toBeUndefined();
        console.log(loadedResponse.data);
        expect(loadedResponse.isLoading).toBe(false);
        expect(loadedResponse.isSuccess).toBe(true);
    });
});
