import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Modal from '@/components/Modal/index';

describe('Modal Component', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    test('renders modal when isOpen is true', () => {
        const mockedFunction = jest.fn();
        const { getByTestId } = render(
            <Modal isOpen={true} toggle={mockedFunction} />
        );
        const modalOverlay = getByTestId('modal-overlay');
        const modalBox = getByTestId('modal-box');
        expect(modalOverlay).toBeInTheDocument();
        expect(modalBox).toBeInTheDocument();
    });

    test('does not render modal when isOpen is false', () => {
        const mockedFunction = jest.fn();
        const { queryByTestId } = render(
            <Modal isOpen={false} toggle={mockedFunction} />
        );
        const modalOverlay = queryByTestId('modal-overlay');
        const modalBox = queryByTestId('modal-box');
        expect(modalOverlay).toBeNull();
        expect(modalBox).toBeNull();
    });

    test('toggle should be called when overlay is clicked', () => {
        const toggleMock = jest.fn();
        const { getByTestId } = render(
            <Modal isOpen={true} toggle={toggleMock} />
        );
        const modalOverlay = getByTestId('modal-overlay');
        fireEvent.click(modalOverlay);
        expect(toggleMock).toHaveBeenCalled();
    });

    test('toggle should not be called when modal is clicked', () => {
        const toggleMock = jest.fn();
        const { getByTestId } = render(
            <Modal isOpen={true} toggle={toggleMock} />
        );
        const modalBox = getByTestId('modal-box');
        fireEvent.click(modalBox);
        expect(toggleMock).not.toHaveBeenCalled();
    });
});
