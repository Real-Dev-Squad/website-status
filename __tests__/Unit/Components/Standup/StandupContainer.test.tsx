import StandUpContainer from '@/components/standup';
import { renderWithRouter } from '@/test_utils/createMockRouter';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { screen, waitFor, fireEvent } from '@testing-library/react';
import { setupServer } from 'msw/node';
import standupHandler from '../../../../__mocks__/handlers/standup.handler';
import handlers from '../../../../__mocks__/handlers';
import { ToastContainer } from 'react-toastify';
import { Loader } from '@/components/tasks/card/Loader';

const server = setupServer(...handlers);

describe('StandupContainer', () => {
    beforeAll(() => {
        server.listen();
    });
    afterEach(() => {
        server.resetHandlers();
    });
    afterAll(() => {
        server.close();
    });
    test('should render  standup Form ', async function () {
        server.use(...standupHandler);
        const { container } = renderWithRouter(
            <Provider store={store()}>
                <StandUpContainer />
                <Loader />
            </Provider>
        );

        await waitFor(() => {
            const submitButton = screen.getByRole('button', {
                name: 'Submit',
            });
            const addButton = container.getElementsByClassName('addButton');
            expect(screen.getByText('loading')).toBeInTheDocument();
            expect(screen.getByText('Standup Update')).toBeInTheDocument();
            expect(screen.getByText('Yesterday')).toBeInTheDocument();
            expect(screen.getByTestId('Yesterday0')).toBeInTheDocument();
            expect(screen.getByText('Today')).toBeInTheDocument();
            expect(screen.getByTestId('Today0')).toBeInTheDocument();
            expect(screen.getByText('Blocker')).toBeInTheDocument();
            expect(screen.getByTestId('Blocker0')).toBeInTheDocument();
            expect(submitButton).toBeInTheDocument();
            expect(addButton.length).toBe(3);
        });
    });

    test('should be able to submit the standup form', async () => {
        server.use(...standupHandler);
        const { container } = renderWithRouter(
            <Provider store={store()}>
                <StandUpContainer />
                <ToastContainer />
                <Loader />
            </Provider>,
            {
                asPath: '/standup',
                replace: jest.fn(),
            }
        );
        const addButton = container.getElementsByClassName('addButton');
        const removeButton = container.getElementsByClassName('removeButton');
        const YesterdayInptutField = screen.getByTestId('Yesterday0');
        fireEvent.change(YesterdayInptutField, {
            target: { value: 'Working on a backend Go project' },
        });
        fireEvent.click(addButton[0]);
        const YesterdayInptutFieldsecond = screen.getByTestId('Yesterday1');
        fireEvent.change(YesterdayInptutFieldsecond, {
            target: { value: 'Working on a status site project' },
        });
        fireEvent.click(addButton[0]);
        fireEvent.click(removeButton[0]);
        const todayInputField = screen.getByTestId('Today0');
        fireEvent.change(todayInputField, {
            target: { value: 'Working on a live-site project' },
        });
        fireEvent.click(addButton[1]);
        const TodayInptutFieldsecond = screen.getByTestId('Today1');
        fireEvent.change(TodayInptutFieldsecond, {
            target: { value: 'Working on a member-site project' },
        });
        fireEvent.click(addButton[1]);
        fireEvent.click(removeButton[1]);
        const BlockerInputField = screen.getByTestId('Blocker0');
        fireEvent.change(BlockerInputField, {
            target: { value: 'None' },
        });
        fireEvent.submit(screen.getByRole('form'));
        expect(screen.getByText('loading')).toBeInTheDocument();
        await waitFor(() => {
            expect(
                screen.getByText('User Progress document created successfully.')
            ).toBeInTheDocument();
        });
    });
});
