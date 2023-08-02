import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithRouter } from '@/test_utils/createMockRouter';
import Suggestions from '@/components/tasks/SuggestionBox/Suggestions';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { setupServer } from 'msw/node';

import usersHandler from '../../../../__mocks__/handlers/users.handler';

describe('Suggestions', () => {
    const server = setupServer(...usersHandler);
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());
    const handleAssignment = jest.fn();
    const handleChange = jest.fn();
    const handleClick = jest.fn();
    it('should render loader first and afterwards User not found as no user named Jan exists', async () => {
        renderWithRouter(
            <Provider store={store()}>
                <Suggestions
                    assigneeName="Jan"
                    searchTerm="Jan"
                    showSuggestion={true}
                    handleAssignment={handleAssignment}
                    handleChange={handleChange}
                    handleClick={handleClick}
                />
            </Provider>
        );

        expect(screen.getByTestId('loader')).toBeInTheDocument();

        await waitFor(() =>
            expect(screen.getByTestId('user_not_found')).toBeInTheDocument()
        );
    });

    it('should render loader first and then show the suggestions list', async () => {
        renderWithRouter(
            <Provider store={store()}>
                <Suggestions
                    assigneeName="mu"
                    searchTerm="mu"
                    showSuggestion={true}
                    handleAssignment={handleAssignment}
                    handleChange={handleChange}
                    handleClick={handleClick}
                />
            </Provider>
        );

        expect(screen.getByTestId('loader')).toBeInTheDocument();
        await waitFor(() =>
            expect(screen.getByTestId('suggestions')).toBeInTheDocument()
        );
        expect(screen.getByText('muhammadmusab')).toBeInTheDocument();
        const inputEl = screen.getByRole('button');
        fireEvent.keyDown(inputEl, {
            key: 'Enter',
            code: 'Enter',
            charCode: 13,
        });
        expect(handleChange).toHaveBeenCalled();
    });
    it('handleAsignment should be called', async () => {
        renderWithRouter(
            <Provider store={store()}>
                <Suggestions
                    assigneeName=""
                    searchTerm=""
                    showSuggestion={false}
                    handleAssignment={handleAssignment}
                    handleChange={handleChange}
                    handleClick={handleClick}
                />
            </Provider>
        );
        expect(screen.getByRole('button')).toBeInTheDocument();

        const inputEl = screen.getByRole('button');
        const event = { target: { value: 'ab' } };
        fireEvent.change(inputEl, event as React.ChangeEvent<HTMLInputElement>);

        expect(handleAssignment).toHaveBeenCalledTimes(1);
    });
});
