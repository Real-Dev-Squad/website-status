import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { CompletionModal } from '@/components/Modal/CompletionModal';

describe('CompletionModal Component', () => {
    let onCloseMock: jest.Mock;
    let defaultProps: { isOpen: boolean; onClose: jest.Mock };
    beforeEach(() => {
        onCloseMock = jest.fn();
        defaultProps = { isOpen: true, onClose: onCloseMock };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should render modal when isOpen is true', () => {
        const { getByText, getByRole, getByTestId, getAllByRole } = render(
            <CompletionModal {...defaultProps} />
        );

        expect(getByTestId('modal-overlay')).toBeInTheDocument();

        expect(getByText('Congratulations !')).toBeInTheDocument();
        expect(
            getByText('You have achieved 100% completion!')
        ).toBeInTheDocument();
        expect(
            getByText('Would you like to update your status?')
        ).toBeInTheDocument();
        expect(
            getByRole('button', { name: /Change status/i })
        ).toBeInTheDocument();
        const closeButtons = getAllByRole('button', { name: /Close/i });
        expect(closeButtons.length).toBeGreaterThan(0);
    });

    test('should not render modal when isOpen is false', () => {
        const { queryByText, queryByTestId } = render(
            <CompletionModal {...defaultProps} isOpen={false} />
        );
        expect(queryByTestId('modal-overlay')).toBeNull();
        expect(queryByText('Congratulations !')).toBeNull();
    });

    test('should call onClose and remove modal from DOM when Close button is clicked', () => {
        const { getAllByRole, queryByText, rerender } = render(
            <CompletionModal {...defaultProps} />
        );

        expect(queryByText('Congratulations !')).toBeInTheDocument();

        const closeButtons = getAllByRole('button', { name: /Close/i });
        fireEvent.click(closeButtons[closeButtons.length - 1]);

        expect(onCloseMock).toHaveBeenCalledTimes(1);

        rerender(<CompletionModal {...defaultProps} isOpen={false} />);
        expect(queryByText('Congratulations !')).toBeNull();
    });

    test('should call onClose when Change Status button is clicked', () => {
        const { getByRole } = render(<CompletionModal {...defaultProps} />);
        fireEvent.click(getByRole('button', { name: /Change Status/i }));
        expect(onCloseMock).toHaveBeenCalledTimes(1);
    });

    test('should call onClose when close icon is clicked', () => {
        const { container } = render(<CompletionModal {...defaultProps} />);

        const closeIcon = container.querySelector('.closeIcon');
        expect(closeIcon).not.toBeNull();

        fireEvent.click(closeIcon as Element);
        expect(onCloseMock).toHaveBeenCalledTimes(1);
    });

    test('should call onClose when clicking outside the modal', () => {
        const { container } = render(<CompletionModal {...defaultProps} />);
        const modalContainer = container.firstChild;

        if (modalContainer) {
            fireEvent.click(modalContainer);
        }

        expect(onCloseMock).toHaveBeenCalledTimes(1);
    });

    test('should close the modal when close button is clicked', () => {
        const { container, queryByTestId } = render(
            <CompletionModal {...defaultProps} />
        );

        const closeIcon = container.querySelector('.closeIcon');
        expect(closeIcon).not.toBeNull();

        fireEvent.click(closeIcon as Element);
        expect(onCloseMock).toHaveBeenCalledTimes(1);

        expect(queryByTestId('completion-modal')).not.toBeInTheDocument();
    });
});
