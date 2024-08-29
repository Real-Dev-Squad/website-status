import { render, screen, fireEvent } from '@testing-library/react';
import TaskDates from '@/components/taskDetails/TaskDates';

const mockSetNewEndOnDate = jest.fn();
const mockHandleBlurOfEndsOn = jest.fn();

describe('TaskDates Component', () => {
    it('should render input field for End On date when in editing mode', () => {
        render(
            <TaskDates
                isEditing={true}
                isUserAuthorized={true}
                startedOn="2024-03-30T11:20:00Z"
                endsOn={1700000000}
                newEndOnDate="2024-03-30"
                setNewEndOnDate={mockSetNewEndOnDate}
                handleBlurOfEndsOn={mockHandleBlurOfEndsOn}
                isExtensionRequestPending={false}
                taskId="1"
            />
        );

        const input = screen.getByTestId('endsOnTaskDetails');
        expect(input).toBeInTheDocument();
        fireEvent.blur(input);
        expect(mockHandleBlurOfEndsOn).toHaveBeenCalled();
    });
});
