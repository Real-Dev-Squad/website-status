import {
    fireEvent,
    getByText,
    render,
    screen,
    waitFor,
} from '@testing-library/react';
import TaskDetails from '@/components/taskDetails';
import TaskContainer from '@/components/taskDetails/TaskContainer';
import task from '@/interfaces/task.type';
import { tasks } from '../../../../__mocks__/db/tasks';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { renderWithRouter } from '@/test_utils/createMockRouter';
import { setupServer } from 'msw/node';
import handlers from '../../../../__mocks__/handlers';
import { isUserAuthorizedContext } from '@/context/isUserAuthorized';

const details = {
    url: 'https://realdevsquad.com/tasks/6KhcLU3yr45dzjQIVm0J/details',
    taskID: '6KhcLU3yr45dzjQIVm0J',
};

const server = setupServer(...handlers);

beforeAll(() => {
    server.listen();
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('TaskDetails Page', () => {
    it('Should render title', async () => {
        const { getByText } = renderWithRouter(
            <Provider store={store()}>
                <TaskDetails url={details.url} taskID={details.taskID} />
            </Provider>
        );
        await waitFor(() => {
            expect(getByText('test 1 for drag and drop')).toBeInTheDocument();
        });
    });

    it('should render update progress button ', async () => {
        const { getByText } = renderWithRouter(
            <Provider store={store()}>
                <TaskDetails url={details.url} taskID={details.taskID} />
            </Provider>
        );
        await waitFor(() => {
            const buttonElement = getByText(/Update Progress/i);
            expect(buttonElement).toBeInTheDocument();
        });
    });

    it('should show edit button when superuser is viewing', async () => {
        const { getByRole } = renderWithRouter(
            <Provider store={store()}>
                <isUserAuthorizedContext.Provider value={true}>
                    <TaskDetails url={details.url} taskID={details.taskID} />
                </isUserAuthorizedContext.Provider>
            </Provider>,
            {}
        );
        await waitFor(() => {
            expect(getByRole('button', { name: 'Edit' })).toBeInTheDocument();
        });
    });
    it('Should render No Description available for a task without description', async () => {
        const { getByText } = renderWithRouter(
            <Provider store={store()}>
                <TaskDetails url={details.url} taskID={details.taskID} />
            </Provider>
        );
        await waitFor(() => {
            expect(getByText('No description available')).toBeInTheDocument();
        });
    });
});

describe('TaskDependency', () => {
    it('should renders task titles', () => {
        render(
            <TaskContainer title="Task DependsOn" hasImg={false}>
                <ol className="task_dependency_list_container">
                    {tasks.map((task) => (
                        <li key={task.id}>{task.title}</li>
                    ))}
                    {tasks.length === 0 && <p>No Dependency</p>}
                </ol>
            </TaskContainer>
        );

        tasks.forEach((task) => {
            const taskElements = screen.queryAllByText(task.title);
            expect(taskElements).toHaveLength(10);
            taskElements.forEach((element) => {
                expect(element).toHaveTextContent(task.title);
            });
        });
    });

    it('should displays "No Dependency" message when task list is empty', () => {
        const emptyTasks: task[] = [];

        render(
            <TaskContainer title="Task DependsOn" hasImg={false}>
                <ol className="task_dependency_list_container">
                    {emptyTasks.map((task) => (
                        <li key={task.id}>{task.title}</li>
                    ))}
                    {emptyTasks.length === 0 && <p>No Dependency</p>}
                </ol>
            </TaskContainer>
        );

        expect(screen.getByText('No Dependency')).toBeInTheDocument();
    });

    it('should navigates to the correct task when clicked', () => {
        const navigateToTask = jest.fn();

        render(
            <TaskContainer title="Task DependsOn" hasImg={false}>
                <ol className="task_dependency_list_container">
                    {tasks.map((task) => (
                        <li
                            key={task.id}
                            onClick={() => navigateToTask(task.id)}
                            data-testid={`task-item-${task.id}`}
                        >
                            {task.title}
                        </li>
                    ))}
                    {tasks.length === 0 && <p>No Dependency</p>}
                </ol>
            </TaskContainer>
        );

        expect(screen.getByText('Task DependsOn')).toBeInTheDocument();
        expect(screen.queryByText('No Dependency')).toBeNull();
        tasks.forEach((task) => {
            const taskElement = screen.getByTestId(`task-item-${task.id}`);
            fireEvent.click(taskElement);
            expect(navigateToTask).toHaveBeenCalledWith(task.id);
        });
    });
});
