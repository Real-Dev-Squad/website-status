import StandUpContainer from '@/components/standup';
import { render, screen } from '@testing-library/react';

const DEFAULT_Props = {
    handleChange: jest.fn(),
    handleFormSubmission: jest.fn(),
    buttonDisable: false,
    yesterdayDate: 'May 5, 2023',
    completed: 'Working on a backend Go project',
    blockers: 'Implement error handling for API endpoints',
    planned: 'Waiting for database access credentials',
};

describe('Standup', () => {
    test('renders the missed updates of the user', () => {
        render(<StandUpContainer {...DEFAULT_Props} />);
        expect(screen.getByTestId('missed-updates')).toBeInTheDocument();
    });
    test('renders the yesterday Update Input', () => {
        render(<StandUpContainer {...DEFAULT_Props} />);
        expect(
            screen.queryByTestId('yesterday-input-update')
        ).toBeInTheDocument();
    });
    test('renders the Today Update Input', () => {
        render(<StandUpContainer {...DEFAULT_Props} />);
        expect(screen.queryByTestId('today-input-update')).toBeInTheDocument();
    });
    test('renders the blocker Input', () => {
        render(<StandUpContainer {...DEFAULT_Props} />);
        expect(
            screen.queryByTestId('blocker-input-update')
        ).toBeInTheDocument();
    });
});
