import { store } from '@/app/store';
import { MONTHS } from '@/constants/calendar';
import UserStatusCalendar from '@/pages/calendar';
import { renderWithRouter } from '@/test_utils/createMockRouter';
import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';
import handlers from '../../../../__mocks__/handlers';

const server = setupServer(...handlers);

beforeAll(() => {
    server.listen({ onUnhandledRequest: 'error' });
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Calendar Page', () => {
    it('renders calendar page with input and button', () => {
        const { getByPlaceholderText, getByRole } = renderWithRouter(
            <Provider store={store()}>
                <UserStatusCalendar />
            </Provider>
        );

        const input = getByPlaceholderText('Enter username');
        const button = getByRole('button', { name: 'Submit' });

        expect(input).toBeInTheDocument();
        expect(button).toBeInTheDocument();
        expect(button).toBeDisabled();
    });

    it('should render calendar when user is selected', async () => {
        const { getByTestId, getByPlaceholderText, getByRole } =
            renderWithRouter(
                <Provider store={store()}>
                    <UserStatusCalendar />
                </Provider>
            );

        const input = getByPlaceholderText('Enter username');
        userEvent.type(input, 'muhammadmusab');
        await waitFor(() => expect(input).toHaveValue('muhammadmusab'));

        const button = getByRole('button', { name: 'Submit' });
        userEvent.click(button);
        await waitFor(() => {
            const calendar = getByTestId('react-calendar');
            expect(calendar).toBeInTheDocument;
        });
    });

    it('displays holiday message on clicking a Sunday', async () => {
        const { getByText, getByRole, getByPlaceholderText, getByTestId } =
            renderWithRouter(
                <Provider store={store()}>
                    <UserStatusCalendar />
                </Provider>
            );

        const input = getByPlaceholderText('Enter username');
        userEvent.type(input, 'muhammadmusab');
        await waitFor(() => expect(input).toHaveValue('muhammadmusab'));

        const button = getByRole('button', { name: 'Submit' });
        userEvent.click(button);
        await waitFor(() => {
            const calendar = getByTestId('react-calendar');
            expect(calendar).toBeInTheDocument;
        });

        userEvent.click(getByRole('button', { name: 'February 18, 2024' }));

        await waitFor(() => {
            expect(
                getByText('18-February-2024 is HOLIDAY(SUNDAY)!')
            ).toBeInTheDocument();
        });
    });

    it('displays appropriate message based on selected date', async () => {
        const { getByText, getByRole, getByPlaceholderText, getByTestId } =
            renderWithRouter(
                <Provider store={store()}>
                    <UserStatusCalendar />
                </Provider>
            );

        const input = getByPlaceholderText('Enter username');
        userEvent.type(input, 'muhammadmusab');
        await waitFor(() => expect(input).toHaveValue('muhammadmusab'));

        const button = getByRole('button', { name: 'Submit' });
        userEvent.click(button);
        await waitFor(() => {
            const calendar = getByTestId('react-calendar');
            expect(calendar).toBeInTheDocument;
        });

        const currentDate = new Date();
        const formattedDate = `${
            MONTHS[currentDate.getMonth()]
        } ${currentDate.getDate()}, ${currentDate.getFullYear()}`;

        userEvent.click(getByRole('button', { name: formattedDate }));

        await waitFor(() => {
            let expectedMessage;
            const fullDate = `${currentDate.getDate()}-${
                MONTHS[currentDate.getMonth()]
            }-${currentDate.getFullYear()}`;
            if (currentDate.getDay() === 0) {
                expectedMessage = `${fullDate} is HOLIDAY(SUNDAY)!`;
            } else {
                expectedMessage = `No user status found for muhammadmusab on ${fullDate}!`;
            }

            expect(getByText(expectedMessage)).toBeInTheDocument();
        });
    });
});
