import { TasksContent } from '@/components/tasks/TasksContent';
import { setupServer } from 'msw/node';
import handlers from '../../../../__mocks__/handlers';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithRouter } from '@/test_utils/createMockRouter';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { NO_TASKS_FOUND_MESSAGE } from '@/constants/messages';
import { noTasksFoundHandler } from '../../../../__mocks__//handlers/tasks.handler';

const server = setupServer(...handlers);

beforeAll(() => {
    server.listen();
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('tasks content', () => {
    test('renders tabs component', async () => {
        renderWithRouter(
            <Provider store={store()}>
                <TasksContent />
            </Provider>
        );

        expect(screen.getByText(/loading/i)).toBeInTheDocument();
        await screen.findByTestId('tabs');
    });

    test('select tab and set active', async () => {
        renderWithRouter(
            <Provider store={store()}>
                <TasksContent />
            </Provider>
        );
        await screen.findByTestId('tabs');
        const assignedButton = screen.getByRole('button', {
            name: /assigned/i,
        });
        fireEvent.click(assignedButton);
        expect(assignedButton).toHaveClass('active');
        await screen.findByText(NO_TASKS_FOUND_MESSAGE);
        expect(screen.getByText(NO_TASKS_FOUND_MESSAGE)).toBeInTheDocument();
    });

    test('displays "No tasks found" message when there are no tasks', async () => {
        server.use(noTasksFoundHandler);
        const { findByText } = renderWithRouter(
            <Provider store={store()}>
                <TasksContent />
            </Provider>
        );
        const errorMessage = await findByText(NO_TASKS_FOUND_MESSAGE);
        expect(errorMessage).toBeInTheDocument();
    });

    test('display tasks when dev is true', async () => {
        const { findByText } = renderWithRouter(
            <Provider store={store()}>
                <TasksContent />
            </Provider>,
            { query: { dev: 'true' } }
        );
        const task = await findByText(
            'Design and develop an online booking system'
        );
        expect(task).toBeInTheDocument();
    });
    test('display tasks when dev is false', async () => {
        const { findByText } = renderWithRouter(
            <Provider store={store()}>
                <TasksContent />
            </Provider>,
            { query: { dev: 'false' } }
        );
        await screen.findByTestId('tabs');
        const availableButton = screen.getByRole('button', {
            name: /UNASSINGED/i,
        });
        fireEvent.click(availableButton);
        const task = await findByText(
            'Design and develop an online booking system'
        );
        expect(task).toBeInTheDocument();
    });
});
