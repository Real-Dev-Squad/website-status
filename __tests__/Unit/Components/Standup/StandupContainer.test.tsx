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
} from '@/constants/constants';
import { failedPostStandup } from '../../../../__mocks__/handlers/standup.handler';
import { ToastContainer } from 'react-toastify';
import * as SaveProgressHook from '@/app/services/progressesApi';
import { throws } from 'assert';

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
    test('should render completed inputField ', function () {
        renderWithRouter(
            <Provider store={store()}>
                <StandUpContainer />
            </Provider>
        );
        const input = screen.getByTestId(
            'completedInputField'
        ) as HTMLInputElement;
        expect(input).toBeInTheDocument();
        expect(input).toHaveValue('');
        fireEvent.change(input, {
            target: { value: 'Working on a backend Go project' },
        });
        const inputValue = input.value;
        expect(inputValue).toBe('Working on a backend Go project');
    });
    test('should render today input field', () => {
        renderWithRouter(
            <Provider store={store()}>
                <StandUpContainer />
            </Provider>
        );
        const input = screen.getByTestId('todayInputField') as HTMLInputElement;
        expect(input).toBeInTheDocument();
        expect(input).toHaveValue('');
        fireEvent.change(input, {
            target: { value: 'Implement error handling for API endpoints' },
        });
        const inputValue = input.value;
        expect(inputValue).toBe('Implement error handling for API endpoints');
    });
    test('on render Blocker inputField ', () => {
        renderWithRouter(
            <Provider store={store()}>
                <StandUpContainer />
            </Provider>
        );
        const input = screen.getByTestId(
            'blockerInputField'
        ) as HTMLInputElement;
        expect(screen.queryByTestId('blockerInputField')).toBeInTheDocument();
        expect(input).toHaveValue('');
        fireEvent.change(input, {
            target: { value: 'Waiting for database access credentials' },
        });
        const inputValue = input.value;
        expect(inputValue).toBe('Waiting for database access credentials');
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
        const completeInput = screen.getByTestId(
            'completedInputField'
        ) as HTMLInputElement;
        fireEvent.change(completeInput, {
            target: { value: 'Working on a backend Go project' },
        });
        const todaysInput = screen.getByTestId(
            'todayInputField'
        ) as HTMLInputElement;
        fireEvent.change(todaysInput, {
            target: { value: 'Implement error handling for API endpoints' },
        });
        const blockerInput = screen.getByTestId(
            'blockerInputField'
        ) as HTMLInputElement;
        fireEvent.change(blockerInput, {
            target: { value: 'Waiting for database access credentials' },
        });
        expect(screen.getByTestId('button')).not.toBeDisabled();
    });

    test('should Submit form data successfully', async () => {
        const { getByTestId } = renderWithRouter(
            <Provider store={store()}>
                <StandUpContainer />
                <ToastContainer />
            </Provider>
        );
        const completeInput = screen.getByTestId(
            'completedInputField'
        ) as HTMLInputElement;
        fireEvent.change(completeInput, {
            target: { value: 'Working on a backend Go project' },
        });
        const todaysInput = screen.getByTestId(
            'todayInputField'
        ) as HTMLInputElement;
        fireEvent.change(todaysInput, {
            target: { value: 'Implement error handling for API endpoints' },
        });
        const blockerInput = screen.getByTestId(
            'blockerInputField'
        ) as HTMLInputElement;
        fireEvent.change(blockerInput, {
            target: { value: 'Waiting for database access credentials' },
        });
        fireEvent.submit(getByTestId('form'));
        await waitFor(() =>
            expect(
                screen.getByText(STANDUP_SUBMISSION_SUCCESS)
            ).toBeInTheDocument()
        );
    });

    test('should throw error on submitting form data', async () => {
        server.use(failedPostStandup);
        const { getByTestId } = renderWithRouter(
            <Provider store={store()}>
                <StandUpContainer />
                <ToastContainer />
            </Provider>
        );
        const completeInput = screen.getByTestId(
            'completedInputField'
        ) as HTMLInputElement;
        fireEvent.change(completeInput, {
            target: { value: 'Working on a backend Go project' },
        });
        const todaysInput = screen.getByTestId(
            'todayInputField'
        ) as HTMLInputElement;
        fireEvent.change(todaysInput, {
            target: { value: 'Implement error handling for API endpoints' },
        });
        const blockerInput = screen.getByTestId(
            'blockerInputField'
        ) as HTMLInputElement;
        fireEvent.change(blockerInput, {
            target: { value: 'Waiting for database access credentials' },
        });

        fireEvent.submit(getByTestId('form'));

        await waitFor(() => {
            expect(screen.getByText(ERROR_MESSAGE)).toBeInTheDocument();
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

        const { getByTestId } = renderWithRouter(
            <Provider store={store()}>
                <StandUpContainer />
                <ToastContainer />
            </Provider>
        );
        const completeInput = screen.getByTestId(
            'completedInputField'
        ) as HTMLInputElement;
        fireEvent.change(completeInput, {
            target: { value: 'Working on a backend Go project' },
        });
        const todaysInput = screen.getByTestId(
            'todayInputField'
        ) as HTMLInputElement;
        fireEvent.change(todaysInput, {
            target: { value: 'Implement error handling for API endpoints' },
        });
        const blockerInput = screen.getByTestId(
            'blockerInputField'
        ) as HTMLInputElement;
        fireEvent.change(blockerInput, {
            target: { value: 'Waiting for database access credentials' },
        });

        fireEvent.submit(getByTestId('form'));

        await waitFor(() => {
            expect(screen.getByText(ERROR_MESSAGE)).toBeInTheDocument();
        });
    });
});
