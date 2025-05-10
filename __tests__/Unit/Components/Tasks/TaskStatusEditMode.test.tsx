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
                    setSaveExtensionRequestStatus={jest.fn()}
                />
            </Provider>
        );
        const statusSelect = screen.getByLabelText('Status:');
        expect(statusSelect).toHaveValue('BLOCKED');
    });

    it('change task status from BLOCKED to IN_PROGRESS', async () => {
        const setEditedTaskDetails = jest.fn();
        const mockUpdateTask = jest
            .fn()
            .mockReturnValue(Promise.resolve('SUCCESS'));

        renderWithRouter(
            <Provider store={store()}>
                <TaskStatusEditMode
                    task={BLOCKED_TASK}
                    setEditedTaskDetails={setEditedTaskDetails}
                    setSaveExtensionRequestStatus={jest.fn()}
                />
            </Provider>
        );
        const statusSelect = screen.getByLabelText('Status:');

        expect(statusSelect).toHaveValue('BLOCKED');

        fireEvent.change(statusSelect, { target: { value: 'IN_PROGRESS' } });

        expect(statusSelect).toHaveValue('IN_PROGRESS');

        mockUpdateTask({
            id: '1-BLOCKED',
            task: {
                status: 'IN_PROGRESS',
            },
        });
    });

    it('renders a list of task statuses', () => {
        const mockUpdateTask = jest.fn();
        const setEditedTaskDetails = jest.fn();

        renderWithRouter(
            <Provider store={store()}>
                <TaskStatusEditMode
                    task={BLOCKED_TASK}
                    setEditedTaskDetails={setEditedTaskDetails}
                    setSaveExtensionRequestStatus={jest.fn()}
                />
            </Provider>
        );

        const statusSelect = screen.getByLabelText('Status:');

        const allOptions = Array.from(
            statusSelect.querySelectorAll('option')
        ).map((option) => [option.value, option.textContent]);

        const allTaskStatus = Object.entries(BACKEND_TASK_STATUS)
            .map(([name, status]) => [status, beautifyStatus(name)])
            .filter(
                ([status]) =>
                    status !== BACKEND_TASK_STATUS.COMPLETED &&
                    status !== BACKEND_TASK_STATUS.MERGED &&
                    status !== BACKEND_TASK_STATUS.UN_ASSIGNED &&
                    status !== BACKEND_TASK_STATUS.BACKLOG
            );

        expect(allOptions).toEqual(allTaskStatus);
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
