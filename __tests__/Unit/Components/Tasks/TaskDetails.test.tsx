import {
    fireEvent,
    getByText,
    render,
    screen,
    waitFor,
} from '@testing-library/react';
import TaskDetails, { Button, Textarea } from '@/components/taskDetails';
import TaskContainer from '@/components/taskDetails/TaskContainer';
import task from '@/interfaces/task.type';
import { tasks } from '../../../../__mocks__/db/tasks';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { renderWithRouter } from '@/test_utils/createMockRouter';
import { setupServer } from 'msw/node';
import handlers from '../../../../__mocks__/handlers';
import { ButtonProps, TextAreaProps } from '@/interfaces/taskDetails.type';
const details = {
    url: 'https://realdevsquad.com/tasks/6KhcLU3yr45dzjQIVm0J/details',
    taskID: '6KhcLU3yr45dzjQIVm0J',
};

const server = setupServer(...handlers);

beforeAll(() => {
    server.listen({ onUnhandledRequest: 'bypass' });
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

jest.mock('@/hooks/useUserData', () => {
    return () => ({
        data: {
            roles: {
                admin: true,
                super_user: false,
            },
        },
        isUserAuthorized: true,
        isSuccess: true,
    });
});

describe('TaskDetails Page', () => {
    it('Should render title', async () => {
        const { getByText } = renderWithRouter(
            <Provider store={store()}>
                <TaskDetails taskID={details.taskID} />
            </Provider>
        );
        await waitFor(() => {
            expect(getByText('test 1 for drag and drop')).toBeInTheDocument();
        });
    });

    it('should render update progress button ', async () => {
        const { getByText } = renderWithRouter(
            <Provider store={store()}>
                <TaskDetails taskID={details.taskID} />
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
                <TaskDetails taskID={details.taskID} />
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
                <TaskDetails taskID={details.taskID} />
            </Provider>
        );
        await waitFor(() => {
            expect(getByText('No description available')).toBeInTheDocument();
        });
    });
    // --------------------------------------------------
    it('Renders Task Type', async () => {
        const { getByText } = renderWithRouter(
            <Provider store={store()}>
                <TaskDetails taskID={details.taskID} />
            </Provider>
        );
        await waitFor(() => {
            expect(getByText('feature')).toBeInTheDocument();
        });
    });
    it('Renders Task Priority', async () => {
        const { getByText } = renderWithRouter(
            <Provider store={store()}>
                <TaskDetails taskID={details.taskID} />
            </Provider>
        );
        await waitFor(() => {
            expect(getByText('high')).toBeInTheDocument();
        });
    });
    it('Renders Task Status', async () => {
        const { getByText } = renderWithRouter(
            <Provider store={store()}>
                <TaskDetails taskID={details.taskID} />
            </Provider>
        );
        await waitFor(() => {
            expect(getByText('assigned')).toBeInTheDocument();
        });
    });
    it('Renders Task Link', async () => {
        const { getByText } = renderWithRouter(
            <Provider store={store()}>
                <TaskDetails taskID={details.taskID} />
            </Provider>
        );
        await waitFor(() => {
            expect(getByText('https://www.sampleUrl.com')).toBeInTheDocument();
        });
    });
    // -----------------------------------------------------------------
    it('Renders Task Assignee', async () => {
        const { getByText } = renderWithRouter(
            <Provider store={store()}>
                <TaskDetails taskID={details.taskID} />
            </Provider>
        );
        await waitFor(() => {
            expect(getByText('ankur')).toBeInTheDocument();
        });
    });
    it('Renders Task Reporter', async () => {
        const { getByText } = renderWithRouter(
            <Provider store={store()}>
                <TaskDetails taskID={details.taskID} />
            </Provider>
        );
        await waitFor(() => {
            expect(getByText('Ankush')).toBeInTheDocument();
        });
    });
    it('Renders Task Started-on Date', async () => {
        const { getByText } = renderWithRouter(
            <Provider store={store()}>
                <TaskDetails taskID={details.taskID} />
            </Provider>
        );
        await waitFor(() => {
            expect(getByText('3/30/2021, 5:30:00 AM')).toBeInTheDocument();
        });
    });
    it('Renders Task Ends-on Date', async () => {
        const { getByText } = renderWithRouter(
            <Provider store={store()}>
                <TaskDetails taskID={details.taskID} />
            </Provider>
        );
        await waitFor(() => {
            expect(getByText('4/19/2021, 5:30:10 AM')).toBeInTheDocument();
        });
    });
});

describe('Buttons with functionalities', () => {
    const mockClickHandler = jest.fn();
    const buttonProps: ButtonProps = {
        buttonName: 'Click Me',
        clickHandler: mockClickHandler,
        value: true,
    };

    beforeEach(() => {
        render(<Button {...buttonProps} />);
    });

    test('renders button with correct text', () => {
        const buttonElement = screen.getByRole('button', { name: 'Click Me' });
        expect(buttonElement).toBeInTheDocument();
    });

    test('calls click handler when button is clicked', () => {
        const buttonElement = screen.getByRole('button', { name: 'Click Me' });
        fireEvent.click(buttonElement);
        expect(mockClickHandler).toHaveBeenCalledTimes(1);
        expect(mockClickHandler).toHaveBeenCalledWith(true);
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
