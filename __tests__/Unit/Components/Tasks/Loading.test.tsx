import React from 'react';
import { render, screen } from '@testing-library/react';
import Loading from '@/components/tasks/SuggestionBox/Loading';

describe('Loader', () => {
    it('renders the loading spinner', () => {
        render(<Loading />);
        const loadingText = screen.getByTestId('loading');
        expect(loadingText).toBeInTheDocument();
    });
});
