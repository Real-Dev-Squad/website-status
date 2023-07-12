import StandUpContainer from '@/components/standup';
import { renderWithRouter } from '@/test_utils/createMockRouter';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import handlers from '../../../../__mocks__/handlers';
import {
    ERROR_MESSAGE,
    STANDUP_SUBMISSION_SUCCESS,
    STANDUP_ALREADY_SUBMITTED,
} from '@/constants/constants';
import { failedPostStandup } from '../../../../__mocks__/handlers/standup.handler';
import { ToastContainer } from 'react-toastify';
import * as SaveProgressHook from '@/app/services/progressesApi';
import moment from 'moment';

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
    const yesterdayDate = moment().subtract(1, 'days').format('MMMM DD, YYYY');

    test('should render  inputField ', function () {
        renderWithRouter(
            <Provider store={store()}>
                <StandUpContainer />
            </Provider>
        );

        const completedInputField = screen.getByRole('textbox', {
            name: yesterdayDate,
        }) as HTMLInputElement;
        const todayInputField = screen.getByRole('textbox', {
            name: 'Today',
        }) as HTMLInputElement;
        const blockerInputField = screen.getByRole('textbox', {
            name: 'Blockers',
        }) as HTMLInputElement;

        expect(completedInputField).toBeInTheDocument();
        expect(completedInputField).toHaveValue('');
        expect(todayInputField).toBeInTheDocument();
        expect(todayInputField).toHaveValue('');

        expect(blockerInputField).toHaveValue('');

        fireEvent.change(completedInputField, {
            target: { value: 'Working on a backend Go project' },
        });
        const completedInputValue = completedInputField.value;
        expect(completedInputValue).toBe('Working on a backend Go project');

        fireEvent.change(todayInputField, {
            target: { value: 'Implement error handling for API endpoints' },
        });
        const todayInputValue = todayInputField.value;
        expect(todayInputValue).toBe(
            'Implement error handling for API endpoints'
        );
        fireEvent.change(blockerInputField, {
            target: { value: 'Waiting for database access credentials' },
        });
        const blockerInputValue = blockerInputField.value;
        expect(blockerInputValue).toBe(
            'Waiting for database access credentials'
        );
    });

    test('render if button is disabled', () => {
        renderWithRouter(
            <Provider store={store()}>
                <StandUpContainer />
            </Provider>
        );
        expect(screen.getByText(/Submit/i).closest('button')).toBeDisabled();
    });
    test('render if button is enabled', () => {
        renderWithRouter(
            <Provider store={store()}>
                <StandUpContainer />
            </Provider>
        );
        const completedInputField = screen.getByRole('textbox', {
            name: yesterdayDate,
        }) as HTMLInputElement;
        const todayInputField = screen.getByRole('textbox', {
            name: 'Today',
        }) as HTMLInputElement;
        const blockerInputField = screen.getByRole('textbox', {
            name: 'Blockers',
        }) as HTMLInputElement;
        fireEvent.change(completedInputField, {
            target: { value: 'Working on a backend Go project' },
        });

        fireEvent.change(todayInputField, {
            target: { value: 'Implement error handling for API endpoints' },
        });

        fireEvent.change(blockerInputField, {
            target: { value: 'Waiting for database access credentials' },
        });
        expect(screen.getByRole('button')).not.toBeDisabled();
    });

    test('should keep button disabled if only one field is filled and rest are empty', () => {
        renderWithRouter(
            <Provider store={store()}>
                <StandUpContainer />
            </Provider>
        );
        const completedInputField = screen.getByRole('textbox', {
            name: yesterdayDate,
        }) as HTMLInputElement;
        fireEvent.change(completedInputField, {
            target: { value: 'Working on a backend Go project' },
        });
        expect(screen.getByText(/Submit/i).closest('button')).toBeDisabled();
    });

    test('should Submit form data successfully', async () => {
        const { getByRole } = renderWithRouter(
            <Provider store={store()}>
                <StandUpContainer />
                <ToastContainer />
            </Provider>
        );
        const completedInputField = screen.getByRole('textbox', {
            name: yesterdayDate,
        }) as HTMLInputElement;
        const todayInputField = screen.getByRole('textbox', {
            name: 'Today',
        }) as HTMLInputElement;
        const blockerInputField = screen.getByRole('textbox', {
            name: 'Blockers',
        }) as HTMLInputElement;

        fireEvent.change(completedInputField, {
            target: { value: 'Working on a backend Go project' },
        });

        fireEvent.change(todayInputField, {
            target: { value: 'Implement error handling for API endpoints' },
        });

        fireEvent.change(blockerInputField, {
            target: { value: 'Waiting for database access credentials' },
        });
        fireEvent.submit(getByRole('form'));
        await waitFor(() =>
            expect(
                screen.getByText(STANDUP_SUBMISSION_SUCCESS)
            ).toBeInTheDocument()
        );
    });

    test('should throw error on submitting form data', async () => {
        server.use(failedPostStandup);
        const { getByRole } = renderWithRouter(
            <Provider store={store()}>
                <StandUpContainer />
                <ToastContainer />
            </Provider>
        );
        const completedInputField = screen.getByRole('textbox', {
            name: yesterdayDate,
        }) as HTMLInputElement;
        const todayInputField = screen.getByRole('textbox', {
            name: 'Today',
        }) as HTMLInputElement;
        const blockerInputField = screen.getByRole('textbox', {
            name: 'Blockers',
        }) as HTMLInputElement;

        fireEvent.change(completedInputField, {
            target: { value: 'Working on a backend Go project' },
        });

        fireEvent.change(todayInputField, {
            target: { value: 'Implement error handling for API endpoints' },
        });

        fireEvent.change(blockerInputField, {
            target: { value: 'Waiting for database access credentials' },
        });

        fireEvent.submit(getByRole('form'));

        await waitFor(() => {
            expect(
                screen.getByText(STANDUP_ALREADY_SUBMITTED)
            ).toBeInTheDocument();
        });
    });

    test('should throw error on standup submission fail', async () => {
        jest.spyOn(
            SaveProgressHook,
            'useSaveProgressMutation'
        ).mockImplementation((): ReturnType<
            typeof SaveProgressHook.useSaveProgressMutation
        > => {
            return [
                jest.fn().mockImplementation(() => {
                    throw new Error(ERROR_MESSAGE);
                }),
            ] as unknown as ReturnType<
                typeof SaveProgressHook.useSaveProgressMutation
            >;
        });

        const { getByRole } = renderWithRouter(
            <Provider store={store()}>
                <StandUpContainer />
                <ToastContainer />
            </Provider>
        );
        const completedInputField = screen.getByRole('textbox', {
            name: yesterdayDate,
        }) as HTMLInputElement;
        const todayInputField = screen.getByRole('textbox', {
            name: 'Today',
        }) as HTMLInputElement;
        const blockerInputField = screen.getByRole('textbox', {
            name: 'Blockers',
        }) as HTMLInputElement;

        fireEvent.change(completedInputField, {
            target: { value: 'Working on a backend Go project' },
        });

        fireEvent.change(todayInputField, {
            target: { value: 'Implement error handling for API endpoints' },
        });

        fireEvent.change(blockerInputField, {
            target: { value: 'Waiting for database access credentials' },
        });

        fireEvent.submit(getByRole('form'));

        await waitFor(() => {
            expect(screen.getByText(ERROR_MESSAGE)).toBeInTheDocument();
        });
    });
});
