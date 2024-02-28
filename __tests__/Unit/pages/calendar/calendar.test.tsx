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

    it('displays holiday message clicking on a Sunday', async () => {
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
        currentDate.setDate(1);
        while (currentDate.getDay() !== 0) {
            currentDate.setDate(currentDate.getDate() + 1);
        }
        const formattedSundayDate = `${currentDate.getDate()}-${
            MONTHS[currentDate.getMonth()]
        }-${currentDate.getFullYear()}`;
        const fullDate = `${
            MONTHS[currentDate.getMonth()]
        } ${currentDate.getDate()}, ${currentDate.getFullYear()}`;

        userEvent.click(getByRole('button', { name: fullDate }));

        await waitFor(() => {
            expect(
                getByText(`${formattedSundayDate} is HOLIDAY(SUNDAY)!`)
            ).toBeInTheDocument();
        });
    });
});
