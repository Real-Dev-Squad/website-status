import { fireEvent, render, screen } from '@testing-library/react';
// import TaskDetails from '@/components/taskDetails';
import TaskContainer from '@/components/taskDetails/TaskContainer';
import task from '@/interfaces/task.type';
import { tasks } from '../../../../__mocks__/db/tasks';
import TaskDependency from '../../../../src/components/taskDetails/TaskDependency';

describe('TaskDependency', () => {
    const dependencyDataMock: (
        | PromiseFulfilledResult<{ title: string | undefined; id: string }>
        | PromiseRejectedResult
    )[] = [
        {
            status: 'fulfilled',
            value: {
                title: 'Dependency 1',
                id: 'dependency-1',
            },
        },
        {
            status: 'fulfilled',
            value: {
                title: 'Dependency 2',
                id: 'dependency-2',
            },
        },
    ];

    test('renders loading state', () => {
        render(
            <TaskDependency
                loading={true}
                fetching={false}
                error={false}
                dependencyData={[]}
                navigateToTask={() => Object}
                isEditing={true}
                updatedDependencies={[]}
                handleChange={() => Object}
            />
        );

        expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    });

    test('renders error state', () => {
        render(
            <TaskDependency
                loading={false}
                fetching={false}
                error={true}
                dependencyData={[]}
                navigateToTask={() => Object}
                isEditing={true}
                updatedDependencies={[]}
                handleChange={() => Object}
            />
        );

        expect(
            screen.getByText(/Unable to fetch dependency tasks/i)
        ).toBeInTheDocument();
    });

    test('renders no dependencies message', () => {
        render(
            <TaskDependency
                loading={false}
                fetching={false}
                error={false}
                dependencyData={[]}
                navigateToTask={() => Object}
                isEditing={true}
                updatedDependencies={[]}
                handleChange={() => Object}
            />
        );

        expect(screen.getByText(/No dependencies/i)).toBeInTheDocument();
    });

    test('renders dependency list', () => {
        render(
            <TaskDependency
                loading={false}
                fetching={false}
                error={false}
                dependencyData={dependencyDataMock}
                navigateToTask={() => Object}
                isEditing={true}
                updatedDependencies={[]}
                handleChange={() => Object}
            />
        );

        const dependencyItems = screen.getAllByRole('listitem');
        expect(dependencyItems).toHaveLength(dependencyDataMock.length);

        dependencyDataMock.forEach((dependency, index) => {
            const dependencyTitle = screen.getByText(dependency.value.title);
            expect(dependencyTitle).toBeInTheDocument();
            // Add additional assertions or navigation logic here
        });
    });
});

// describe.skip('TaskDependency', () => {
//     it('should renders task titles', () => {
//         render(
//             <TaskContainer title="Task DependsOn" hasImg={false}>
//                 <ol className="task_dependency_list_container">
//                     {tasks.map((task) => (
//                         <li key={task.id}>{task.title}</li>
//                     ))}
//                     {tasks.length === 0 && <p>No Dependency</p>}
//                 </ol>
//             </TaskContainer>
//         );

//         tasks.forEach((task) => {
//             const taskElements = screen.queryAllByText(task.title);
//             expect(taskElements).toHaveLength(10);
//             taskElements.forEach((element) => {
//                 expect(element).toHaveTextContent(task.title);
//             });
//         });
//     });

//     it('should displays "No Dependency" message when task list is empty', () => {
//         const emptyTasks: task[] = [];

//         render(
//             <TaskContainer title="Task DependsOn" hasImg={false}>
//                 <ol className="task_dependency_list_container">
//                     {emptyTasks.map((task) => (
//                         <li key={task.id}>{task.title}</li>
//                     ))}
//                     {emptyTasks.length === 0 && <p>No Dependency</p>}
//                 </ol>
//             </TaskContainer>
//         );

//         expect(screen.getByText('No Dependency')).toBeInTheDocument();
//     });

//     it('should navigates to the correct task when clicked', () => {
//         const navigateToTask = jest.fn();

//         render(
//             <TaskContainer title="Task DependsOn" hasImg={false}>
//                 <ol className="task_dependency_list_container">
//                     {tasks.map((task) => (
//                         <li
//                             key={task.id}
//                             onClick={() => navigateToTask(task.id)}
//                             data-testid={`task-item-${task.id}`}
//                         >
//                             {task.title}
//                         </li>
//                     ))}
//                     {tasks.length === 0 && <p>No Dependency</p>}
//                 </ol>
//             </TaskContainer>
//         );

//         expect(screen.getByText('Task DependsOn')).toBeInTheDocument();
//         expect(screen.queryByText('No Dependency')).toBeNull();
//         tasks.forEach((task) => {
//             const taskElement = screen.getByTestId(`task-item-${task.id}`);
//             fireEvent.click(taskElement);
//             expect(navigateToTask).toHaveBeenCalledWith(task.id);
//         });
//     });
// });
