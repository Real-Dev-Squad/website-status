import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import {
    TaskStatusEditMode,
    beautifyStatus,
} from '@/components/tasks/Card/TaskStatusEditMode';
import { TASK } from '../../../../__mocks__/db/tasks';

import { renderWithProviders } from '@/test-utils/renderWithProvider';
import { BACKEND_TASK_STATUS } from '@/constants/task-status';

const BLOCKED_TASK = {
    ...TASK,
    id: '1-BLOCKED',
    status: 'BLOCKED',
};

describe('TaskStatusEditMode', () => {
    it('should correctly set default option', () => {
        const mockUpdateTask = jest.fn();
        renderWithProviders(
            <TaskStatusEditMode
                task={BLOCKED_TASK}
                updateTask={mockUpdateTask}
            />
        );
        const statusSelect = screen.getByLabelText('Status:');

        expect(statusSelect).toHaveValue('BLOCKED');
    });

    it('change task status from BLOCKED to AVAILABLE', () => {
        const mockUpdateTask = jest.fn();
        renderWithProviders(
            <TaskStatusEditMode
                task={BLOCKED_TASK}
                updateTask={mockUpdateTask}
            />
        );
        const statusSelect = screen.getByLabelText('Status:');

        expect(statusSelect).toHaveValue('BLOCKED');

        fireEvent.change(statusSelect, { target: { value: 'AVAILABLE' } });

        expect(statusSelect).toHaveValue('AVAILABLE');

        expect(mockUpdateTask).toHaveBeenCalledWith('1-BLOCKED', {
            status: 'AVAILABLE',
        });
    });

    it('task status UN_ASSIGNED is mapped to AVAILABLE', () => {
        const mockUpdateTask = jest.fn();
        const UN_ASSIGNED_TASK = { ...BLOCKED_TASK, status: 'UN_ASSIGNED' };
        renderWithProviders(
            <TaskStatusEditMode
                task={UN_ASSIGNED_TASK}
                updateTask={mockUpdateTask}
            />
        );

        const statusSelect = screen.getByLabelText('Status:');

        expect(statusSelect).toHaveValue('AVAILABLE');
    });

    it('renders a list of task ', () => {
        const mockUpdateTask = jest.fn();
        renderWithProviders(
            <TaskStatusEditMode
                task={BLOCKED_TASK}
                updateTask={mockUpdateTask}
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
});

describe('test beautifyStatus function', () => {
    it('test usage', () => {
        const output = beautifyStatus('I_N');
        expect(output).toEqual('I N');
    });
});
