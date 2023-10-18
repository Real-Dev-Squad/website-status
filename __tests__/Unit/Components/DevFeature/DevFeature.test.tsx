import { screen } from '@testing-library/react';
import DevFeature from '@/components/DevFeature';

import { renderWithRouter } from '@/test_utils/createMockRouter';

describe('DevFeature', () => {
    it('Should not render anything when there is no dev flag', () => {
        renderWithRouter(
            <DevFeature>
                <p>Children</p>
            </DevFeature>
        );

        expect(screen.queryByText('Children')).not.toBeInTheDocument();
    });
    it('Should not render anything when dev=true', () => {
        renderWithRouter(
            <DevFeature>
                <p>Children</p>
            </DevFeature>,
            {
                query: { dev: 'true' },
            }
        );

        expect(screen.queryByText('Children')).toBeInTheDocument();
    });
});
