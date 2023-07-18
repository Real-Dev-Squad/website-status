import { TasksContent } from '@/components/tasks/TasksContent';
import { setupServer } from 'msw/node';
import handlers from '../../../../__mocks__/handlers';
import { fireEvent, screen, waitFor } from '@testing-library/react';
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
            </Provider>,
            { query: { selected: 'assigned' } }
        );
        await screen.findByTestId('tabs');
        const assignedButton = screen.getByRole('button', {
            name: /assigned/i,
        });
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

    test('select in_progress Tab by default', async () => {
        renderWithRouter(
            <Provider store={store()}>
                <TasksContent />
            </Provider>
        );
        await screen.findByTestId('tabs');
        const inProgressButton = screen.getByRole('button', {
            name: /IN PROGRESS/i,
        });

        expect(inProgressButton).toBeInTheDocument();
        expect(inProgressButton).toHaveClass('active');
    });

    test('select Tab by query param', async () => {
        renderWithRouter(
            <Provider store={store()}>
                <TasksContent />
            </Provider>,
            {
                query: { dev: 'true', selected: 'ASSIGNED' },
            }
        );
        await screen.findByTestId('tabs');
        const assignedButton = screen.getByRole('button', {
            name: /ASSIGNED/i,
        });

        expect(assignedButton).toBeInTheDocument();
        expect(assignedButton).toHaveClass('active');
    });

    test('display tasks when dev is false', async () => {
        const { findByText } = renderWithRouter(
            <Provider store={store()}>
                <TasksContent />
            </Provider>,
            { query: { dev: 'false', selected: 'available' } }
        );
        await screen.findByTestId('tabs');
        const unassignedButton = screen.getByRole('button', {
            name: /UNASSINGED/i,
        });
        expect(unassignedButton).toHaveClass('active');
        const task = await findByText(
            'Design and develop an online booking system'
        );
        expect(task).toBeInTheDocument();
    });

    test('on click calls router.push', async () => {
        const mockPushFn = jest.fn();
        renderWithRouter(
            <Provider store={store()}>
                <TasksContent />
            </Provider>,
            { push: mockPushFn }
        );

        await waitFor(() => {
            screen.getByTestId('tabs');
        });

        const assignedButton = screen.getByRole('button', {
            name: /ASSIGNED/i,
        });

        fireEvent.click(assignedButton);
        expect(mockPushFn).toBeCalledTimes(1);
        expect(mockPushFn).toBeCalledWith({
            query: {
                selected: 'assigned',
            },
        });
    });
});
