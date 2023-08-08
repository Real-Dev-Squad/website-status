import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react';
import { renderWithRouter } from '@/test_utils/createMockRouter';
import TaskDependency from '@/components/taskDetails/taskDependency';
import { taskDetailsHandler } from '../../../../__mocks__/handlers/task-details.handler';
import { filterTaskHandler } from '../../../../__mocks__/handlers/tasks.handler';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { TaskDependencyIds } from '../../../../__mocks__/db/tasks';
import { useGetAllTasksQuery } from '@/app/services/tasksApi';

const setEditedTaskDetails = jest.fn();
const mockNavigateToTask = jest.fn();

jest.mock('@/app/services/tasksApi');
const mockedUseGetAllTasksQuery = useGetAllTasksQuery as jest.MockedFunction<
    typeof useGetAllTasksQuery
>;

describe('TaskDependency', () => {
    const server = setupServer(...taskDetailsHandler);
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    it('should update editedDependencies state when dependencies change', () => {
        const { getByTestId } = renderWithRouter(
            <Provider store={store()}>
                <TaskDependency
                    isEditing={true}
                    taskDependencyIds={TaskDependencyIds}
                    setEditedTaskDetails={setEditedTaskDetails}
                />
            </Provider>,
            {
                query: { dev: 'true' },
            }
        );

        const textarea = getByTestId('dependency-textarea');
        const event = { target: { value: 'task1, task2, task3' } };

        fireEvent.change(textarea, event);

        expect(setEditedTaskDetails).toHaveBeenCalledWith(
            expect.objectContaining({
                dependsOn: expect.arrayContaining(['task1', 'task2', 'task3']),
            })
        );
    });

    it('should select/unselect a task when checkbox is clicked', async () => {
        mockedUseGetAllTasksQuery.mockReturnValue({
            data: {
                tasks: [
                    { id: 'task1', title: 'Test Task 1' },
                    { id: 'task2', title: 'Test Task 2' },
                ],
            },
            isLoading: false,
            isError: false,
            refetch: jest.fn(),
        });

        const { getByText, getAllByTestId } = renderWithRouter(
            <Provider store={store()}>
                <TaskDependency
                    taskDependencyIds={TaskDependencyIds}
                    isEditing={true}
                    setEditedTaskDetails={setEditedTaskDetails}
                />
            </Provider>,
            {
                query: { dev: 'true' },
            }
        );

        const taskTitles = await waitFor(() => [
            getByText('Test Task 1'),
            getByText('Test Task 2'),
        ]);

        const checkboxes = getAllByTestId('taskCheckbox');

        fireEvent.click(checkboxes[0]);
        expect(taskTitles[0]).toHaveStyle('textDecoration: "line-through"');

        fireEvent.click(checkboxes[0]);
        expect(taskTitles[0]).not.toHaveStyle('textDecoration: "line-through"');
    });

    it('should render loading state when searching for tasks', async () => {
        server.use(filterTaskHandler);

        const { getByText } = renderWithRouter(
            <Provider store={store()}>
                <TaskDependency
                    taskDependencyIds={TaskDependencyIds}
                    isEditing={true}
                    setEditedTaskDetails={setEditedTaskDetails}
                />
            </Provider>,
            {
                query: { dev: 'true' },
            }
        );

        const loadingText = await waitFor(() => getByText('Loading...'));
        expect(loadingText).toBeInTheDocument();
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
});
