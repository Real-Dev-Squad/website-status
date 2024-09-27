import { store } from '@/app/store';
import { SearchField } from '@/components/Calendar/UserSearchField';
import { renderWithRouter } from '@/test_utils/createMockRouter';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';
import usersHandler from '../../../../__mocks__/handlers/users.handler';

const server = setupServer(...usersHandler);

describe('SearchField component', () => {
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());
    const mockOnSearchTextSubmitted = jest.fn();

    it('should render empty input and a disabled  button', () => {
        renderWithRouter(
            <Provider store={store()}>
                <SearchField
                    onSearchTextSubmitted={mockOnSearchTextSubmitted}
                    loading={false}
                />
            </Provider>
        );

        const input = screen.getByPlaceholderText('Enter username');
        expect(input).toHaveValue('');
        const button = screen.getByRole('button', { name: 'Submit' });

        expect(input).toBeInTheDocument();
        expect(button).toBeInTheDocument();
        expect(button).toBeDisabled();
    });

    it('should display users suggestions list for valid input and submit button be enabled', async () => {
        renderWithRouter(
            <Provider store={store()}>
                <SearchField
                    onSearchTextSubmitted={mockOnSearchTextSubmitted}
                    loading={false}
                />
            </Provider>
        );

        const input = screen.getByPlaceholderText('Enter username');
        userEvent.type(input, 'muhammadmusab');

        await waitFor(() => expect(input).toHaveValue('muhammadmusab'));

        const listItems = await screen.findAllByRole('listitem');
        expect(listItems[0].innerHTML).toEqual('muhammadmusab');

        const button = screen.getByRole('button', { name: 'Submit' });
        expect(button).toBeEnabled();
    });

    it('should not display user suggestions list for invalid input and button be disabled', async () => {
        renderWithRouter(
            <Provider store={store()}>
                <SearchField
                    onSearchTextSubmitted={mockOnSearchTextSubmitted}
                    loading={false}
                />
            </Provider>
        );

        const input = screen.getByPlaceholderText('Enter username');
        userEvent.type(input, 'abcdxyzhdehd');
        await waitFor(() => expect(input).toHaveValue('abcdxyzhdehd'));

        const listItems = screen.queryAllByRole('listitem');
        expect(listItems.length).toEqual(0);

        const button = screen.getByRole('button', { name: 'Submit' });
        expect(button).toBeDisabled();
    });

    it('should disable the submit button for input with only whitespaces and no user list suggestions be displayed ', async () => {
        renderWithRouter(
            <Provider store={store()}>
                <SearchField
                    onSearchTextSubmitted={mockOnSearchTextSubmitted}
                    loading={false}
                />
            </Provider>
        );

        const input = screen.getByPlaceholderText('Enter username');
        userEvent.type(input, '    ');
        await waitFor(() => expect(input).toHaveValue('    '));

        const button = screen.getByRole('button', { name: 'Submit' });
        expect(button).toBeDisabled();

        const listItems = screen.queryAllByRole('listitem');
        expect(listItems.length).toEqual(0);
    });

    it('should disable the submit button after clearing the input', async () => {
        renderWithRouter(
            <Provider store={store()}>
                <SearchField
                    onSearchTextSubmitted={mockOnSearchTextSubmitted}
                    loading={false}
                />
            </Provider>
        );

        const input = screen.getByPlaceholderText('Enter username');
        const button = screen.getByRole('button', { name: 'Submit' });

        userEvent.type(input, 'muhammadmusab');
        await waitFor(() => expect(input).toHaveValue('muhammadmusab'));

        const listItems = screen.getAllByRole('listitem');
        expect(listItems[0].innerHTML).toEqual('muhammadmusab');
        expect(button).toBeEnabled();

        userEvent.clear(input);
        await waitFor(() => expect(input).toHaveValue(''));
        expect(button).toBeDisabled();
    });

    it('should handle case-insensitive search for a username', async () => {
        renderWithRouter(
            <Provider store={store()}>
                <SearchField
                    onSearchTextSubmitted={mockOnSearchTextSubmitted}
                    loading={false}
                />
            </Provider>
        );

        const input = screen.getByPlaceholderText('Enter username');
        userEvent.type(input, 'MuhaMMadMusab');
        await waitFor(() => expect(input).toHaveValue('MuhaMMadMusab'));

        const listItems = screen.queryAllByRole('listitem');
        expect(listItems.length).toBeGreaterThan(0);
    });

    it('should update input value and enable submit button on clicking a username from suggestions', async () => {
        renderWithRouter(
            <Provider store={store()}>
                <SearchField
                    onSearchTextSubmitted={mockOnSearchTextSubmitted}
                    loading={false}
                />
            </Provider>
        );

        const input = screen.getByPlaceholderText('Enter username');
        userEvent.type(input, 'muh');
        await waitFor(() => expect(input).toHaveValue('muh'));

        const listItem = screen.getByText('muhammadmusab');
        expect(listItem).toBeInTheDocument();
        const button = screen.getByRole('button', { name: 'Submit' });

        userEvent.click(listItem);
        await waitFor(() => expect(input).toHaveValue('muhammadmusab'));
        expect(button).toBeEnabled();
    });

    it('should update suggestions as user types into the input field', async () => {
        renderWithRouter(
            <Provider store={store()}>
                <SearchField
                    onSearchTextSubmitted={mockOnSearchTextSubmitted}
                    loading={false}
                />
            </Provider>
        );

        const input = screen.getByPlaceholderText('Enter username');
        userEvent.type(input, 'mu');
        await waitFor(() => expect(input).toHaveValue('mu'));

        const suggestionsAfterFirstTyping = await screen.findAllByRole(
            'listitem'
        );
        expect(suggestionsAfterFirstTyping.length).toBeGreaterThan(0);

        userEvent.type(input, 'hammad');
        await waitFor(() => expect(input).toHaveValue('muhammad'));

        const suggestionsAfterSecondTyping = await screen.findAllByRole(
            'listitem'
        );
        expect(suggestionsAfterSecondTyping.length).toBeGreaterThan(0);
        expect(suggestionsAfterSecondTyping.length).toBeLessThan(
            suggestionsAfterFirstTyping.length
        );

        userEvent.clear(input);
        await waitFor(() => expect(input).toHaveValue(''));

        const noSuggestions = screen.queryAllByRole('listitem');
        expect(noSuggestions).toHaveLength(0);
    });
});
