import { fireEvent, waitFor } from '@testing-library/react';
import { renderWithRouter } from '@/test_utils/createMockRouter';
import TaskDependency from '@/components/taskDetails/taskDependency';
import { taskDetailsHandler } from '../../../../__mocks__/handlers/task-details.handler';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { TaskDependencyIds } from '../../../../__mocks__/db/tasks';

const mockNavigateToTask = jest.fn();
describe('TaskDependency', () => {
    const server = setupServer(...taskDetailsHandler);
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());
    it('should update editedDependencies state and call handleChange when dependencies change', () => {
        const handleChange = jest.fn();

        const { getByRole } = renderWithRouter(
            <Provider store={store()}>
                <TaskDependency
                    isEditing={true}
                    updatedDependencies={[]}
                    handleChange={handleChange}
                    taskDependencyIds={TaskDependencyIds}
                />
            </Provider>,
            {
                push: mockNavigateToTask,
            }
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
    it('should render DependencyList when isEditing is false', async () => {
        const { queryByRole, getByTestId } = renderWithRouter(
            <Provider store={store()}>
                <TaskDependency
                    isEditing={false}
                    updatedDependencies={[]}
                    handleChange={jest.fn()}
                    taskDependencyIds={TaskDependencyIds}
                />
            </Provider>,
            {
                push: mockNavigateToTask,
            }
        );

        const textarea = queryByRole('textbox');
        expect(textarea).toBeNull();

        await waitFor(() => {
            const dependencyList = getByTestId('dependency-list');
            expect(dependencyList).toBeInTheDocument();
        });
    });
});
