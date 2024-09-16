import React from 'react';
import { Provider } from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';
import { TaskDates } from '@/components/taskDetails/TaskDates';
import { store } from '@/app/store';

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
    it('should render input field for End On date when in editing mode', () => {
        render(
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
});
