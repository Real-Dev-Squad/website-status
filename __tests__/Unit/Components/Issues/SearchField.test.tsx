import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SearchField } from '@/components/issues/SearchField';
import { renderWithRouter } from '@/test_utils/createMockRouter';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { act } from 'react-dom/test-utils';
import { useRouter } from 'next/router';
// import userEvent from '@testing-library/user-event';

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

describe('SearchField Component', () => {
    const mockOnSearchTextSubmitted = jest.fn();
    const setup = () => {
        return renderWithRouter(
            <Provider store={store()}>
                <SearchField
                    onSearchTextSubmitted={mockOnSearchTextSubmitted}
                    loading={false}
                />
            </Provider>
        );
    };

    it('renders the SearchField component', () => {
        const { getByPlaceholderText, getByText } = setup();

        const inputElement = getByPlaceholderText(
            'Enter query string to search issues'
        );
        const submitButton = getByText('Submit');

        expect(inputElement).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
    });

    it('handles user input and form submission', async () => {
        const { getByPlaceholderText, getByText } = setup();

        const inputElement = getByPlaceholderText(
            'Enter query string to search issues'
        );
        const submitButton = getByText('Submit');

        fireEvent.change(inputElement, { target: { value: 'example query' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(mockOnSearchTextSubmitted).toHaveBeenCalledWith(
                'example query'
            );
        });
    });
});
