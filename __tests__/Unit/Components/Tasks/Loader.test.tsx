import React from 'react';
import { render, screen } from '@testing-library/react';
import { Loader } from '@/components/tasks/card/Loader';

describe('Loader', () => {
    it('should render the loading spinner', () => {
        render(<Loader />);
        const loadingSpinner = screen.getByTestId('loader');
        expect(loadingSpinner).toBeInTheDocument();
    });
});
