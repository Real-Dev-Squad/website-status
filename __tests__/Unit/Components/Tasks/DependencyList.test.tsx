import { fireEvent, screen, within, waitFor } from '@testing-library/react';
import DependencyList from '@/components/taskDetails/taskDependency/DependencyList';
import { taskDetailsHandler } from '../../../../__mocks__/handlers/task-details.handler';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { TaskDependencyIds } from '../../../../__mocks__/db/tasks';
import { renderWithRouter } from '@/test_utils/createMockRouter';

const mockNavigateToTask = jest.fn();
describe('DependencyList', () => {
    const server = setupServer(...taskDetailsHandler);
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());
    it('should render dependency list', async () => {
        renderWithRouter(
            <Provider store={store()}>
                <DependencyList taskDependencyIds={TaskDependencyIds} />
            </Provider>,
            {
                push: mockNavigateToTask,
            }
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

    it('should render no dependencies message', async () => {
        renderWithRouter(
            <Provider store={store()}>
                <DependencyList taskDependencyIds={[]} />
            </Provider>,
            {
                push: mockNavigateToTask,
            }
        );
        const loading = screen.getByText(/Loading.../i);
        expect(loading).toBeInTheDocument();
        expect(screen.getByText(/Loading/i)).toBeInTheDocument();

        const noDependency = await screen.findByText('No Dependencies');

        expect(noDependency).toBeInTheDocument();
    });
    it('should render elements correctly', async () => {
        renderWithRouter(
            <Provider store={store()}>
                <DependencyList taskDependencyIds={TaskDependencyIds} />
            </Provider>,
            {
                push: mockNavigateToTask,
            }
        );
        const task1Link = await screen.findByRole('link', {
            name: /test 1 for drag and drop/i,
        });
        const taskLinkText = await screen.findByText(
            'test 1 for drag and drop'
        );
        expect(task1Link).toBeInTheDocument();
        expect(taskLinkText).toBeInTheDocument();

        fireEvent.click(taskLinkText);

        expect(mockNavigateToTask).toHaveBeenCalledWith(
            '/tasks/6KhcLU3yr45dzjQIVm0J'
        );
    });

    it('should render error state', async () => {
        renderWithRouter(
            <Provider store={store()}>
                <DependencyList taskDependencyIds={TaskDependencyIds} />
            </Provider>,
            {
                push: mockNavigateToTask,
            }
        );
        await waitFor(async () => {
            const errorContainer = await screen.findByRole('list');
            const errorMessage = within(errorContainer).getByText(
                'Unable to fetch this task with ID taskid-2'
            );
            expect(errorMessage).toBeInTheDocument();
        });
    });
});
