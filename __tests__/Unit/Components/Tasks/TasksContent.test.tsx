import { TasksContent } from '@/components/tasks/TasksContent';
import { setupServer } from 'msw/node';
import handlers from '../../../../__mocks__/handlers';
import { fireEvent, screen, within } from '@testing-library/react';
import { renderWithRouter } from '@/test_utils/createMockRouter';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { NO_TASKS_FOUND_MESSAGE } from '@/constants/messages';
import { noTasksFoundHandler } from '../../../../__mocks__//handlers/tasks.handler';
import { TABS } from '@/interfaces/task.type';

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

    test('renders tabs component', async () => {
        setWindowInnerWidth(breakpointToShowTabs);

        renderWithRouter(
            <Provider store={store()}>
                <TasksContent dev={false} />
            </Provider>
        );

        expect(screen.getByText(/loading/i)).toBeInTheDocument();

        await screen.findByTestId('tabs');
    });

    test('select tab and set active', async () => {
        setWindowInnerWidth(breakpointToShowTabs);
        renderWithRouter(
            <Provider store={store()}>
                <TasksContent dev={false} />
            </Provider>,
            {
                query: { section: 'assigned' },
            }
        );
        await screen.findByTestId('tabs');
        const tabsContainer = within(
            screen.getByTestId('status-tabs-container')
        );
        const assignedButton = tabsContainer.getByRole('button', {
            name: /assigned/i,
        });
        expect(assignedButton).toHaveTextContent('ASSIGNED');
        await screen.findByText(NO_TASKS_FOUND_MESSAGE);
        expect(screen.getByText(NO_TASKS_FOUND_MESSAGE)).toBeInTheDocument();
    });

    test('displays "No tasks found" message when there are no tasks', async () => {
        server.use(noTasksFoundHandler);
        const { findByText } = renderWithRouter(
            <Provider store={store()}>
                <TasksContent dev={false} />
            </Provider>
        );
        const errorMessage = await findByText(NO_TASKS_FOUND_MESSAGE);
        expect(errorMessage).toBeInTheDocument();
    });

    test('display tasks', async () => {
        const { findByText } = renderWithRouter(
            <Provider store={store()}>
                <TasksContent dev={false} />
            </Provider>,
            { query: { section: 'available' } }
        );
        await screen.findByTestId('tabs');

        const task = await findByText(
            'Design and develop an online booking system'
        );
        expect(task).toBeInTheDocument();
    });

    test('Selecting a tab pushes into query params', async () => {
        setWindowInnerWidth(breakpointToShowTabs);
        const mockPushFunction = jest.fn();
        renderWithRouter(
            <Provider store={store()}>
                <TasksContent dev={false} />
            </Provider>,
            { push: mockPushFunction }
        );

        await screen.findByTestId('tabs');
        const tabsContainer = within(
            screen.getByTestId('status-tabs-container')
        );
        const inProgressBtn = tabsContainer.getByRole('button', {
            name: /IN PROGRESS/i,
        });
        expect(inProgressBtn).toHaveClass('active');
        const unassignedButton = tabsContainer.getByRole('button', {
            name: /UNASSINGED/i,
        });
        fireEvent.click(unassignedButton);
        expect(mockPushFunction).toBeCalledTimes(1);
        expect(mockPushFunction).toBeCalledWith({
            query: {
                q: 'is:available',
            },
        });
    });

    test('should show status-tabs-container after 450px of screen width', async () => {
        setWindowInnerWidth(breakpointToShowTabs);
        const mockPushFunction = jest.fn();
        renderWithRouter(
            <Provider store={store()}>
                <TasksContent dev={false} />
            </Provider>,
            { push: mockPushFunction }
        );

        await screen.findByTestId('tabs');
        const tabsContainer = screen.getByTestId('status-tabs-container');
        const tabStyles = getComputedStyle(tabsContainer);
        expect(tabStyles.display).toBe('block');
    });

    test('should show status-select-container 450px below status-tabs-container', async () => {
        setWindowInnerWidth(breakpointToShowSelect);
        const mockPushFunction = jest.fn();
        renderWithRouter(
            <Provider store={store()}>
                <TasksContent dev={false} />
            </Provider>,
            { push: mockPushFunction }
        );
        await screen.findByTestId('status-select-container');
        const selectContainer = screen.getByTestId('status-select-container');
        const selectStyles = getComputedStyle(selectContainer);

        expect(selectStyles.display).toBe('block');
    });

    test('Selecting a value from dropdown pushes into query params', async () => {
        setWindowInnerWidth(breakpointToShowSelect);
        const mockPushFunction = jest.fn();
        renderWithRouter(
            <Provider store={store()}>
                <TasksContent dev={false} />
            </Provider>,
            { push: mockPushFunction }
        );

        await screen.findByTestId('status-select-container');
        const selectContainer = screen?.getByTestId(
            'selected-option-container'
        );

        fireEvent.click(selectContainer);
        fireEvent.keyDown(selectContainer, {
            key: 'ArrowDown',
            code: 'ArrowDown',
        });

        fireEvent.keyDown(selectContainer, {
            key: 'Enter',
            code: 'Enter',
        });

        expect(mockPushFunction).toBeCalledTimes(1);
        expect(mockPushFunction).toBeCalledWith({
            query: {
                q: `is:${TABS[1].toLowerCase()}`,
            },
        });
    });

    test('searchButtonHandler when search button is clicked', async () => {
        setWindowInnerWidth(breakpointToShowTabs);
        const mockPushFunction = jest.fn();
        renderWithRouter(
            <Provider store={store()}>
                <TasksContent dev={true} />
            </Provider>,
            { push: mockPushFunction }
        );

        await screen.findByTestId('tabs');
        const searchButton = screen.getByTestId('search-button');
        fireEvent.click(searchButton);
        expect(mockPushFunction).toBeCalledTimes(1);
        expect(mockPushFunction).toBeCalledWith({
            query: {
                q: 'is:in-progress',
            },
        });
    });

    test('setInputValue when input value is changed', async () => {
        setWindowInnerWidth(breakpointToShowTabs);
        const mockPushFunction = jest.fn();
        renderWithRouter(
            <Provider store={store()}>
                <TasksContent dev={true} />
            </Provider>,
            { push: mockPushFunction }
        );

        await screen.findByTestId('tabs');
        const searchInput = screen.getByTestId('search-input');
        fireEvent.change(searchInput, { target: { value: 'test' } });
        expect(searchInput).toHaveValue('test');
    });
});
