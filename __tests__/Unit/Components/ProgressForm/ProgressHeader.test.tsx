import { render, screen } from '@testing-library/react';

import ProgressHeader from '@/components/ProgressForm/ProgressHeader';

describe('ProgressHeader', () => {
    test('Should render Text in Progress Header component', () => {
        render(<ProgressHeader totalMissedUpdates={10} updateType="Standup" />);
        const missedUpdatesElement = screen.getByText(
            // eslint-disable-next-line quotes
            "Let's try to avoid having zero days"
        );
        expect(missedUpdatesElement).toBeInTheDocument();
    });

    test('Should render Standup Date and time', () => {
        jest.useFakeTimers().setSystemTime(new Date('17 July 2023'));
        render(<ProgressHeader totalMissedUpdates={10} updateType="Standup" />);
        expect(screen.getByTestId('standupTime')).toBeInTheDocument();
        expect(screen.getByTestId('currentStandupTime')).toBeInTheDocument();
    });
});
