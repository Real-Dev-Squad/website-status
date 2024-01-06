import { render, screen } from '@testing-library/react';

import Spinner from '@/components/reusables/Spinner';

describe('Spinner', function () {
    it('Spinner renders', function () {
        render(<Spinner />);
        const loadigSpinner = screen.getByTestId('loading-spinner');
        expect(loadigSpinner).toBeInTheDocument();
    });
});
