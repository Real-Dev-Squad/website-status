import { fireEvent, render } from '@testing-library/react';
import TaskDependency from '../../../../src/components/taskDetails/taskDependency/TaskDependency';
import { taskDetailsHandler } from '../../../../__mocks__/handlers/task-details.handler';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';
import { store } from '@/app/store';

const TaskDependencyIds = ['6KhcLU3yr45dzjQIVm0J', 'taskid-2'];
const mockNavigateToTask = jest.fn();
jest.mock('next/router', () => ({
    useRouter: () => ({
        push: mockNavigateToTask,
    }),
}));
describe('DependencyList', () => {
    const server = setupServer(...taskDetailsHandler);
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());
    it('should update editedDependencies state and call handleChange when dependencies change', () => {
        const handleChange = jest.fn();

        const { getByRole } = render(
            <Provider store={store()}>
                <TaskDependency
                    isEditing={true}
                    updatedDependencies={[]}
                    handleChange={handleChange}
                    taskDependencyIds={TaskDependencyIds}
                />
            </Provider>
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
