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
    it.skip('should display model informing user that proceeding further will make progress 100%, on task status change from in progress to needs review', () => {
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
    it.skip('should display model informing user that proceeding further will make progress 0%, on task status change from needs review to in progress', () => {
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
    it.skip('should send changed status and progress if user click the proceed button of the model, on task status change from needs review to in progress', () => {
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
    it.skip('should send reset status and progress if user click the cancel button of the model, on task status change from needs review to in progress', () => {
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
    it('should show text Done as selected option when a task with completed status is passed down.', () => {
        const oldProgress = 100;
        const oldStatus = BACKEND_TASK_STATUS.DONE;

        render(
            <TaskDropDown
                oldProgress={oldProgress}
                oldStatus={oldStatus}
                onChange={onChange}
            />
        );
        const option: HTMLOptionElement = screen.getByTestId(
            'task-status-DONE'
        ) as HTMLOptionElement;
        expect(option.selected).toBeTruthy();
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
    describe('Task Status Dropdown Rendering in DevMode', () => {
        it('should renders TaskDropDown with correct classes', () => {
            render(
                <TaskDropDown
                    isDevMode={true}
                    oldProgress={0}
                    oldStatus={BACKEND_TASK_STATUS.IN_PROGRESS}
                    onChange={onChange}
                />
            );

            const label = screen.getByTestId('task-status-label');
            expect(label).toHaveClass('cardPurposeAndStatusFont');

            const select = screen.getByTestId('task-status');
            expect(select).toHaveClass('taskStatusUpdate');
        });

        it('should render all expected task statuses except COMPLETED in dev mode', () => {
            render(
                <TaskDropDown
                    isDevMode={true}
                    oldProgress={0}
                    oldStatus={BACKEND_TASK_STATUS.IN_PROGRESS}
                    onChange={onChange}
                />
            );

            expect(
                screen.getByTestId('task-status-IN_PROGRESS')
            ).toBeInTheDocument();
            expect(
                screen.getByTestId('task-status-BLOCKED')
            ).toBeInTheDocument();
            expect(
                screen.getByTestId('task-status-NEEDS_REVIEW')
            ).toBeInTheDocument();
            expect(screen.getByTestId('task-status-DONE')).toBeInTheDocument();

            expect(
                screen.queryByTestId('task-status-COMPLETED')
            ).not.toBeInTheDocument();
        });

        it('should update state and call onChange when selecting a status', () => {
            const onChange = jest.fn();

            const { getByTestId } = render(
                <TaskDropDown
                    oldStatus={BACKEND_TASK_STATUS.UN_ASSIGNED}
                    oldProgress={0}
                    onChange={onChange}
                />
            );

            const statusSelect = getByTestId('task-status');

            fireEvent.change(statusSelect, {
                target: { value: BACKEND_TASK_STATUS.NEEDS_REVIEW },
            });

            expect(onChange).toHaveBeenCalledWith({
                newStatus: BACKEND_TASK_STATUS.NEEDS_REVIEW,
            });
        });

        it('should show the current status as selected', () => {
            const currentStatus = BACKEND_TASK_STATUS.BLOCKED;

            render(
                <TaskDropDown
                    isDevMode={true}
                    oldProgress={0}
                    oldStatus={currentStatus}
                    onChange={onChange}
                />
            );

            const select = screen.getByTestId('task-status');
            expect(select).toHaveValue(currentStatus);
        });

        it('should handle COMPLETED status in dev mode', () => {
            render(
                <TaskDropDown
                    isDevMode={true}
                    oldProgress={100}
                    oldStatus={BACKEND_TASK_STATUS.COMPLETED}
                    onChange={onChange}
                />
            );

            const option = screen.getByTestId(
                'task-status-DONE'
            ) as HTMLOptionElement;
            expect(option.selected).toBeTruthy();
        });
    });

    describe('Task Status Dropdown Rendering in non-DevMode', () => {
        it('should not render TaskDropDown', () => {
            render(
                <TaskDropDown
                    isDevMode={false}
                    oldProgress={0}
                    oldStatus={BACKEND_TASK_STATUS.IN_PROGRESS}
                    onChange={onChange}
                />
            );

            const label = screen.getByText('Status:');
            expect(label).toBeInTheDocument();

            expect(label).not.toHaveClass('cardPurposeAndStatusFont');

            const select = screen.getByTestId('task-status');
            expect(select).not.toHaveClass('taskStatusUpdate');
        });

        it('should not display BACKLOG and DONE options in non-dev mode', () => {
            render(
                <TaskDropDown
                    isDevMode={false}
                    oldProgress={0}
                    oldStatus={BACKEND_TASK_STATUS.IN_PROGRESS}
                    onChange={onChange}
                />
            );

            expect(
                screen.queryByTestId('task-status-BACKLOG')
            ).not.toBeInTheDocument();
            expect(
                screen.queryByTestId('task-status-DONE')
            ).not.toBeInTheDocument();

            expect(
                screen.getByTestId('task-status-IN_PROGRESS')
            ).toBeInTheDocument();
            expect(
                screen.getByTestId('task-status-BLOCKED')
            ).toBeInTheDocument();
        });
    });

    describe('Status Change Handling', () => {
        it('should not call onChange when selected status is the same as current status', () => {
            const currentStatus = BACKEND_TASK_STATUS.IN_PROGRESS;

            render(
                <TaskDropDown
                    isDevMode={true}
                    oldProgress={0}
                    oldStatus={currentStatus}
                    onChange={onChange}
                />
            );

            fireEvent.change(screen.getByTestId('task-status'), {
                target: { value: currentStatus },
            });

            expect(onChange).not.toHaveBeenCalled();
        });
    });
});
