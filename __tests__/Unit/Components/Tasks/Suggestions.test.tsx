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
    const setShowSuggestion = jest.fn();
    it('should return User not found', async () => {
        server.use(...usersHandler);
        renderWithRouter(
            <Provider store={store()}>
                <Suggestions
                    handleAssignment={handleAssignment}
                    handleClick={handleClick}
                    assigneeName="John"
                    showSuggestion={true}
                    setShowSuggestion={setShowSuggestion}
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
                    setShowSuggestion={setShowSuggestion}
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

    describe('Suggestions Keyboard Input Events', () => {
        /**
         * Current users suggestion list for assigneeName="mu"
         * muhammadmusab
         * mukul_singhal
         * munish
         * muralidhar
         * murtazabag
         * muskaanjain713
         * muskanbagrecha
         * musukeshu
         */
        let suggestionComponent: HTMLElement;

        beforeEach(() => {
            server.use(...usersHandler);
            handleClick.mockReset();
            setShowSuggestion.mockReset();
            handleAssignment.mockReset();
            const { container } = renderWithRouter(
                <Provider store={store()}>
                    <Suggestions
                        handleAssignment={handleAssignment}
                        handleClick={handleClick}
                        assigneeName="mu"
                        showSuggestion={true}
                        setShowSuggestion={setShowSuggestion}
                    />
                </Provider>
            );
            suggestionComponent = container;
        });

        async function waitTillSuggestionLoaded() {
            await waitFor(() => {
                expect(screen.getByTestId('loader')).toBeInTheDocument();
            });
            await waitFor(() => {
                expect(screen.getByTestId('suggestions')).toBeInTheDocument();
            });
            expect(screen.getAllByTestId('suggestion').length).toBe(8);
        }

        function checkSelectedUser(username: string) {
            const selectedUser = suggestionComponent.querySelector(
                '.suggestions-selected'
            );
            expect(selectedUser?.textContent).toBe(username);
        }

        function fireKeyDownEvent(
            element: HTMLElement,
            key: 'Enter' | 'Escape' | 'ArrowDown' | 'ArrowUp',
            times = 1
        ) {
            for (let count = 0; count < times; count++) {
                fireEvent.keyDown(element, { key });
            }
        }

        it('should handle Enter key press', async () => {
            await waitTillSuggestionLoaded();
            const input = screen.getByTestId(
                'assignee-input'
            ) as HTMLInputElement;
            fireKeyDownEvent(input, 'Enter');
            expect(handleClick).toBeCalledWith('muhammadmusab');
        });

        it('should handle ArrowDown key press', async () => {
            await waitTillSuggestionLoaded();
            const input = screen.getByTestId('assignee-input');
            fireKeyDownEvent(input, 'ArrowDown');
            checkSelectedUser('mukul_singhal');
            fireKeyDownEvent(input, 'Enter');
            expect(handleClick).toBeCalledWith('mukul_singhal');
        });

        it('should handle ArrowDown key press 10 times', async () => {
            await waitTillSuggestionLoaded();
            const input = screen.getByTestId('assignee-input');

            // Press ARROW_DOWN 10 times, to test if the selection again starts from beginning
            fireKeyDownEvent(input, 'ArrowDown', 10);
            checkSelectedUser('munish');
            fireKeyDownEvent(input, 'Enter');
            expect(handleClick).toBeCalledWith('munish');
        });

        it('should handle ArrowUp key press', async () => {
            await waitTillSuggestionLoaded();
            const input = screen.getByTestId('assignee-input');
            fireKeyDownEvent(input, 'ArrowUp');
            checkSelectedUser('musukeshu');
            fireKeyDownEvent(input, 'Enter');
            expect(handleClick).toBeCalledWith('musukeshu');
        });

        it('should handle ArrowUp key press 10 times', async () => {
            await waitTillSuggestionLoaded();
            const input = screen.getByTestId('assignee-input');

            // Press ARROW_UP 10 times, to test if the selection again starts from beginning
            fireKeyDownEvent(input, 'ArrowUp', 10);
            checkSelectedUser('muskanbagrecha');
            fireKeyDownEvent(input, 'Enter');
            expect(handleClick).toBeCalledWith('muskanbagrecha');
        });

        it('should handle Escape key press', async () => {
            await waitTillSuggestionLoaded();
            const input = screen.getByTestId('assignee-input');
            fireKeyDownEvent(input, 'Escape');
            expect(setShowSuggestion).toBeCalledWith(false);
        });

        it('should handle keyup an keydown', async () => {
            await waitTillSuggestionLoaded();
            const input = screen.getByTestId('assignee-input');
            fireKeyDownEvent(input, 'ArrowUp');
            checkSelectedUser('musukeshu');
            fireKeyDownEvent(input, 'ArrowUp', 2);
            checkSelectedUser('muskaanjain713');
            fireKeyDownEvent(input, 'ArrowUp', 2);
            checkSelectedUser('muralidhar');
            fireKeyDownEvent(input, 'ArrowDown', 2);
            checkSelectedUser('muskaanjain713');
            fireKeyDownEvent(input, 'ArrowDown', 3);
            fireKeyDownEvent(input, 'ArrowUp', 1);
            checkSelectedUser('musukeshu');
            fireKeyDownEvent(input, 'ArrowDown', 30);
            checkSelectedUser('muskaanjain713');
            fireKeyDownEvent(input, 'ArrowUp', 30);
            checkSelectedUser('musukeshu');
            fireKeyDownEvent(input, 'Escape');
            expect(setShowSuggestion).toBeCalledWith(false);
        });
    });

    describe('Suggestions Mouse Events Test', () => {
        /**
         * Current users suggestion list for assigneeName="mu"
         * muskaanjain713
         * muskanbagrecha
         * musukeshu
         */
        let suggestionComponent: HTMLElement;

        beforeEach(() => {
            server.use(...usersHandler);
            handleClick.mockReset();
            setShowSuggestion.mockReset();
            handleAssignment.mockReset();
            const { container } = renderWithRouter(
                <Provider store={store()}>
                    <Suggestions
                        handleAssignment={handleAssignment}
                        handleClick={handleClick}
                        assigneeName="mus"
                        showSuggestion={true}
                        setShowSuggestion={setShowSuggestion}
                    />
                </Provider>
            );
            suggestionComponent = container;
        });

        async function waitTillSuggestionLoaded() {
            await waitFor(() => {
                expect(screen.getByTestId('loader')).toBeInTheDocument();
            });
            await waitFor(() => {
                expect(screen.getByTestId('suggestions')).toBeInTheDocument();
            });
            expect(screen.getAllByTestId('suggestion').length).toBe(3);
        }

        function checkSelectedUser(username: string) {
            const selectedUser = suggestionComponent.querySelector(
                '.suggestions-selected'
            );
            expect(selectedUser?.textContent).toBe(username);
        }

        it('should update selected css on mouse hover on single user', async () => {
            await waitTillSuggestionLoaded();
            const usersList = screen.getAllByTestId('suggestion');
            fireEvent.mouseEnter(usersList[0]);
            checkSelectedUser('muskaanjain713');
        });

        it('should update selected css on mouse hover on multiple users', async () => {
            await waitTillSuggestionLoaded();
            const usersList = screen.getAllByTestId('suggestion');
            fireEvent.mouseEnter(usersList[0]);
            checkSelectedUser('muskaanjain713');
            fireEvent.mouseEnter(usersList[1]);
            checkSelectedUser('muskanbagrecha');
            fireEvent.mouseEnter(usersList[2]);
            checkSelectedUser('musukeshu');
        });

        it('should update selected user on mouse click', async () => {
            await waitTillSuggestionLoaded();
            fireEvent.click(screen.getByText('muskanbagrecha'));
            expect(handleClick).toBeCalledWith('muskanbagrecha');
        });
    });
});
