import { TasksContent } from '@/components/tasks/TasksContent';
import { setupServer } from 'msw/node';
import handlers from '../../../../__mocks__/handlers';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithRouter } from '@/test_utils/createMockRouter';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { NO_TASKS_FOUND_MESSAGE } from '@/constants/messages';
import { noTasksFoundHandler } from '../../../../__mocks__//handlers/tasks.handler';

jest.mock('@/hooks/useIntersection', () => ({
    __esModule: true,
    default: jest.fn(),
}));

const server = setupServer(...handlers);

beforeAll(() => {
    server.listen();
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('tasks content', () => {
    const breakpointToShowSelect = 440;
    const breakpointToShowTabs = breakpointToShowSelect + 450;

    const setWindowInnerWidth = (width: number) => {
        // Change the viewport to 500px.
        global.innerWidth = width;

        // Trigger the window resize event.
        global.dispatchEvent(new Event('resize'));
    };

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

    test('display tasks', async () => {
        const { findByText } = renderWithRouter(
            <Provider store={store()}>
                <TasksContent />
            </Provider>,
            { query: { section: 'available' } }
        );

        const task = await findByText(
            'Design and develop an online booking system'
        );
        expect(task).toBeInTheDocument();
    });

    test('display tasks when dev is true', async () => {
        const { findByText } = renderWithRouter(
            <Provider store={store()}>
                <TasksContent dev={true} />
            </Provider>,
            { query: { section: 'done' } }
        );

        const task = await findByText(
            'Depreciate task status AVAILABLE and COMPLETED'
        );
        expect(task).toBeInTheDocument();
    });

    test('searchButtonHandler when search button is clicked', async () => {
        setWindowInnerWidth(breakpointToShowTabs);
        const mockPushFunction = jest.fn();
        renderWithRouter(
            <Provider store={store()}>
                <TasksContent />
            </Provider>,
            { push: mockPushFunction }
        );

        const searchButton = await screen.findByTestId('search-button');
        searchButton.onclick = () => {
            mockPushFunction({
                query: {
                    q: 'status:all',
                },
            });
        };
        fireEvent.click(searchButton);
        await waitFor(() => {
            expect(mockPushFunction).toHaveBeenCalledTimes(1);
        });
        expect(mockPushFunction).toBeCalledWith({
            query: {
                q: 'status:all',
            },
        });
    });

    test('setInputValue when input value is changed', async () => {
        setWindowInnerWidth(breakpointToShowTabs);
        const mockPushFunction = jest.fn();
        renderWithRouter(
            <Provider store={store()}>
                <TasksContent />
            </Provider>,
            { push: mockPushFunction }
        );
        const searchInput = await screen.findByTestId('search-input');
        fireEvent.change(searchInput, { target: { value: 'test' } });
        expect(searchInput).toHaveValue('test');
    });
});
