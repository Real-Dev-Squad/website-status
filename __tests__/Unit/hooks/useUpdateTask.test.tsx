import { act, renderHook } from '@testing-library/react-hooks';
import useUpdateTask from '@/hooks/useUpdateTask';
import { tasks } from '../../../__mocks__/db/tasks';
import groupTasksByStatus from '@/utils/groupTasksByStatus';

describe('useUpdateTask hook', () => {
    test('should update the given status of taskId passed', async () => {
        const setTasks = jest.fn();
        const groupedTasks = groupTasksByStatus(tasks);
        const { result } = renderHook(() =>
            useUpdateTask(groupedTasks, setTasks)
        );
        const updateTask = result.current;
        act(() => {
            updateTask(groupedTasks['progress'][0].id, {
                status: 'closed',
            });
        });

        const task: any = groupedTasks['progress'][0];
        groupedTasks['closed'] = [{ ...task, status: 'closed' }];
        groupedTasks['progress'].splice(0, 1);

        expect(setTasks).toHaveBeenCalled();
        expect(setTasks).toHaveBeenLastCalledWith(groupedTasks);
    });

    test('should update the assignee taskId passed', async () => {
        const setTasks = jest.fn();
        const groupedTasks = groupTasksByStatus(tasks);

        const { result } = renderHook(() =>
            useUpdateTask(groupedTasks, setTasks)
        );
        const updateTask = result.current;
        act(() => {
            updateTask(groupedTasks['progress'][0], {
                assignee: 'ankush',
            });
        });

        groupedTasks['progress'][0].assignee = 'ankush';

        expect(setTasks).toHaveBeenCalled();
        expect(setTasks).toHaveBeenLastCalledWith(groupedTasks);
    });

    test('should not update any task when passed taskId is not present in the list', async () => {
        const setTasks = jest.fn();
        const groupedTasks = groupTasksByStatus(tasks);

        const { result } = renderHook(() =>
            useUpdateTask(groupedTasks, setTasks)
        );
        const updateTask = result.current;
        act(() => {
            updateTask('firestoreDocumentId123', {
                status: 'assigned',
                assignee: 'ankush',
            });
        });

        expect(setTasks).toHaveBeenCalled();
        expect(setTasks).toHaveBeenLastCalledWith(groupedTasks);
    });

    test('should update an available task with an assignee and status to assigned', async () => {
        const setTasks = jest.fn();
        const groupedTasks = groupTasksByStatus(tasks);

        groupedTasks['available'] = [
            { ...groupedTasks.splice(0, 1), status: 'available' },
        ];

        const { result } = renderHook(() =>
            useUpdateTask(groupedTasks, setTasks)
        );
        const updateTask = result.current;
        act(() => {
            updateTask(groupedTasks['available'][0].id, {
                status: 'assigned',
                assignee: 'ankush',
            });
        });

        groupedTasks['assigned'] = [
            {
                ...groupedTasks['available'][0],
                status: 'assigned',
                assignee: 'ankush',
            },
        ];
        delete groupedTasks['available'];

        expect(setTasks).toHaveBeenCalled();
        expect(setTasks).toHaveBeenLastCalledWith(groupedTasks);
    });
});
