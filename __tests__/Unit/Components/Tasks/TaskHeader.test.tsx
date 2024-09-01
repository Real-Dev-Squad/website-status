import { render, screen, fireEvent } from '@testing-library/react';
import { TaskHeader } from '@/components/taskDetails/TaskHeader';
import { ButtonProps } from '@/interfaces/taskDetails.type';

const mockSetIsEditing = jest.fn();
const mockOnSave = jest.fn();
const mockOnCancel = jest.fn();
const mockHandleChange = jest.fn();

const renderTaskHeader = (isEditing = false) => {
    return render(
        <TaskHeader
            isEditing={isEditing}
            setIsEditing={mockSetIsEditing}
            onSave={mockOnSave}
            onCancel={mockOnCancel}
            title="Test Title"
            handleChange={mockHandleChange}
            isUserAuthorized={true}
        />
    );
};

describe('TaskHeader Component', () => {
    it('should renders the task title correctly when not editing', () => {
        renderTaskHeader(false);
        expect(screen.getByText('Test Title')).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: 'Edit' })
        ).toBeInTheDocument();
    });

    it('should renders textarea for title when in editing mode', () => {
        renderTaskHeader(true);
        expect(screen.getByTestId('title-textarea')).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: 'Save' })
        ).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: 'Cancel' })
        ).toBeInTheDocument();
    });

    it('should calls setIsEditing with true when Edit button is clicked', () => {
        renderTaskHeader(false);
        fireEvent.click(screen.getByRole('button', { name: 'Edit' }));
        expect(mockSetIsEditing).toHaveBeenCalledWith(true);
    });

    it('should calls onSave when Save button is clicked', () => {
        renderTaskHeader(true);
        fireEvent.click(screen.getByRole('button', { name: 'Save' }));
        expect(mockOnSave).toHaveBeenCalled();
    });

    it('should calls onCancel when Cancel button is clicked', () => {
        renderTaskHeader(true);
        fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
        expect(mockOnCancel).toHaveBeenCalled();
    });
});
