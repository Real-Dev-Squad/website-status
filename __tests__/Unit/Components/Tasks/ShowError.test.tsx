import React from 'react';
import { render, screen } from '@testing-library/react';
import { ShowError } from '@/components/tasks/card/ShowError';

describe('Error Icon', () => {
    it('should render the error icon', () => {
        render(<ShowError />);
        const errorIcon = screen.getByTestId('error');
        expect(errorIcon).toBeInTheDocument();
    });
});
