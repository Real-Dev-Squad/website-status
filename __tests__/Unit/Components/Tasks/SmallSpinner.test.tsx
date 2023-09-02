import React from 'react';
import { render, screen } from '@testing-library/react';
import { SmallSpinner } from '@/components/tasks/card/SmallSpinner';

describe('SmallSpinner', () => {
    it('should render the small spinner', () => {
        render(<SmallSpinner />);
        const loadingSpinner = screen.getByTestId('small-spinner');
        expect(loadingSpinner).toBeInTheDocument();
    });
});
