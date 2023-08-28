import React from 'react';
import { render, screen } from '@testing-library/react';
import { SavedCheckmark } from '@/components/tasks/card/SavedCheckmark';

describe('Checkmark', () => {
    it('should render the checkmark', () => {
        render(<SavedCheckmark />);
        const checkmark = screen.getByTestId('checkmark');
        expect(checkmark).toBeInTheDocument();
    });
});
