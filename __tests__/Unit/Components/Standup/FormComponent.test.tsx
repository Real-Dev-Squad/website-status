import { store } from '@/app/store';
import FormInputComponent from '@/components/standup/FormInputComponent';
import { renderWithRouter } from '@/test_utils/createMockRouter';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { setupServer } from 'msw/node';
import { failedPostStandup } from '../../../../__mocks__/handlers/standup.handler';
import handlers from '../../../../__mocks__/handlers';

const server = setupServer(...handlers);

describe('FormComponent', () => {
    beforeAll(() => {
        server.listen();
    });
    afterEach(() => {
        server.resetHandlers();
    });
    afterAll(() => {
        server.close();
    });

    test('should be able to submit the standup form', async () => {
        const { container } = renderWithRouter(
            <Provider store={store()}>
                <FormInputComponent
                    setIsFormVisible={() => {
                        true;
                    }}
                />
                <ToastContainer />
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
        await waitFor(() =>
            expect(
                screen.getByText('User Progress document created successfully.')
            ).toBeInTheDocument()
        );
    });
    test('should throw error toaster when form submitted again', async () => {
        server.use(failedPostStandup);
        const { container } = renderWithRouter(
            <Provider store={store()}>
                <FormInputComponent
                    setIsFormVisible={() => {
                        true;
                    }}
                />
                <ToastContainer />
            </Provider>,
            {
                asPath: '/standup',
                replace: jest.fn(),
            }
        );
        const addButton = container.getElementsByClassName('addButton');
        const YesterdayInptutField = screen.getByTestId('Yesterday0');
        fireEvent.change(YesterdayInptutField, {
            target: { value: 'Working on a backend Go project' },
        });
        fireEvent.click(addButton[0]);
        const YesterdayInptutFieldsecond = screen.getByTestId('Yesterday1');
        fireEvent.change(YesterdayInptutFieldsecond, {
            target: { value: 'Working on a status site project' },
        });
        const todayInputField = screen.getByTestId('Today0');
        fireEvent.change(todayInputField, {
            target: { value: 'Working on a live-site project' },
        });
        fireEvent.click(addButton[1]);
        const TodayInptutFieldsecond = screen.getByTestId('Today1');
        fireEvent.change(TodayInptutFieldsecond, {
            target: { value: 'Working on a member-site project' },
        });
        const BlockerInputField = screen.getByTestId('Blocker0');
        fireEvent.change(BlockerInputField, {
            target: { value: 'None' },
        });
        fireEvent.submit(screen.getByRole('form'));
        await waitFor(() =>
            expect(
                screen.getByText(
                    'User Progress for the day has already been created.'
                )
            ).toBeInTheDocument()
        );
    });
});
