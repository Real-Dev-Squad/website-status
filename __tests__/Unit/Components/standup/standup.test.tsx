import { store } from '@/app/store';
import { Provider } from 'react-redux';
import StandUpContainer from '@/components/standup';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithRouter } from '@/test_utils/createMockRouter';

describe('Standup', () => {
    test('renders the missed updates of the user', () => {
        renderWithRouter(
            <Provider store={store()}>
                <StandUpContainer />
            </Provider>
        );
        expect(screen.getByTestId('missed-updates')).toBeInTheDocument();
    });
    test('renders the completed inputField', () => {
        renderWithRouter(
            <Provider store={store()}>
                <StandUpContainer />
            </Provider>
        );
        expect(
            screen.queryByTestId('yesterday-input-update')
        ).toBeInTheDocument();
    });
    test('on intial render completed inputField have empty value', () => {
        renderWithRouter(
            <Provider store={store()}>
                <StandUpContainer />
            </Provider>
        );
        const input = screen.getByTestId('yesterday-input-update');
        expect(input).toHaveValue('');
    });

    test('on  render completed inputField have  value', () => {
        renderWithRouter(
            <Provider store={store()}>
                <StandUpContainer />
            </Provider>
        );
        const input = screen.getByTestId(
            'yesterday-input-update'
        ) as HTMLInputElement;
        fireEvent.change(input, {
            target: { value: 'Working on a backend Go project' },
        });
        const inputValue = input.value;
        expect(inputValue).toBe('Working on a backend Go project');
    });

    test('renders the Today inputField', () => {
        renderWithRouter(
            <Provider store={store()}>
                <StandUpContainer />
            </Provider>
        );
        expect(screen.queryByTestId('today-input-update')).toBeInTheDocument();
    });
    test('on intial render Today inputField have empty value', () => {
        renderWithRouter(
            <Provider store={store()}>
                <StandUpContainer />
            </Provider>
        );
        const input = screen.getByTestId('today-input-update');
        expect(input).toHaveValue('');
    });

    test('on render Today inputField have  value', () => {
        renderWithRouter(
            <Provider store={store()}>
                <StandUpContainer />
            </Provider>
        );
        const input = screen.getByTestId(
            'today-input-update'
        ) as HTMLInputElement;
        fireEvent.change(input, {
            target: { value: 'Implement error handling for API endpoints' },
        });
        const inputValue = input.value;
        expect(inputValue).toBe('Implement error handling for API endpoints');
    });

    test('renders the blocker inputField', () => {
        renderWithRouter(
            <Provider store={store()}>
                <StandUpContainer />
            </Provider>
        );
        expect(
            screen.queryByTestId('blocker-input-update')
        ).toBeInTheDocument();
    });

    test('on intial render Blocker inputField have empty value', () => {
        renderWithRouter(
            <Provider store={store()}>
                <StandUpContainer />
            </Provider>
        );
        const input = screen.getByTestId('blocker-input-update');
        expect(input).toHaveValue('');
    });

    test('on render Blocker inputField have  value', () => {
        renderWithRouter(
            <Provider store={store()}>
                <StandUpContainer />
            </Provider>
        );
        const input = screen.getByTestId(
            'blocker-input-update'
        ) as HTMLInputElement;
        fireEvent.change(input, {
            target: { value: 'Waiting for database access credentials' },
        });
        const inputValue = input.value;
        expect(inputValue).toBe('Waiting for database access credentials');
    });

    test('render if button is enabled', () => {
        renderWithRouter(
            <Provider store={store()}>
                <StandUpContainer />
            </Provider>
        );
        expect(screen.getByText(/Submit/i).closest('button')).toBeEnabled();
    });
});
