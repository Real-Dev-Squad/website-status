import React from 'react';
import { render, screen } from '@testing-library/react';
import UserNotFound from '@/components/tasks/SuggestionBox/UserNotFound';

describe('UserNotFound', () => {
    it('renders user not found', () => {
        render(<UserNotFound />);
        const userNotFound = screen.getByText('User not found!');
        expect(userNotFound).toBeInTheDocument();
    });
});
