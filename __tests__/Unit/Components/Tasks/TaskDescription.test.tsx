import { render, screen, fireEvent } from '@testing-library/react';
import TaskDescription from '@/components/taskDetails/TaskDescription';

const mockHandleChange = jest.fn();

describe('TaskDescription Component', () => {
    it('should renders the task description when not editing', () => {
        render(
            <TaskDescription
                isEditing={false}
                purpose="Test Purpose"
                handleChange={mockHandleChange}
            />
        );
        expect(screen.getByText('Test Purpose')).toBeInTheDocument();
    });

    it('should renders "No description available" when purpose is empty', () => {
        render(
            <TaskDescription
                isEditing={false}
                purpose=""
                handleChange={mockHandleChange}
            />
        );
        expect(
            screen.getByText('No description available')
        ).toBeInTheDocument();
    });

    it('should renders textarea when in editing mode', () => {
        render(
            <TaskDescription
                isEditing={true}
                purpose="Test Purpose"
                handleChange={mockHandleChange}
            />
        );
        expect(screen.getByTestId('purpose-textarea')).toBeInTheDocument();
    });

    it('should calls handleChange when textarea value changes', () => {
        render(
            <TaskDescription
                isEditing={true}
                purpose="Test Purpose"
                handleChange={mockHandleChange}
            />
        );
        fireEvent.change(screen.getByTestId('purpose-textarea'), {
            target: { value: 'New Purpose' },
        });
        expect(mockHandleChange).toHaveBeenCalled();
    });
});
