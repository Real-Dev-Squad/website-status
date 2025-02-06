import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CompletionModal from '@/components/Modal/CompletionModal';

describe('CompletionModal Component', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders modal when isOpen is true', () => {
        const onCloseMock = jest.fn();
        const { getByText, getByRole } = render(
            <CompletionModal isOpen={true} onClose={onCloseMock} />
        );

        expect(getByText('Congratulations !')).toBeInTheDocument();
        expect(
            getByText(
                'You have achieved 100% completion! Would you like to update your status?'
            )
        ).toBeInTheDocument();
        expect(
            getByRole('button', { name: /Change Status/i })
        ).toBeInTheDocument();
        expect(getByRole('button', { name: /Close/i })).toBeInTheDocument();
    });

    test('does not render modal when isOpen is false', () => {
        const onCloseMock = jest.fn();
        const { queryByText } = render(
            <CompletionModal isOpen={false} onClose={onCloseMock} />
        );

        expect(queryByText('Congratulations !')).toBeNull();
    });

    test('calls onClose and removes modal from DOM when Close button is clicked', () => {
        const onCloseMock = jest.fn();
        const { getByRole, queryByText, rerender } = render(
            <CompletionModal isOpen={true} onClose={onCloseMock} />
        );

        expect(queryByText('Congratulations !')).toBeInTheDocument();

        fireEvent.click(getByRole('button', { name: /Close/i }));

        expect(onCloseMock).toHaveBeenCalledTimes(1);

        rerender(<CompletionModal isOpen={false} onClose={onCloseMock} />);

        expect(queryByText('Congratulations!')).toBeNull();
    });

    test('calls onClose when Change Status button is clicked', () => {
        const onCloseMock = jest.fn();
        const { getByRole } = render(
            <CompletionModal isOpen={true} onClose={onCloseMock} />
        );

        fireEvent.click(getByRole('button', { name: /Change Status/i }));
        expect(onCloseMock).toHaveBeenCalledTimes(1);
    });

    test('calls onClose when close icon is clicked', () => {
        const onCloseMock = jest.fn();
        const { container } = render(
            <CompletionModal isOpen={true} onClose={onCloseMock} />
        );

        const closeIcon = container.querySelector('.closeIcon');
        if (!closeIcon) {
            throw new Error('Close icon not found');
        }

        fireEvent.click(closeIcon);
        expect(onCloseMock).toHaveBeenCalledTimes(1);
    });
    test('calls onClose when clicking outside the modal', () => {
        const onCloseMock = jest.fn();
        const { container } = render(
            <CompletionModal isOpen={true} onClose={onCloseMock} />
        );

        const modalContainer = container.firstChild;

        if (modalContainer) {
            fireEvent.click(modalContainer);
        }

        expect(onCloseMock).toHaveBeenCalledTimes(1);
    });
});
