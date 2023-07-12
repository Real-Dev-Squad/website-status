import { render, screen } from '@testing-library/react';
import moment from 'moment';

import ProgressHeader from '@/components/ProgressForm/ProgressHeader';

const currentDate = 'July 13, 2023 ';
const futureDate = 'July 14, 2023 ';
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
        render(<ProgressHeader totalMissedUpdates={10} updateType="Standup" />);
    });
});
