import { TasksContent } from '@/components/tasks/TasksContent';
import { setupServer } from 'msw/node';
import handlers from '../../../../__mocks__/handlers';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithRouter } from '@/test_utils/createMockRouter';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { NO_TASKS_FOUND_MESSAGE } from '@/constants/messages';

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
        expect(screen.getByText(NO_TASKS_FOUND_MESSAGE)).toBeInTheDocument();
    });
});
