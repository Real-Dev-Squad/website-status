import React from 'react';
import { render, screen } from '@testing-library/react';
import { Loader } from '@/components/Loaders/Loader';

describe('Loader', () => {
    it('renders the loading spinner', () => {
        render(<Loader />);
        const loadingSpinner = screen.getByTestId('loader');
        expect(loadingSpinner).toBeInTheDocument();
    });
});
