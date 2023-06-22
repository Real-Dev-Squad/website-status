import StandUpContainer from '@/components/standup';
import { renderWithRouter } from '@/test_utils/createMockRouter';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { fireEvent, screen } from '@testing-library/react';

describe('StandupContainer', () => {
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
});
