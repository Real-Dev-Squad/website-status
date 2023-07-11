import { fireEvent, render } from '@testing-library/react';
import TaskDependency from '../../../../src/components/taskDetails/taskDependency/TaskDependency';

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));
jest.mock('@/app/services/taskDetailsApi', () => ({
    useGetTasksDependencyDetailsQuery: jest.fn(() => ({
        data: [
            {
                status: 'fulfilled',
                value: { id: '1', title: 'Task 1' },
            },
            {
                status: 'rejected',
                reason: { id: '2' },
            },
        ],
        isLoading: false,
        isFetching: false,
        isError: false,
    })),
}));
describe('TaskDependency', () => {
    it('should update editedDependencies state and call handleChange when dependencies change', () => {
        const handleChange = jest.fn();
        const TaskDependencyIds = ['taskId1'];

        const { getByRole } = render(
            <TaskDependency
                isEditing={true}
                updatedDependencies={[]}
                handleChange={handleChange}
                taskDependencyIds={TaskDependencyIds}
            />
        );

        const textarea = getByRole('textbox');
        const event = { target: { value: 'task1, task2, task3' } };
        fireEvent.change(
            textarea,
            event as React.ChangeEvent<HTMLInputElement>
        );

        expect(textarea.innerHTML).toBe('task1,task2,task3');

        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange.mock.calls[0][0].target.value).toBe(
            'task1,task2,task3'
        );
    });
});
