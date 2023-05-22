import StandUpContainer from '@/components/standup';
import { render, screen } from '@testing-library/react';

describe('Standup', () => {
    test('renders the missed updates of the user', () => {
        render(<StandUpContainer />);
        expect(screen.getByTestId('missed-updates')).toBeInTheDocument();
    });
    test('renders the yesterday Update Input', () => {
        render(<StandUpContainer />);
        expect(
            screen.queryByTestId('yesterday-input-update')
        ).toBeInTheDocument();
    });
    test('renders the Today Update Input', () => {
        render(<StandUpContainer />);
        expect(screen.queryByTestId('today-input-update')).toBeInTheDocument();
    });
    test('renders the blocker Input', () => {
        render(<StandUpContainer />);
        expect(
            screen.queryByTestId('blocker-input-update')
        ).toBeInTheDocument();
    });
});
