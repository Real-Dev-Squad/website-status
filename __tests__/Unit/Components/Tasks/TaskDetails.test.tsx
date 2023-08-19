import { fireEvent, render, screen, waitFor } from '@testing-library/react';
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
import { ToastContainer } from 'react-toastify';
import * as progressQueries from '@/app/services/progressesApi';
import Details from '@/components/taskDetails/Details';
import { taskRequestErrorHandler } from '../../../../__mocks__/handlers/task-request.handler';
import { taskDetailsHandler } from '../../../../__mocks__/handlers/task-details.handler';

const details = {
    url: 'https://realdevsquad.com/tasks/6KhcLU3yr45dzjQIVm0J/details',
    taskID: '6KhcLU3yr45dzjQIVm0J',
};

const server = setupServer(...handlers);

beforeAll(() => {
    server.listen({
        onUnhandledRequest: 'error',
    });
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
const mockNavigateToUpdateProgressPage = jest.fn();
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

    it('Should render Description available for a task', async () => {
        const { getByText } = renderWithRouter(
            <Provider store={store()}>
                <TaskDetails taskID={details.taskID} />
            </Provider>
        );
        await waitFor(() => {
            expect(
                getByText('This is a sample description')
            ).toBeInTheDocument();
        });
    });
    it('Should render No Description available for a task without description', async () => {
        const { getByText } = renderWithRouter(
            <Provider store={store()}>
                <TaskDetails taskID="6KhcLU3yr45dzjQIVm0k" />
            </Provider>
        );
        await waitFor(() => {
            expect(getByText('No description available')).toBeInTheDocument();
        });
    });
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
    it('Renders Task Link open button', async () => {
        const { getByText } = renderWithRouter(
            <Provider store={store()}>
                <TaskDetails taskID={details.taskID} />
            </Provider>
        );
        await waitFor(() => {
            const gitIcon = screen.getByAltText('Git Icon');
            const openInNewTabIcon = screen.getByAltText(
                'Open In New Tab Icon'
            );
            expect(gitIcon).toBeInTheDocument();
            expect(openInNewTabIcon).toBeInTheDocument();
        });
    });
    it('Test Open Git issue link button', async () => {
        const { getByText } = renderWithRouter(
            <Provider store={store()}>
                <TaskDetails taskID={details.taskID} />
            </Provider>
        );
        await waitFor(() => {
            const button = screen.getByLabelText('Open GitHub Issue');
            // Mock the window.open function
            const originalOpen = window.open;
            const mockOpen = jest.fn();
            window.open = mockOpen;

            // Simulate a click on the Git icon button
            fireEvent.click(button);

            // Check if window.open was called with the correct arguments
            expect(mockOpen).toHaveBeenCalledWith(
                'https://www.sampleGithubUrl.com',
                '_blank'
            );

            // Restore the original window.open function
            window.open = originalOpen;
        });
    });
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
    test('should render "Something went wrong!" when isError is true', async () => {
        renderWithRouter(
            <Provider store={store()}>
                <TaskDetails taskID={''} />
            </Provider>
        );

        const errorElement = await screen.findByText('Something went wrong!');
        expect(errorElement).toBeInTheDocument();
    });
    it('Renders Task Started-on Date', async () => {
        const { getByText } = renderWithRouter(
            <Provider store={store()}>
                <Details
                    detailType={'StartedOn'}
                    value={'3/30/2021, 12:00:00 AM'}
                />
            </Provider>
        );
        await waitFor(() => {
            expect(getByText('3/30/2021, 12:00:00 AM')).toBeInTheDocument();
        });
    });
    it('Renders Task Ends-on Date', async () => {
        const { getByText } = renderWithRouter(
            <Provider store={store()}>
                <Details
                    detailType={'EndsOn'}
                    value={'4/19/2021, 12:00:10 AM'}
                />
            </Provider>
        );
        await waitFor(() => {
            expect(getByText('4/19/2021, 12:00:10 AM')).toBeInTheDocument();
        });
    });

    test('should update taskDetails and editedDetails correctly on input change', async () => {
        renderWithRouter(
            <Provider store={store()}>
                <TaskDetails taskID={details.taskID} />
            </Provider>,
            {}
        );
        await waitFor(() => {
            const editButton = screen.getByRole('button', { name: 'Edit' });
            fireEvent.click(editButton);
        });
        const textareaElement = screen.getByTestId('title-textarea');
        fireEvent.change(textareaElement, {
            target: { name: 'title', value: 'New Title' },
        });
        await waitFor(() => {
            const saveButton = screen.getByRole('button', { name: 'Save' });
            fireEvent.click(saveButton);
        });
        expect(textareaElement).toHaveValue('New Title');
    });
    test('should call onCancel and reset state when clicked', async () => {
        renderWithRouter(
            <Provider store={store()}>
                <TaskDetails taskID={details.taskID} />
            </Provider>,
            {}
        );

        await waitFor(() => {
            const editButton = screen.getByRole('button', { name: 'Edit' });
            fireEvent.click(editButton);
        });

        await waitFor(() => {
            const cancelButton = screen.getByRole('button', { name: 'Cancel' });
            fireEvent.click(cancelButton);
            const editButton = screen.getByRole('button', { name: 'Edit' });
            expect(editButton).toBeInTheDocument();
        });
    });

    test('should call onSave and reset state when clicked', async () => {
        renderWithRouter(
            <Provider store={store()}>
                <TaskDetails taskID={details.taskID} />
            </Provider>,
            {}
        );

        await waitFor(() => {
            const editButton = screen.getByRole('button', { name: 'Edit' });
            fireEvent.click(editButton);
        });

        await waitFor(() => {
            const saveButton = screen.getByRole('button', { name: 'Save' });
            fireEvent.click(saveButton);
            const editButton = screen.getByRole('button', { name: 'Edit' });
            expect(editButton).toBeInTheDocument();
        });
    });

    test('should update the title and description with the new values', async () => {
        server.use(...taskDetailsHandler);

        renderWithRouter(
            <Provider store={store()}>
                <TaskDetails taskID={details.taskID} />
                <ToastContainer />
            </Provider>,
            {}
        );
        await waitFor(() => {
            const editButton = screen.getByRole('button', { name: 'Edit' });
            fireEvent.click(editButton);
        });
        const textareaElement = screen.getByTestId('title-textarea');
        fireEvent.change(textareaElement, {
            target: { name: 'title', value: 'New Title' },
        });
        await waitFor(async () => {
            const saveButton = screen.getByRole('button', { name: 'Save' });
            fireEvent.click(saveButton);
            expect(
                await screen.findByText(/Successfully saved/i)
            ).not.toBeNull();
        });
    });
    test('should not update the title and description with the same values', async () => {
        server.use(...taskDetailsHandler);
        renderWithRouter(
            <Provider store={store()}>
                <TaskDetails taskID={details.taskID} />
                <ToastContainer />
            </Provider>,
            {}
        );
        const editButton = await screen.findByRole('button', { name: 'Edit' });
        fireEvent.click(editButton);
        const textareaElement = await screen.findByTestId('title-textarea');
        fireEvent.change(textareaElement, {
            target: { name: 'title', value: 'test 1 for drag and drop' },
        });
        const saveButton = await screen.findByRole('button', { name: 'Save' });
        fireEvent.click(saveButton);
        expect(screen.queryByText(/Successfully saved/i)).toBeNull();
    });

    test('Should render No task progress', async () => {
        renderWithRouter(
            <Provider store={store()}>
                <TaskDetails taskID={details.taskID} />
            </Provider>,
            {
                query: { dev: 'true' },
            }
        );
        let progressUpdatesSection;
        await waitFor(() => {
            progressUpdatesSection = screen.getByText('Progress Updates');
        });
        expect(progressUpdatesSection).toBeInTheDocument();
        const noProgressText = screen.getByText('No Progress found');
        expect(noProgressText).toBeInTheDocument();
    });

    test('should call progress details query', async () => {
        const spyfn = jest.spyOn(progressQueries, 'useGetProgressDetailsQuery');
        renderWithRouter(
            <Provider store={store()}>
                <TaskDetails taskID={details.taskID} />
            </Provider>,
            {
                query: { dev: 'true' },
            }
        );
        let progressUpdatesSection;
        await waitFor(() => {
            progressUpdatesSection = screen.getByText('Progress Updates');
        });
        expect(progressUpdatesSection).toBeInTheDocument();
        expect(spyfn).toBeCalled();
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

describe('Textarea with functionalities', () => {
    const mockChangeHandler = jest.fn();
    const textareaProps: TextAreaProps = {
        name: 'testTextarea',
        value: 'Initial value',
        onChange: mockChangeHandler,
        testId: 'textarea',
        placeholder: '',
    };

    beforeEach(async () => {
        render(<Textarea {...textareaProps} />);
    });

    test('renders textarea with correct initial value', () => {
        const textareaElement = screen.getByTestId('textarea');
        expect(textareaElement).toBeInTheDocument();
        expect(textareaElement).toHaveValue('Initial value');
    });

    test('calls onChange handler when textarea value is changed', () => {
        const textareaElement = screen.getByTestId('textarea');
        fireEvent.change(textareaElement, { target: { value: 'New value' } });
        expect(mockChangeHandler).toHaveBeenCalledTimes(1);
    });
});

describe('Update Progress button', () => {
    it('renders the Update Progress button when ?dev=true query parameter is present', async () => {
        renderWithRouter(
            <Provider store={store()}>
                <TaskDetails taskID={details.taskID} />
            </Provider>,
            { query: { dev: 'true' }, push: mockNavigateToUpdateProgressPage }
        );

        await waitFor(() => {
            const updateProgressButton = screen.getByTestId(
                'update-progress-button'
            );
            expect(updateProgressButton).toBeInTheDocument();
            fireEvent.click(updateProgressButton);
            expect(mockNavigateToUpdateProgressPage).toHaveBeenLastCalledWith(
                '/progress/6KhcLU3yr45dzjQIVm0J?dev=true'
            );
        });
    });

    it('Should not render the Update Progress button when ?dev=true query parameter is absent', () => {
        renderWithRouter(
            <Provider store={store()}>
                <TaskDetails taskID={details.taskID} />
            </Provider>
        );
        const updateProgressButton = screen.queryByText('Update Progress');
        expect(updateProgressButton).not.toBeInTheDocument();
    });

    it('renders the Request for Task button when ?dev=true query parameter is present', async () => {
        renderWithRouter(
            <Provider store={store()}>
                <TaskDetails taskID={details.taskID} />
            </Provider>,
            { query: { dev: 'true' } }
        );

        await waitFor(() => {
            const requestForTaskButton = screen.getByTestId(
                'request-task-button'
            );
            expect(requestForTaskButton).toBeInTheDocument();
        });
    });

    it('Should not render the Request for Task button when ?dev=true query parameter is absent', () => {
        renderWithRouter(
            <Provider store={store()}>
                <TaskDetails taskID={details.taskID} />
            </Provider>
        );
        const requestForTaskButton = screen.queryByText('Request for Task');
        expect(requestForTaskButton).not.toBeInTheDocument();
    });
});

describe('Task Details > Task Request', () => {
    it('should show task request button when dev is true', async () => {
        renderWithRouter(
            <Provider store={store()}>
                <TaskDetails taskID={details.taskID} />
            </Provider>,
            { query: { dev: 'true' } }
        );

        await waitFor(() => {
            expect(
                screen.queryByRole('button', { name: /request for task/i })
            ).not.toBeNull();
        });
    });

    it('should not show task request button when dev is false', async () => {
        renderWithRouter(
            <Provider store={store()}>
                <TaskDetails taskID={details.taskID} />
            </Provider>
        );

        await waitFor(() => {
            expect(
                screen.queryByRole('button', { name: /request for task/i })
            ).toBeNull();
        });
    });

    it('Success toast should be shown on success', async () => {
        renderWithRouter(
            <Provider store={store()}>
                <TaskDetails taskID={details.taskID} />
                <ToastContainer />
            </Provider>,
            { query: { dev: 'true' } }
        );
        await waitFor(() => {
            expect(
                screen.queryByRole('button', { name: /request for task/i })
            ).not.toBeNull();
        });

        const taskRequestButton = screen.getByRole('button', {
            name: /request for task/i,
        });
        fireEvent.click(taskRequestButton);

        await waitFor(() => {
            screen.getByText(/successfully requested for task/i);
        });
    });

    it('Error toast should be shown on error', async () => {
        server.use(...taskRequestErrorHandler);

        renderWithRouter(
            <Provider store={store()}>
                <TaskDetails taskID={details.taskID} />
                <ToastContainer />
            </Provider>,
            { query: { dev: 'true' } }
        );
        await waitFor(() => {
            screen.getByRole('button', { name: /request for task/i });
        });

        const taskRequestButton = screen.getByRole('button', {
            name: /request for task/i,
        });
        fireEvent.click(taskRequestButton);

        await waitFor(() => {
            expect(screen.queryByText(/taskId not provided/i)).not.toBeNull();
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
