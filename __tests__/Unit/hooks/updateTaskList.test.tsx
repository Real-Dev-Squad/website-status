import { useUpdateTaskDetailsByIdMutation } from '@/app/services/tasksApi';
import { store } from '@/app/store';
import { act, renderHook } from '@testing-library/react-hooks';
import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';

function Wrapper({
    children,
}: PropsWithChildren<Record<string, never>>): JSX.Element {
    return <Provider store={store()}>{children}</Provider>;
}

const taskDetails = {
    id: '1',
    cardDetails: {
        id: '123',
        lossRate: {
            dinero: 10,
            neelam: 5,
        },
        links: [''],
        completionAward: {
            dinero: 110,
            neelam: 10,
        },
        dependsOn: [],
        assignee: 'john',
        startedOn: '1618790400',
        isNoteworthy: true,
        title: 'Test',
        purpose: '',
        percentCompleted: 0,
        endsOn: '1618790400',
        status: 'progress',
        featureUrl: 'progress',
        type: 'feature',
        createdBy: 'sam',
    },
};

describe('Update task details', () => {
    test('Should update task details by id', async () => {
        const { result, waitForNextUpdate } = renderHook(
            () => useUpdateTaskDetailsByIdMutation(),
            {
                wrapper: Wrapper,
            }
        );
        const [updateTaskDetailsById, initialResponse] = result.current;
        expect(initialResponse.data).toBeUndefined();
        expect(initialResponse.isLoading).toBe(false);

        act(() => {
            void updateTaskDetailsById(taskDetails);
        });

        const loadingResponse = result.current[1];
        expect(loadingResponse.data).toBeUndefined();
        expect(loadingResponse.isLoading).toBe(true);

        await waitForNextUpdate();

        const loadedResponse = result.current[1];

        expect(loadedResponse.data).not.toBeUndefined();
        expect(loadedResponse.isLoading).toBe(false);
        expect(loadedResponse.isSuccess).toBe(true);
    });
});
