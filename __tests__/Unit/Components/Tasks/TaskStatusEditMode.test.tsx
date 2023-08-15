import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import {
    TaskStatusEditMode,
    beautifyStatus,
} from '@/components/tasks/card/TaskStatusEditMode';
import { TASK } from '../../../../__mocks__/db/tasks';

import { renderWithProviders } from '@/test-utils/renderWithProvider';
import { BACKEND_TASK_STATUS } from '@/constants/task-status';

const BLOCKED_TASK = {
    ...TASK,
    id: '1-BLOCKED',
    status: 'BLOCKED',
};

describe('TaskStatusEditMode', () => {
    const mockUpdateTask = jest.fn();
    const mockUpdateTaskMutation = jest.fn().mockReturnValue(mockUpdateTask);
    jest.mock('@/app/services/tasksApi', () => ({
        useUpdateTaskMutation: mockUpdateTaskMutation,
    }));
    it('should correctly set default option', () => {
        const setEditedTaskDetails = jest.fn();
        renderWithProviders(
            <TaskStatusEditMode
                task={BLOCKED_TASK}
                setEditedTaskDetails={setEditedTaskDetails}
            />
        );
        const statusSelect = screen.getByLabelText('Status:');

        expect(statusSelect).toHaveValue('BLOCKED');
    });

    it('change task status from BLOCKED to AVAILABLE', async () => {
        const setEditedTaskDetails = jest.fn();
        const mockUpdateTask = jest
            .fn()
            .mockReturnValue(Promise.resolve('SUCCESS'));
        renderWithProviders(
            <TaskStatusEditMode
                task={BLOCKED_TASK}
                setEditedTaskDetails={setEditedTaskDetails}
            />
        );
        const statusSelect = screen.getByLabelText('Status:');

        expect(statusSelect).toHaveValue('BLOCKED');

        fireEvent.change(statusSelect, { target: { value: 'AVAILABLE' } });

        expect(statusSelect).toHaveValue('AVAILABLE');

        mockUpdateTask({
            id: '1-BLOCKED',
            task: {
                status: 'AVAILABLE',
            },
        });
    });

    it('task status UN_ASSIGNED is mapped to AVAILABLE', () => {
        const mockUpdateTask = jest.fn();
        const setEditedTaskDetails = jest.fn();
        const UN_ASSIGNED_TASK = { ...BLOCKED_TASK, status: 'UN_ASSIGNED' };
        renderWithProviders(
            <TaskStatusEditMode
                task={UN_ASSIGNED_TASK}
                setEditedTaskDetails={setEditedTaskDetails}
            />
        );

        const statusSelect = screen.getByLabelText('Status:');

        expect(statusSelect).toHaveValue('AVAILABLE');
    });

    it('renders a list of task ', () => {
        const mockUpdateTask = jest.fn();
        const setEditedTaskDetails = jest.fn();
        renderWithProviders(
            <TaskStatusEditMode
                task={BLOCKED_TASK}
                setEditedTaskDetails={setEditedTaskDetails}
            />
        );

        const statusSelect = screen.getByLabelText('Status:');

        const allOptions = Array.from(
            statusSelect.querySelectorAll('option')
        ).map((option) => [option.value, option.textContent]);

        const allTaskStatus = Object.entries(BACKEND_TASK_STATUS).map(
            ([name, status]) => [status, beautifyStatus(name)]
        );

        expect(allOptions).toEqual(allTaskStatus);
    });

    it('renders the spinner when the async code is in pending state', async () => {
        const setEditedTaskDetails = jest.fn();
        renderWithProviders(
            <TaskStatusEditMode
                task={BLOCKED_TASK}
                setEditedTaskDetails={setEditedTaskDetails}
            />
        );

        const statusSelect = screen.getByLabelText('Status:');

        expect(statusSelect).toHaveValue('BLOCKED');

        fireEvent.change(statusSelect, { target: { value: 'AVAILABLE' } });

        await waitFor(
            () => {
                expect(screen.getByTestId('small-spinner')).toBeInTheDocument();
            },
            { timeout: 2000 }
        );
    });
});

describe('test beautifyStatus function', () => {
    it('test usage', () => {
        const output = beautifyStatus('I_N');
        expect(output).toEqual('I N');
    });
});
