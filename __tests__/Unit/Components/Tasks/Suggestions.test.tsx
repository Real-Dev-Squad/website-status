import React from 'react';
import { fireEvent, screen, waitFor, render } from '@testing-library/react';
import { renderWithRouter } from '@/test_utils/createMockRouter';
import Suggestions from '@/components/tasks/SuggestionBox/Suggestions';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { setupServer } from 'msw/node';

import usersHandler from '../../../../__mocks__/handlers/users.handler';

import handlers from '../../../../__mocks__/handlers';
const server = setupServer(...handlers);
describe('Suggestions', () => {
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());
    const handleChange = jest.fn();
    it('should return User not found', async () => {
        server.use(...usersHandler);
        renderWithRouter(
            <Provider store={store()}>
                <Suggestions handleChange={handleChange} />
            </Provider>
        );
        const input = screen.getByTestId('assignee-input');
        fireEvent.change(input, { target: { value: 'xyz' } });
        await waitFor(() => {
            expect(screen.getByTestId('loader')).toBeInTheDocument();
        });
        await waitFor(() => {
            expect(screen.getByTestId('user_not_found')).toBeInTheDocument();
            expect(screen.getByText('User not found!'));
        });

        screen.debug();
    });

    it('should return Suggestions List', async () => {
        server.use(...usersHandler);
        renderWithRouter(
            <Provider store={store()}>
                <Suggestions handleChange={handleChange} />
            </Provider>
        );
        const input = screen.getByTestId('assignee-input');
        fireEvent.change(input, { target: { value: 'munish' } });
        await waitFor(() => {
            expect(screen.getByTestId('loader')).toBeInTheDocument();
        });
        await waitFor(() => {
            expect(screen.getByTestId('suggestions')).toBeInTheDocument();
            expect(screen.getByTestId('suggestion')).toBeInTheDocument();
            expect(screen.getByText('munish')).toBeInTheDocument();
            fireEvent.click(screen.getByText('munish'));
        });

        screen.debug();
    });
});
