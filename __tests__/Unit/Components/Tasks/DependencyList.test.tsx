import { fireEvent, render, screen } from '@testing-library/react';
import DependencyList from '../../../../src/components/taskDetails/TaskDependency/DependencyList';
import { taskDetailsHandler } from '../../../../__mocks__/handlers/task-details.handler';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';
import { store } from '@/app/store';

const taskDependencyIds = ['6KhcLU3yr45dzjQIVm0J', 'taskid-2'];
const mockNavigateToTask = jest.fn();
jest.mock('next/router', () => ({
    useRouter: () => ({
        push: mockNavigateToTask,
    }),
}));
describe('DependencyList', () => {
    const server = setupServer(...taskDetailsHandler);
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    it('should render loading state', () => {
        render(
            <Provider store={store()}>
                <DependencyList taskDependencyIds={taskDependencyIds} />
            </Provider>
        );

        expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    });

    it('should render dependency list', async () => {
        render(
            <Provider store={store()}>
                <DependencyList taskDependencyIds={taskDependencyIds} />
            </Provider>
        );

        const task1Link = await screen.findByText('test 1 for drag and drop');
        const errorMessage = await screen.findByText(
            'Unable to fetch this task with ID taskid-2'
        );
        const dependencyItems = await screen.findAllByRole('listitem');
        expect(dependencyItems).toHaveLength(2);

        expect(task1Link).toBeInTheDocument();
        expect(errorMessage).toBeInTheDocument();
    });

    it('should render no dependencies message', () => {
        render(
            <Provider store={store()}>
                <DependencyList taskDependencyIds={[]} />
            </Provider>
        );
        const loading = screen.getByText(/Loading.../i);
        expect(loading).toBeInTheDocument();
    });
    it('should render Link and span elements correctly', async () => {
        render(
            <Provider store={store()}>
                <DependencyList taskDependencyIds={taskDependencyIds} />
            </Provider>
        );
        const task1Link = await screen.findByRole('link', {
            name: /test 1 for drag and drop/i,
        });
        const spanElement = await screen.findByText('test 1 for drag and drop');

        expect(task1Link).toBeInTheDocument();
        expect(spanElement).toBeInTheDocument();

        fireEvent.click(spanElement);

        expect(mockNavigateToTask).toHaveBeenCalledWith(
            '/tasks/6KhcLU3yr45dzjQIVm0J'
        );
    });
});
