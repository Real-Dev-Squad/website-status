import React from 'react';
import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import Dropdown from '@/components/Dropdown/Dropdown';

describe('tests for Dropdown', () => {
    test('should render dropdown', async () => {
        render(<Dropdown />);
        const dropdown = screen.getByTestId('dropdown');
        const dropdownOption = screen.getByTestId('options');
        const signOut = screen.getByTestId('signout');
        expect(dropdown).toBeInTheDocument();
        expect(dropdownOption).toBeInTheDocument();
        expect(signOut).toBeInTheDocument();
        fireEvent.click(signOut);
    });
});
