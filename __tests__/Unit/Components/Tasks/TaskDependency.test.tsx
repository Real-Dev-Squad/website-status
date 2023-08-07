import { fireEvent, waitFor } from '@testing-library/react';
import { renderWithRouter } from '@/test_utils/createMockRouter';
import TaskDependency from '@/components/taskDetails/taskDependency';
import { taskDetailsHandler } from '../../../../__mocks__/handlers/task-details.handler';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { TaskDependencyIds } from '../../../../__mocks__/db/tasks';

const mockNavigateToTask = jest.fn();
const setEditedTaskDetails = jest.fn();

describe('TaskDependency', () => {
    const server = setupServer(...taskDetailsHandler);
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    it.skip('should update editedDependencies state and call handleChange when dependencies change', () => {
        const mockHandleChange = jest.fn();

        const { getByTestId } = renderWithRouter(
            <Provider store={store()}>
                <TaskDependency
                    isEditing={true}
                    taskDependencyIds={TaskDependencyIds}
                    setEditedTaskDetails={setEditedTaskDetails}
                />
            </Provider>
        );

        const textarea = getByTestId('dependency-textarea');
        const event = { target: { value: 'task1, task2, task3' } };

        fireEvent.change(textarea, event);

        expect(mockHandleChange).toHaveBeenCalledTimes(1);
        expect(mockHandleChange).toHaveBeenCalledWith(event);
    });

    it('should render DependencyList when isEditing is false', async () => {
        const { queryByRole, getByTestId } = renderWithRouter(
            <Provider store={store()}>
                <TaskDependency
                    isEditing={false}
                    taskDependencyIds={TaskDependencyIds}
                    setEditedTaskDetails={setEditedTaskDetails}
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

    it.skip('should select/unselect a task when checkbox is clicked', async () => {
        const { getByText, getByRole } = renderWithRouter(
            <Provider store={store()}>
                <TaskDependency
                    isEditing={true}
                    taskDependencyIds={TaskDependencyIds}
                    setEditedTaskDetails={setEditedTaskDetails}
                />
            </Provider>
        );

        const taskTitle = await waitFor(() =>
            getByText('test 1 for drag and drop')
        );

        const checkbox = getByRole('textbox', {
            name: 'test 1 for drag and drop',
        }) as HTMLInputElement;

        fireEvent.click(checkbox);
        expect(taskTitle).toHaveStyle('text-decoration: line-through;');

        fireEvent.click(checkbox);
        expect(taskTitle).not.toHaveStyle('text-decoration: line-through;');
    });
});
