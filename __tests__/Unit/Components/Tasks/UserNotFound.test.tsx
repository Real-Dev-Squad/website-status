import React from 'react';
import { render, screen } from '@testing-library/react';
import UserNotFound from '@/components/tasks/SuggestionBox/UserNotFound';

describe('Loader', () => {
    it('renders the loading spinner', () => {
        render(<UserNotFound />);
        const userNotFound = screen.getByTestId('user_not_found');
        expect(userNotFound).toBeInTheDocument();
    });
});
