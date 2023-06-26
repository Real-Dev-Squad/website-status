import { fireEvent, render, screen } from '@testing-library/react';
import TaskDetails from '@/components/taskDetails';
import { store } from '@/app/store';
import { Provider } from 'react-redux';
import TaskContainer from '@/components/taskDetails/TaskContainer';
import task from '@/interfaces/task.type';
import { tasks } from '../../../../__mocks__/db/tasks';
import { renderWithRouter } from '@/test_utils/createMockRouter';

const urlParams = new URLSearchParams(window.location.search);
const isDevMode = urlParams.get('dev') === 'true';

const details = {
    url: 'https://realdevsquad.com/tasks/6KhcLU3yr45dzjQIVm0J/details',
    taskID: '6KhcLU3yr45dzjQIVm0J',
};

describe.skip('TaskDetails Page', () => {
    test('Loading text rendered when loading', () => {
        render(<TaskDetails url={details.url} taskID={details.taskID} />);
        const loadingElement = screen.getByText(/Loading.../i);
        expect(loadingElement).toBeInTheDocument();
    });
    test('Task title is Editable in Editing mode ', () => {
        render(<TaskDetails url={details.url} taskID={details.taskID} />);

        const titleElement = screen.queryByTestId('task-title');
        expect(titleElement).not.toBeInTheDocument();
    });
    test('Edit button is not rendered when Editing', () => {
        render(<TaskDetails url={details.url} taskID={details.taskID} />);

        const editButtonElement = screen.queryByRole('button', {
            name: 'Edit',
        });
        expect(editButtonElement).not.toBeInTheDocument();
    });
    test('Task Description is Editable in Editing mode', () => {
        render(<TaskDetails url={details.url} taskID={details.taskID} />);

        const descriptionElement = screen.queryByText(
            /No description available/i
        );
        expect(descriptionElement).not.toBeInTheDocument();
    });
});

describe('Update Progress button', () => {
    it('renders the Update Progress button when ?dev=true query parameter is present', () => {
        renderWithRouter(
            <Provider store={store()}>
                <TaskDetails taskID={details.taskID} />
            </Provider>,
            { query: { dev: 'true' } }
        );

        if (isDevMode) {
            const updateProgressButton = screen.getByText('Update Progress');
            expect(updateProgressButton).toBeInTheDocument();
        } else {
            const updateProgressButton = screen.queryByText('Update Progress');
            expect(updateProgressButton).toBeNull();
        }
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
