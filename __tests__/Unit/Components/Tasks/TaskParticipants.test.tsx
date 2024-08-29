import { render, screen, fireEvent } from '@testing-library/react';
import TaskParticipants from '@/components/taskDetails/TaskParticipants';
import { Provider } from 'react-redux';
import { store } from '@/app/store';

const mockHandleAssignment = jest.fn();
const mockHandleAssigneSelect = jest.fn();
const mockSetShowSuggestion = jest.fn();

const renderWithProvider = (ui: React.ReactElement) => {
    return render(<Provider store={store()}>{ui}</Provider>);
};

describe('TaskParticipants Component', () => {
    it('should render the assignee name correctly when not editing', () => {
        renderWithProvider(
            <TaskParticipants
                isEditing={false}
                isUserAuthorized={true}
                assigneeName="John Doe"
                showSuggestion={false}
                handleAssignment={mockHandleAssignment}
                handleAssigneSelect={mockHandleAssigneSelect}
                setShowSuggestion={mockSetShowSuggestion}
            />
        );

        expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    it('should render the Suggestions component when editing', () => {
        renderWithProvider(
            <TaskParticipants
                isEditing={true}
                isUserAuthorized={true}
                assigneeName="John Doe"
                showSuggestion={true}
                handleAssignment={mockHandleAssignment}
                handleAssigneSelect={mockHandleAssigneSelect}
                setShowSuggestion={mockSetShowSuggestion}
            />
        );

        const input = screen.getByRole('textbox');
        expect(input).toBeInTheDocument();
        fireEvent.change(input, { target: { value: 'Jane Doe' } });
        expect(mockHandleAssignment).toHaveBeenCalled();
    });
});
