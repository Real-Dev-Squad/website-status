import TaskDropDown from '@/components/tasks/TaskDropDown';
import TaskDropDownModel from '@/components/tasks/TaskDropDownModel';
import { MSG_ON_0_PROGRESS, MSG_ON_100_PROGRESS } from '@/constants/constants';
import { BACKEND_TASK_STATUS } from '@/constants/task-status';
import { fireEvent, render, screen } from '@testing-library/react';

const onChange = jest.fn();

describe('TaskDropDown', () => {
    beforeEach(() => {
        onChange.mockReset();
    });
    it('should display model informing user that proceeding further will make progress 100%, on task status change from in progress to needs review', () => {
        const oldProgress = 80;
        const oldStatus = BACKEND_TASK_STATUS.IN_PROGRESS;

        render(
            <TaskDropDown
                isDevMode={true}
                oldProgress={oldProgress}
                oldStatus={oldStatus}
                onChange={onChange}
            />
        );

        const msg = `The progress of current task is ${oldProgress}%. ${MSG_ON_100_PROGRESS}`;
        fireEvent.change(screen.getByTestId('task-status'), {
            target: { value: BACKEND_TASK_STATUS.NEEDS_REVIEW },
        });

        const msgTag = screen.getByTestId('msg');
        expect(msgTag).toBeInTheDocument();
        expect(msgTag).toHaveTextContent(msg);
    });
    it('should display model informing user that proceeding further will make progress 0%, on task status change from needs review to in progress', () => {
        const oldProgress = 100;
        const oldStatus = BACKEND_TASK_STATUS.NEEDS_REVIEW;

        render(
            <TaskDropDown
                isDevMode={true}
                oldProgress={oldProgress}
                oldStatus={oldStatus}
                onChange={onChange}
            />
        );

        const msg = `The progress of current task is ${oldProgress}%. ${MSG_ON_0_PROGRESS}`;
        fireEvent.change(screen.getByTestId('task-status'), {
            target: { value: BACKEND_TASK_STATUS.IN_PROGRESS },
        });

        const msgTag = screen.getByTestId('msg');
        expect(msgTag).toBeInTheDocument();
        expect(msgTag).toHaveTextContent(msg);
    });
    it('should send changed status and progress if user click the proceed button of the model, on task status change from needs review to in progress', () => {
        const oldProgress = 100;
        const oldStatus = BACKEND_TASK_STATUS.NEEDS_REVIEW;

        render(
            <TaskDropDown
                isDevMode={true}
                oldProgress={oldProgress}
                oldStatus={oldStatus}
                onChange={onChange}
            />
        );

        fireEvent.change(screen.getByTestId('task-status'), {
            target: { value: BACKEND_TASK_STATUS.IN_PROGRESS },
        });
        fireEvent.click(screen.getByTestId('proceed'));
        expect(onChange).toHaveBeenCalledWith({
            newStatus: BACKEND_TASK_STATUS.IN_PROGRESS,
            newProgress: 0,
        });
        expect(onChange).toHaveBeenCalledTimes(1);
    });
    it('should send reset status and progress if user click the cancel button of the model, on task status change from needs review to in progress', () => {
        const oldProgress = 100;
        const oldStatus = BACKEND_TASK_STATUS.NEEDS_REVIEW;

        render(
            <TaskDropDown
                isDevMode={true}
                oldProgress={oldProgress}
                oldStatus={oldStatus}
                onChange={onChange}
            />
        );

        fireEvent.change(screen.getByTestId('task-status'), {
            target: { value: BACKEND_TASK_STATUS.IN_PROGRESS },
        });
        fireEvent.click(screen.getByTestId('cancel'));
        expect(onChange).toHaveBeenCalledTimes(0);
        expect(screen.getByTestId('task-status')).toHaveValue(oldStatus);
    });
    it('should not show any model info on change of status from in progress to backlog', () => {
        const oldProgress = 80;
        const oldStatus = BACKEND_TASK_STATUS.IN_PROGRESS;

        render(
            <TaskDropDown
                isDevMode={true}
                oldProgress={oldProgress}
                oldStatus={oldStatus}
                onChange={onChange}
            />
        );

        fireEvent.change(screen.getByTestId('task-status'), {
            target: { value: BACKEND_TASK_STATUS.BACKLOG },
        });
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith({
            newStatus: BACKEND_TASK_STATUS.BACKLOG,
        });
        const msgTag = screen.queryByTestId('msg');
        expect(msgTag).toBeNull();
    });
    it('should not show any model info on change of status from in progress to blocked', () => {
        const oldProgress = 70;
        const oldStatus = BACKEND_TASK_STATUS.IN_PROGRESS;

        render(
            <TaskDropDown
                isDevMode={true}
                oldProgress={oldProgress}
                oldStatus={oldStatus}
                onChange={onChange}
            />
        );

        fireEvent.change(screen.getByTestId('task-status'), {
            target: { value: BACKEND_TASK_STATUS.BLOCKED },
        });
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith({
            newStatus: BACKEND_TASK_STATUS.BLOCKED,
        });
        const msgTag = screen.queryByTestId('msg');
        expect(msgTag).toBeNull();
    });
    describe('TaskDropDownModel', () => {
        const handleProceed = jest.fn();
        const resetProgressAndStatus = jest.fn();
        it('should render message sent to it', () => {
            const msg = 'This is random msg';
            render(
                <TaskDropDownModel
                    message={msg}
                    handleProceed={handleProceed}
                    resetProgressAndStatus={resetProgressAndStatus}
                />
            );
            const msgTag = screen.queryByTestId('msg');
            expect(msgTag).toHaveTextContent(msg);
        });
    });
});
