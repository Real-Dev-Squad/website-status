import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithRouter } from '@/test_utils/createMockRouter';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { setupServer } from 'msw/node';

import usersHandler from '../../../../__mocks__/handlers/users.handler';
import Suggestions from '@/components/tasks/SuggestionBox/Suggestions';

import handlers from '../../../../__mocks__/handlers';
const server = setupServer(...handlers);
describe('Suggestions', () => {
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());
    const handleClick = jest.fn();
    const handleAssignment = jest.fn();
    it('should return User not found', async () => {
        server.use(...usersHandler);
        renderWithRouter(
            <Provider store={store()}>
                <Suggestions
                    handleAssignment={handleAssignment}
                    handleClick={handleClick}
                    assigneeName="John"
                    showSuggestion={true}
                />
            </Provider>
        );
        const input = screen.getByTestId('assignee-input');
        fireEvent.change(input, { target: { value: 'Jan' } });
        expect(handleAssignment).toHaveBeenCalled();
        await waitFor(() => {
            expect(screen.getByTestId('loader')).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(screen.getByTestId('user_not_found')).toBeInTheDocument();
            expect(screen.getByText('User not found!')).toBeInTheDocument();
        });
    });

    it('should return Suggestions List', async () => {
        server.use(...usersHandler);
        renderWithRouter(
            <Provider store={store()}>
                <Suggestions
                    handleAssignment={handleAssignment}
                    handleClick={handleClick}
                    assigneeName="munish"
                    showSuggestion={true}
                />
            </Provider>
        );

        await waitFor(() => {
            expect(screen.getByTestId('loader')).toBeInTheDocument();
        });
        await waitFor(() => {
            expect(screen.getByTestId('suggestions')).toBeInTheDocument();
            expect(screen.getByTestId('suggestion')).toBeInTheDocument();
            expect(screen.getByText('munish')).toBeInTheDocument();
            fireEvent.click(screen.getByText('munish'));
            const image = screen.getByTestId('image');
            expect(image).toBeInTheDocument();
            expect(handleClick).toBeCalled();
        });
    });
});
