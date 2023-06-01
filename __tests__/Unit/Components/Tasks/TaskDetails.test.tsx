import { fireEvent, render, screen } from '@testing-library/react';
import TaskDetails from '@/components/taskDetails';
import TaskContainer from '@/components/taskDetails/TaskContainer';

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

describe('TaskDependency', () => {
    it('renders task titles', async () => {
        const taskTitle = ['Task 1', 'Task 2'];

        render(
            <TaskContainer title="Task DependsOn" hasImg={false}>
                <ol className="task_dependency_list_container">
                    {taskTitle.map((title, index) => (
                        <li key={index}>{title}</li>
                    ))}
                    {taskTitle.length === 0 && <p>No Dependency</p>}
                </ol>
            </TaskContainer>
        );

        const taskElements = screen.getAllByRole('listitem');
        expect(taskElements).toHaveLength(2);
        expect(taskElements[0]).toHaveTextContent('Task 1');
        expect(taskElements[1]).toHaveTextContent('Task 2');
    });

    it('displays "No Dependency" message when taskTitle is empty', () => {
        const taskTitle: string[] = [];

        render(
            <TaskContainer title="Task DependsOn" hasImg={false}>
                <ol className="task_dependency_list_container">
                    {taskTitle.map((title, index) => (
                        <li key={index}>{title}</li>
                    ))}
                    {taskTitle.length === 0 && <p>No Dependency</p>}
                </ol>
            </TaskContainer>
        );

        expect(screen.getByText('No Dependency')).toBeInTheDocument();
    });

    it('navigates to the correct task when clicked', () => {
        const taskTitle = ['Task 1', 'Task 2', 'Task 3'];
        const id = [1, 2, 3];
        const navigateToTask = jest.fn();

        render(
            <TaskContainer title="Task DependsOn" hasImg={false}>
                <ol className="task_dependency_list_container">
                    {taskTitle.map((title, index) => (
                        <li
                            key={index}
                            onClick={() => navigateToTask(id[index])}
                        >
                            {title}
                        </li>
                    ))}
                    {taskTitle.length === 0 && <p>No Dependency</p>}
                </ol>
            </TaskContainer>
        );

        expect(screen.getByText('Task DependsOn')).toBeInTheDocument();
        expect(screen.queryByText('No Dependency')).toBeNull();
        taskTitle.forEach((title, index) => {
            const taskElement = screen.getByText(title);
            fireEvent.click(taskElement);
            expect(navigateToTask).toHaveBeenCalledWith(id[index]);
        });
    });
});
