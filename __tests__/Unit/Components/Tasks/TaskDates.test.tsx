import React from 'react';
import { Provider } from 'react-redux';
import { screen, fireEvent } from '@testing-library/react';
import { TaskDates } from '@/components/taskDetails/TaskDates';
import { store } from '@/app/store';
import { renderWithRouter } from '@/test_utils/createMockRouter';

jest.mock('@/hooks/useUserData', () => {
    return () => ({
        data: {
            roles: {
                admin: true,
                super_user: false,
            },
        },
        isUserAuthorized: true,
        isSuccess: true,
    });
});

const mockHandleEditedTaskDetails = jest.fn();

describe('TaskDates Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render input field for End On date when in editing mode', () => {
        renderWithRouter(
            <Provider store={store()}>
                <TaskDates
                    isEditing={true}
                    startedOn="2024-03-30T11:20:00Z"
                    endsOn={1700000000}
                    setEditedTaskDetails={mockHandleEditedTaskDetails}
                    isExtensionRequestPending={false}
                    taskId="1"
                />
            </Provider>
        );

        const input = screen.getByTestId(
            'endsOnTaskDetails'
        ) as HTMLInputElement;
        fireEvent.change(input, { target: { value: '2024-04-15' } });
        fireEvent.blur(input);
        expect(input.value).toBe('2024-04-15');
    });

    it('should not render input field for End On date when not in editing mode', () => {
        renderWithRouter(
            <Provider store={store()}>
                <TaskDates
                    isEditing={false}
                    startedOn="2024-03-30T11:20:00Z"
                    endsOn={1700000000}
                    setEditedTaskDetails={mockHandleEditedTaskDetails}
                    isExtensionRequestPending={false}
                    taskId="1"
                />
            </Provider>
        );

        const input = screen.queryByTestId('endsOnTaskDetails');
        expect(input).toBeNull();
    });

    it('should display an extension icon, when isExtensionRequestPending is true', () => {
        renderWithRouter(
            <Provider store={store()}>
                <TaskDates
                    isEditing={true}
                    startedOn="2024-03-30T11:20:00Z"
                    endsOn={1700000000}
                    setEditedTaskDetails={mockHandleEditedTaskDetails}
                    isExtensionRequestPending={true}
                    taskId="1"
                />
            </Provider>
        );

        const extensionIcon = screen.getByTestId('extension-request-icon');
        expect(extensionIcon).toBeInTheDocument();
    });

    it('should not update the input value if invalid date is entered', () => {
        renderWithRouter(
            <Provider store={store()}>
                <TaskDates
                    isEditing={true}
                    startedOn="2024-03-30T11:20:00Z"
                    endsOn={null}
                    setEditedTaskDetails={mockHandleEditedTaskDetails}
                    isExtensionRequestPending={false}
                    taskId="1"
                />
            </Provider>
        );

        const input = screen.getByTestId(
            'endsOnTaskDetails'
        ) as HTMLInputElement;
        fireEvent.change(input, { target: { value: 'invalid-date' } });
        fireEvent.blur(input);
        expect(input.value).toBe('');
    });

    it('should render input element correctly with admin role', () => {
        renderWithRouter(
            <Provider store={store()}>
                <TaskDates
                    isEditing={true}
                    startedOn="2024-03-30T11:20:00Z"
                    endsOn={1700000000}
                    setEditedTaskDetails={mockHandleEditedTaskDetails}
                    isExtensionRequestPending={false}
                    taskId="1"
                />
            </Provider>
        );

        const input = screen.getByTestId('endsOnTaskDetails');
        expect(input).toBeInTheDocument();
    });

    it('should render input element correctly with non-admin role', () => {
        jest.mock('@/hooks/useUserData', () => {
            return () => ({
                data: {
                    roles: {
                        admin: false,
                        super_user: true,
                    },
                },
                isUserAuthorized: true,
                isSuccess: true,
            });
        });

        renderWithRouter(
            <Provider store={store()}>
                <TaskDates
                    isEditing={true}
                    startedOn="2024-03-30T11:20:00Z"
                    endsOn={1700000000}
                    setEditedTaskDetails={mockHandleEditedTaskDetails}
                    isExtensionRequestPending={false}
                    taskId="1"
                />
            </Provider>
        );

        const input = screen.getByTestId('endsOnTaskDetails');
        expect(input).toBeInTheDocument();
    });

    it('should render the correct date when endsOn is null', () => {
        renderWithRouter(
            <Provider store={store()}>
                <TaskDates
                    isEditing={true}
                    startedOn="2024-03-30T11:20:00Z"
                    endsOn={null}
                    setEditedTaskDetails={mockHandleEditedTaskDetails}
                    isExtensionRequestPending={false}
                    taskId="1"
                />
            </Provider>
        );

        const input = screen.getByTestId(
            'endsOnTaskDetails'
        ) as HTMLInputElement;
        expect(input.value).toBe('');
    });
});
