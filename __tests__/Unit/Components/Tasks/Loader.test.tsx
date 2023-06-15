import React from 'react';
import { render, screen } from '@testing-library/react';
import { Loader } from '@/components/tasks/card/Loader';

describe('Loader', () => {
    it('renders the loading spinner', () => {
        render(<Loader />);
        const loadingSpinner = screen.getByTestId('loader');
        expect(loadingSpinner).toBeInTheDocument();
    });

    it('render Loading.. text on screen', () => {
        render(<Loader showText={true} />);
        const loadingText = screen.getByTestId('loading');
        expect(loadingText).toBeInTheDocument();
    });
});
