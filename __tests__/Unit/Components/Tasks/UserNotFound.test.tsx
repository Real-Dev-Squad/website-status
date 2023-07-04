import React from 'react';
import { render, screen } from '@testing-library/react';
import UserNotFound from '@/components/tasks/SuggestionBox/UserNotFound';

describe('Loader', () => {
    it('renders the loading spinner', () => {
        render(<UserNotFound />);
        const userNotFound = screen.getByText('User not found!');
        expect(userNotFound).toBeInTheDocument();
    });
});
