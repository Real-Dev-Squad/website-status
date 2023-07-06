import { Provider } from 'react-redux';
import { renderWithRouter } from '@/test_utils/createMockRouter';
import { setupServer } from 'msw/node';
import handlers from '../../../../__mocks__/handlers';
import { noTasksFoundHandler } from '../../../../__mocks__/handlers/tasks.handler';
import { store } from '@/app/store';
import { TasksContent } from '@/components/tasks/TasksContent';

const server = setupServer(...handlers);

beforeAll(() => {
    server.listen({ onUnhandledRequest: 'error' });
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('TasksContent', () => {
    const loadingText = 'Loading...';
    const NO_TASKS_FOUND_MESSAGE = 'No Tasks Found';

    it('should render loading state', async () => {
        const { getByText } = renderWithRouter(
            <Provider store={store()}>
                <TasksContent />
            </Provider>
        );

        const loadingElement = getByText(loadingText);
        expect(loadingElement).toBeInTheDocument();
    });

    it('should render tasks list', async () => {
        const { findByText } = renderWithRouter(
            <Provider store={store()}>
                <TasksContent />
            </Provider>
        );
    });

    it('should render "No tasks found" when no tasks are returned', async () => {
        server.use(noTasksFoundHandler);

        const { findByText } = renderWithRouter(
            <Provider store={store()}>
                <TasksContent />
            </Provider>
        );

        const noTasksFoundElement = await findByText(NO_TASKS_FOUND_MESSAGE);
        expect(noTasksFoundElement).toBeInTheDocument();
    });
});
