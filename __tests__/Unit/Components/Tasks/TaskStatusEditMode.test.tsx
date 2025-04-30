import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import {
    TaskStatusEditMode,
    beautifyStatus,
} from '@/components/tasks/card/TaskStatusEditMode';
import { TASK } from '../../../../__mocks__/db/tasks';
import { BACKEND_TASK_STATUS } from '@/constants/task-status';
import { renderWithRouter } from '@/test_utils/createMockRouter';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import * as tasksApi from '@/app/services/tasksApi';

const BLOCKED_TASK = {
    ...TASK,
    id: '1-BLOCKED',
    status: 'BLOCKED',
};

describe('TaskStatusEditMode', () => {
    let updateTaskSpy: any;
    beforeEach(() => {
        updateTaskSpy = jest.spyOn(tasksApi, 'useUpdateTaskMutation');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should correctly set default option', () => {
        const setEditedTaskDetails = jest.fn();
        renderWithRouter(
            <Provider store={store()}>
                <TaskStatusEditMode
                    task={BLOCKED_TASK}
                    setEditedTaskDetails={setEditedTaskDetails}
                />
            </Provider>
        );
        const statusSelect = screen.getByLabelText('Status:');

        expect(statusSelect).toHaveValue('BLOCKED');
    });

    it('change task status from BLOCKED to AVAILABLE', async () => {
        const setEditedTaskDetails = jest.fn();
        const mockUpdateTask = jest
            .fn()
            .mockReturnValue(Promise.resolve('SUCCESS'));

        renderWithRouter(
            <Provider store={store()}>
                <TaskStatusEditMode
                    task={BLOCKED_TASK}
                    setEditedTaskDetails={setEditedTaskDetails}
                />
            </Provider>
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
        const setEditedTaskDetails = jest.fn();
        const UN_ASSIGNED_TASK = { ...BLOCKED_TASK, status: 'UN_ASSIGNED' };
        renderWithRouter(
            <Provider store={store()}>
                <TaskStatusEditMode
                    task={UN_ASSIGNED_TASK}
                    setEditedTaskDetails={setEditedTaskDetails}
                />
            </Provider>
        );

        const statusSelect = screen.getByLabelText('Status:');

        expect(statusSelect).toHaveValue('AVAILABLE');
    });

    it('renders a list of task ', () => {
        const mockUpdateTask = jest.fn();
        const setEditedTaskDetails = jest.fn();

        renderWithRouter(
            <Provider store={store()}>
                <TaskStatusEditMode
                    task={BLOCKED_TASK}
                    setEditedTaskDetails={setEditedTaskDetails}
                />
            </Provider>
        );

        const statusSelect = screen.getByLabelText('Status:');

        const allOptions = Array.from(
            statusSelect.querySelectorAll('option')
        ).map((option) => [option.value, option.textContent]);

        const allTaskStatus = Object.entries(BACKEND_TASK_STATUS)
            .map(([name, status]) => [status, beautifyStatus(name)])
            .filter(([status]) => status !== BACKEND_TASK_STATUS.COMPLETED);

        expect(allOptions).toEqual(allTaskStatus);
    });

    it('renders the spinner and error icon when the task update fails', async () => {
        const setEditedTaskDetails = jest.fn();

        updateTaskSpy.mockImplementation(() => [
            jest.fn().mockImplementation(() => {
                return {
                    unwrap: () =>
                        Promise.reject({
                            data: { message: 'Error updating task' },
                        }),
                };
            }),
            { isLoading: false },
        ]);

        renderWithRouter(
            <Provider store={store()}>
                <TaskStatusEditMode
                    task={BLOCKED_TASK}
                    setEditedTaskDetails={setEditedTaskDetails}
                />
            </Provider>,
            {}
        );

        const statusSelect = screen.getByLabelText('Status:');

        expect(statusSelect).toHaveValue('BLOCKED');

        fireEvent.change(statusSelect, { target: { value: 'AVAILABLE' } });

        expect(updateTaskSpy).toHaveBeenCalled();

        await waitFor(
            () => {
                expect(screen.getByTestId('small-spinner')).toBeInTheDocument();
            },
            { timeout: 2000 }
        );

        await waitFor(() => {
            expect(screen.getByTestId('error')).toBeInTheDocument();
        });
    });

    it('shows saved indicator and clears status after successful update', async () => {
        const setEditedTaskDetails = jest.fn();
        jest.useFakeTimers();

        const toastModule = await import('@/helperFunctions/toast');
        const toastSpy = jest.spyOn(toastModule, 'toast');

        updateTaskSpy.mockImplementation(() => [
            jest.fn().mockImplementation(() => {
                return {
                    unwrap: () => Promise.resolve({ status: 'SUCCESS' }),
                };
            }),
            { isLoading: false },
        ]);

        renderWithRouter(
            <Provider store={store()}>
                <TaskStatusEditMode
                    task={BLOCKED_TASK}
                    setEditedTaskDetails={setEditedTaskDetails}
                />
            </Provider>,
            {}
        );

        const statusSelect = screen.getByLabelText('Status:');

        fireEvent.change(statusSelect, { target: { value: 'AVAILABLE' } });

        await waitFor(
            () => {
                expect(screen.getByTestId('small-spinner')).toBeInTheDocument();
            },
            { timeout: 1000 }
        );

        await waitFor(() => {
            expect(screen.getByTestId('checkmark')).toBeInTheDocument();
            expect(toastSpy).toHaveBeenCalledWith(
                'success',
                'Task status updated successfully'
            );
        });

        jest.advanceTimersByTime(3000);

        await waitFor(() => {
            expect(screen.queryByTestId('checkmark')).not.toBeInTheDocument();
        });

        jest.useRealTimers();
    });
});

describe('test beautifyStatus function', () => {
    it('test usage', () => {
        const output = beautifyStatus('IN_PROGRESS');
        expect(output).toEqual('In Progress');
    });

    it('returns DONE when completed is passed ', () => {
        const res = beautifyStatus(BACKEND_TASK_STATUS.COMPLETED);
        expect(res).toEqual('Done');
    });
});
