import { render, screen } from '@testing-library/react';

import ProgressHeader from '@/components/ProgressForm/ProgressHeader';

describe('ProgressHeader', () => {
    test('Should render Text in Progress Header component', () => {
        render(<ProgressHeader totalMissedUpdates={10} updateType="Standup" />);
        const missedUpdatesElement = screen.getByText(
            'Let us try to avoid having zero days'
        );
        expect(missedUpdatesElement).toBeInTheDocument();
    });
});
