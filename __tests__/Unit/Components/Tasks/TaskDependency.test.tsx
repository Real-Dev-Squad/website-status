import { fireEvent, render, screen } from '@testing-library/react';
import TaskDependency from '../../../../src/components/taskDetails/taskDependency/TaskDependency';
import DependencyList from '@/components/taskDetails/taskDependency/DependencyList';
import { dependency } from '@/app/services/taskDetailsApi';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
// import { renderWithRouter } from '@/test_utils/createMockRouter';
// import { dependsOn } from '__mocks__/db/tasks';
// import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

jest.mock('@/app/services/taskDetailsApi', () => ({
    useGetTasksDependencyDetailsQuery: jest.fn(() => ({
        data: [
            {
                status: 'fulfilled',
                value: { id: '1', title: 'Task 1' },
            },
            {
                status: 'rejected',
                reason: { id: '2' },
            },
        ],
        isLoading: false,
        isFetching: false,
        isError: false,
    })),
}));
describe('DependencyList', () => {
    test.skip('renders loading state', () => {
        const { container } = render(
            <DependencyList taskDependencyIds={['1', '2']} />
        );
        const loadingText = container.querySelector(
            '.task_dependency_list_container'
        )?.textContent;
        expect(loadingText).toMatch(/Loading/i);
    });

    test('renders dependency list', () => {
        const { getByText } = render(
            <DependencyList taskDependencyIds={['1', '2']} />
        );
        const task1Link = getByText('Task 1');
        const errorMessage = getByText(/Unable to fetch this task with ID 2/i);
        expect(task1Link).toBeInTheDocument();
        expect(errorMessage).toBeInTheDocument();
    });
});

describe.skip('TaskDependency', () => {
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
            <Provider store={store}>
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
            </Provider>
        );

        expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    });

    test('renders error state', () => {
        render(
            <Provider store={store}>
                <DependencyList
                    loading={false}
                    fetching={false}
                    error={true}
                    dependencyData={[]}
                    navigateToTask={() => Object}
                />
            </Provider>
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
            />
        );

        expect(screen.getByText(/No Dependencies/i)).toBeInTheDocument();
    });

    test('renders dependency list', () => {
        const mockNavigateToTask = jest.fn();
        render(
            <DependencyList
                loading={false}
                fetching={false}
                error={false}
                dependencyData={dependencyDataMock}
                navigateToTask={mockNavigateToTask}
            />
        );

        const dependencyItems = screen.getAllByRole('listitem');
        expect(dependencyItems).toHaveLength(dependencyDataMock.length);

        dependencyDataMock.forEach((dependency) => {
            const dependencyTitle = screen.getByText(dependency?.value.title);
            expect(dependencyTitle).toBeInTheDocument();
        });
    });
    it('should call navigateToTask with the correct task ID when a dependency is clicked', () => {
        const mockNavigateToTask = jest.fn();

        render(
            <DependencyList
                loading={false}
                fetching={false}
                error={false}
                dependencyData={dependencyDataMock}
                navigateToTask={mockNavigateToTask}
            />
        );

        const dependencyLink = screen.getByText('Dependency 1');
        fireEvent.click(dependencyLink);

        expect(mockNavigateToTask).toHaveBeenCalledWith('dependency-1');
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
    it('should calculate isFulfilled, isRejected, and errorMessage correctly', () => {
        const mockNavigateToTask = jest.fn();
        const dependencyDataMock: dependency = [
            {
                status: 'fulfilled',
                value: {
                    title: 'Dependency 1',
                    id: 'dependency-1',
                },
            },
            {
                status: 'rejected',
                reason: { id: 'dependency-2-error' },
            },
        ];

        render(
            <DependencyList
                loading={false}
                fetching={false}
                error={false}
                dependencyData={dependencyDataMock}
                navigateToTask={mockNavigateToTask}
            />
        );

        const fulfilledDependency = screen.getByText('Dependency 1');
        expect(fulfilledDependency).toBeInTheDocument();

        const rejectedDependency = screen.getByText(
            /Unable to fetch this task with ID dependency-2-error/
        );
        expect(rejectedDependency).toBeInTheDocument();
    });
});
