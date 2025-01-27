import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CompletionModal from '@/components/Modal/CompletionModal';

describe('CompletionModal Component', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders modal when isOpen is true', () => {
        const onCloseMock = jest.fn();
        const onStatusChangeMock = jest.fn();
        const { getByText, getByRole } = render(
            <CompletionModal
                isOpen={true}
                onClose={onCloseMock}
                onStatusChange={onStatusChangeMock}
            />
        );

        expect(getByText('Congratulations!')).toBeInTheDocument();
        expect(
            getByText(
                'You have achieved 100% completion! Would you like to update your status?'
            )
        ).toBeInTheDocument();
        expect(
            getByRole('button', { name: /Change Status/i })
        ).toBeInTheDocument();
        expect(getByRole('button', { name: /Cancel/i })).toBeInTheDocument();
    });

    test('does not render modal when isOpen is false', () => {
        const onCloseMock = jest.fn();
        const onStatusChangeMock = jest.fn();
        const { queryByText } = render(
            <CompletionModal
                isOpen={false}
                onClose={onCloseMock}
                onStatusChange={onStatusChangeMock}
            />
        );

        expect(queryByText('Congratulations!')).toBeNull();
    });

    test('calls onClose when the Cancel button is clicked', () => {
        const onCloseMock = jest.fn();
        const onStatusChangeMock = jest.fn();
        const { getByRole } = render(
            <CompletionModal
                isOpen={true}
                onClose={onCloseMock}
                onStatusChange={onStatusChangeMock}
            />
        );

        fireEvent.click(getByRole('button', { name: /Cancel/i }));
        expect(onCloseMock).toHaveBeenCalledTimes(1);
        expect(onStatusChangeMock).not.toHaveBeenCalled();
    });

    test('calls onStatusChange and onClose when Change Status button is clicked', () => {
        const onCloseMock = jest.fn();
        const onStatusChangeMock = jest.fn();
        const { getByRole } = render(
            <CompletionModal
                isOpen={true}
                onClose={onCloseMock}
                onStatusChange={onStatusChangeMock}
            />
        );

        fireEvent.click(getByRole('button', { name: /Change Status/i }));
        expect(onStatusChangeMock).toHaveBeenCalledTimes(1);
        expect(onCloseMock).toHaveBeenCalledTimes(1);
    });
});
