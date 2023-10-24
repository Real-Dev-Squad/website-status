import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Tab } from '@/interfaces/task.type';
import FilterModal from '@/components/tasks/TaskSearch/FilterModal';

const mockOnSelect = jest.fn();
const mockOnClose = jest.fn();

describe('FilterModal', () => {
    test('renders the modal with correct title and buttons', () => {
        render(
            <FilterModal
                tabs={[Tab.ASSIGNED, Tab.IN_PROGRESS]}
                onSelect={mockOnSelect}
                activeTab={Tab.ASSIGNED}
                onClose={mockOnClose}
            />
        );

        const modalTitle = screen.getByText('Filter');
        expect(modalTitle).toBeInTheDocument();

        const closeButton = screen.getByText('×');
        expect(closeButton).toBeInTheDocument();

        const assignedButton = screen.getByText(/assigned/i);
        expect(assignedButton).toBeInTheDocument();

        const inProgressButton = screen.getByText(/in progress/i);
        expect(inProgressButton).toBeInTheDocument();
    });

    test('renders the modal having overdue tab with correct title and buttons', () => {
        render(
            <FilterModal
                tabs={[Tab.ASSIGNED, Tab.IN_PROGRESS, Tab.OVERDUE]}
                onSelect={mockOnSelect}
                activeTab={Tab.OVERDUE}
                onClose={mockOnClose}
            />
        );

        const modalTitle = screen.getByText('Filter');
        expect(modalTitle).toBeInTheDocument();

        const closeButton = screen.getByText('×');
        expect(closeButton).toBeInTheDocument();

        const assignedButton = screen.getByText(/assigned/i);
        expect(assignedButton).toBeInTheDocument();

        const inProgressButton = screen.getByText(/in progress/i);
        expect(inProgressButton).toBeInTheDocument();

        const overdueButton = screen.getByText(/overdue/i);
        expect(overdueButton).toBeInTheDocument();
    });

    test('renders the modal with correct title and buttons when dev is true', () => {
        render(
            <FilterModal
                dev={true}
                tabs={[Tab.UNASSIGNED, Tab.DONE]}
                onSelect={mockOnSelect}
                activeTab={Tab.UNASSIGNED}
                onClose={mockOnClose}
            />
        );

        const modalTitle = screen.getByText('Filter');
        expect(modalTitle).toBeInTheDocument();

        const closeButton = screen.getByText('×');
        expect(closeButton).toBeInTheDocument();

        const unassignedButton = screen.getByText(/unassigned/i);
        expect(unassignedButton).toBeInTheDocument();

        const doneButton = screen.getByText(/done/i);
        expect(doneButton).toBeInTheDocument();
    });

    test('calls onSelect and onClose when a status button is clicked', () => {
        render(
            <FilterModal
                tabs={[Tab.ASSIGNED, Tab.IN_PROGRESS]}
                onSelect={mockOnSelect}
                activeTab={Tab.ASSIGNED}
                onClose={mockOnClose}
            />
        );

        const statusButton = screen.getByText(Tab.ASSIGNED);
        fireEvent.click(statusButton);

        expect(mockOnSelect).toBeCalled();
    });

    test('calls onClose when the close button is clicked', () => {
        render(
            <FilterModal
                tabs={[Tab.ASSIGNED, Tab.IN_PROGRESS]}
                onSelect={mockOnSelect}
                activeTab={Tab.ASSIGNED}
                onClose={mockOnClose}
            />
        );

        const closeButton = screen.getByText('×');
        fireEvent.click(closeButton);

        expect(mockOnClose).toBeCalled();
    });

    test('renders the modal with correct active tab', () => {
        render(
            <FilterModal
                tabs={[Tab.ASSIGNED, Tab.IN_PROGRESS]}
                onSelect={mockOnSelect}
                activeTab={Tab.ASSIGNED}
                onClose={mockOnClose}
            />
        );

        const assignedButton = screen.getByText(/assigned/i);
        expect(assignedButton).toHaveClass('status-button-active');

        const inProgressButton = screen.getByText(/in progress/i);
        expect(inProgressButton).not.toHaveClass('status-button-active');
    });

    test('renders the modal with correct active tab when dev is true', () => {
        render(
            <FilterModal
                dev={true}
                tabs={[Tab.UNASSIGNED, Tab.DONE]}
                onSelect={mockOnSelect}
                activeTab={Tab.DONE}
                onClose={mockOnClose}
            />
        );

        const doneButton = screen.getByText(/done/i);
        expect(doneButton).toHaveClass('status-button-active');

        const unassignedButton = screen.getByText(/unassigned/i);
        expect(unassignedButton).not.toHaveClass('status-button-active');
    });

    test('render the filter model having BLOCKED tab with correct title and buttons when dev is true', () => {
        render(
            <FilterModal
                dev={true}
                tabs={[Tab.UNASSIGNED, Tab.BLOCKED]}
                onSelect={mockOnSelect}
                activeTab={Tab.BLOCKED}
                onClose={mockOnClose}
            />
        );

        const blockedButton = screen.getByText(/blocked/i);
        expect(blockedButton).toBeInTheDocument();
    });

    test('onSelect Function Gets Called When the Blocked Status button is Clicked when dev is true', () => {
        render(
            <FilterModal
                dev={true}
                tabs={[Tab.BLOCKED, Tab.IN_PROGRESS]}
                onSelect={mockOnSelect}
                activeTab={Tab.BLOCKED}
                onClose={mockOnClose}
            />
        );

        const blockedButton = screen.getByRole('button', { name: 'BLOCKED' });
        fireEvent.click(blockedButton);

        expect(mockOnSelect).toHaveBeenCalledWith(Tab.BLOCKED);
    });

    test('Selection of the Blocked Button when dev is true', () => {
        render(
            <FilterModal
                dev={true}
                tabs={[Tab.BLOCKED, Tab.DONE]}
                onSelect={mockOnSelect}
                activeTab={Tab.BLOCKED}
                onClose={mockOnClose}
            />
        );

        const blockedButton = screen.getByText(/blocked/i);
        expect(blockedButton).toHaveClass('status-button-active');

        const doneButton = screen.getByText(/done/i);
        expect(doneButton).not.toHaveClass('status-button-active');
    });
});
