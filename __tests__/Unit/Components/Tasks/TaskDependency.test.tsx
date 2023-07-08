import { fireEvent, render, screen } from '@testing-library/react';
import TaskDependency from '../../../../src/components/taskDetails/taskDependency/TaskDependency';
import DependencyList from '@/components/taskDetails/taskDependency/DependencyList';
import { dependency } from '@/app/services/taskDetailsApi';
import { dependsOn } from '__mocks__/db/tasks';

describe('TaskDependency', () => {
    const dependencyDataMock: dependency = [
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
            <DependencyList
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
            <DependencyList
                loading={false}
                fetching={false}
                error={false}
                dependencyData={[]}
                navigateToTask={() => Object}
                isEditing={false}
                updatedDependencies={[]}
                handleChange={() => Object}
            />
        );

        expect(screen.getByText(/No dependencies/i)).toBeInTheDocument();
    });

    test('renders dependency list', () => {
        render(
            <DependencyList
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

        dependencyDataMock.forEach((dependency) => {
            const dependencyTitle = screen.getByText(dependency?.value.title);
            console.log('----------d-----', dependencyTitle);
            expect(dependencyTitle).toBeInTheDocument();
        });
    });
    it('should update editedDependencies state and call handleChange when dependencies change', () => {
        const handleChange = jest.fn();

        const { getByRole } = render(
            <TaskDependency
                loading={false}
                fetching={false}
                error={false}
                dependencyData={[]}
                navigateToTask={() => Object}
                isEditing={true}
                updatedDependencies={[]}
                handleChange={handleChange}
            />
        );

        const textarea = getByRole('textbox');
        const event = { target: { value: 'task1, task2, task3' } };
        fireEvent.change(
            textarea,
            event as React.ChangeEvent<HTMLInputElement>
        );

        expect(textarea.value).toBe('task1,task2,task3');

        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange.mock.calls[0][0].target.value).toBe(
            'task1,task2,task3'
        );
    });
});
