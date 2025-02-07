import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TaskUpdateModal from '@/components/taskDetails/TaskUpdateModal';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import Modal from '@/components/Modal';
import ProgressContainer from '@/components/tasks/card/progressContainer';
import ProgressForm from '@/components/ProgressForm/ProgressForm';
import getCurrentDate from '@/utils/getLatestDate';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
    useRouter: jest.fn(() => ({
        query: { dev: 'false' },
    })),
}));

jest.mock('@/components/Modal', () =>
    jest.fn(({ isOpen, toggle, children }) => (
        <div data-testid="mock-modal">
            {isOpen && (
                <div>
                    <button
                        data-testid="task-update-mock-modal-close-button"
                        onClick={toggle}
                        aria-label="Close"
                    >
                        Close
                    </button>
                    {children}
                </div>
            )}
        </div>
    ))
);

jest.mock('@/components/tasks/card/progressContainer', () =>
    jest.fn(() => <div data-testid="mock-progress-container" />)
);
jest.mock('@/components/ProgressForm/ProgressForm', () =>
    jest.fn(() => <div data-testid="mock-progress-form" />)
);
jest.mock('@/utils/getLatestDate', () => jest.fn(() => '2023-12-01'));

describe('TaskUpdateModal', () => {
    const mockSetIsOpen = jest.fn();
    const mockStyles = {
        taskUpdateModal: 'task-update-modal',
        updateProgress: 'update-progress',
        containerUpdate: 'container-update',
        formHeading: 'form-heading',
        dateUpdated: 'date-updated',
        hr: 'hr',
    };
    const mockTaskDetails = {
        id: '1',
        title: 'Sample Task',
        description: 'A sample task description',
        percentCompleted: 50,
        assignee: 'test-user',
    };
    const mockEditedTaskDetails = { ...mockTaskDetails };

    const defaultProps = {
        isOpen: true,
        setIsOpen: mockSetIsOpen,
        styles: mockStyles,
        isDev: false,
        taskDetailsData: mockTaskDetails,
        editedTaskDetails: mockEditedTaskDetails,
        onUpdateSuccess: jest.fn(),
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should renders the modal when open', () => {
        render(
            <Provider store={store()}>
                <TaskUpdateModal {...defaultProps} />
            </Provider>
        );

        expect(screen.getByTestId('mock-modal')).toBeInTheDocument();
        expect(screen.getByText('Update Progress')).toBeInTheDocument();
        expect(screen.getByText('Task Updates')).toBeInTheDocument();
        expect(screen.getByText('On 2023-12-01')).toBeInTheDocument();
        expect(
            screen.getByTestId('mock-progress-container')
        ).toBeInTheDocument();
        expect(screen.getByTestId('mock-progress-form')).toBeInTheDocument();
    });

    it('should call setIsOpen when close button is clicked', () => {
        render(
            <Provider store={store()}>
                <TaskUpdateModal {...defaultProps} />
            </Provider>
        );

        const closeButton = screen.getByTestId(
            'task-update-mock-modal-close-button'
        );
        fireEvent.click(closeButton);

        expect(mockSetIsOpen).toHaveBeenCalledWith(false);
    });

    it('should pass correct props to ProgressContainer', () => {
        render(
            <Provider store={store()}>
                <TaskUpdateModal {...defaultProps} />
            </Provider>
        );

        expect(ProgressContainer).toHaveBeenCalledWith(
            expect.objectContaining({
                content: defaultProps.taskDetailsData,
                readOnly: false,
            }),
            {}
        );
    });

    it('should pass correct props to ProgressForm', () => {
        render(
            <Provider store={store()}>
                <TaskUpdateModal {...defaultProps} />
            </Provider>
        );

        expect(ProgressForm).toHaveBeenCalledWith(
            expect.objectContaining({
                questions: expect.any(Array),
                onUpdateSuccess: expect.any(Function),
            }),
            {}
        );
    });

    it('should display the correct date from getCurrentDate', () => {
        render(
            <Provider store={store()}>
                <TaskUpdateModal {...defaultProps} />
            </Provider>
        );

        expect(screen.getByText('On 2023-12-01')).toBeInTheDocument();
    });

    it('should not render any content when modal is closed', () => {
        render(
            <Provider store={store()}>
                <TaskUpdateModal {...defaultProps} isOpen={false} />
            </Provider>
        );

        expect(screen.queryByText('Update Progress')).not.toBeInTheDocument();
        expect(
            screen.queryByTestId('mock-progress-container')
        ).not.toBeInTheDocument();
        expect(
            screen.queryByTestId('mock-progress-form')
        ).not.toBeInTheDocument();
    });

    it('should call onUpdateSuccess when form submits successfully', () => {
        const mockOnUpdateSuccess = jest.fn();
        (ProgressForm as jest.Mock).mockImplementationOnce(
            ({ onUpdateSuccess }) => (
                <div data-testid="mock-progress-form">
                    <button onClick={() => onUpdateSuccess()}>
                        Submit Form
                    </button>
                </div>
            )
        );

        render(
            <Provider store={store()}>
                <TaskUpdateModal
                    {...defaultProps}
                    onUpdateSuccess={mockOnUpdateSuccess}
                />
            </Provider>
        );

        fireEvent.click(screen.getByText('Submit Form'));

        expect(mockOnUpdateSuccess).toHaveBeenCalled();
        expect(mockSetIsOpen).toHaveBeenCalledWith(false);
    });

    it('closes modal when close button is clicked', () => {
        useRouter.mockReturnValue({ query: { dev: 'true' } });
        const setIsOpen = jest.fn();
        render(
            <Provider store={store()}>
                <TaskUpdateModal {...defaultProps} setIsOpen={setIsOpen} />
            </Provider>
        );

        const closeButtons = screen.getAllByTestId(
            'task-update-modal-close-button'
        );

        expect(closeButtons.length).toBeGreaterThan(0);
        fireEvent.click(closeButtons[0]);
        expect(setIsOpen).toHaveBeenCalledWith(false);
    });

    it('should show the close button when dev is true', () => {
        useRouter.mockReturnValue({ query: { dev: 'true' } });

        render(
            <TaskUpdateModal
                isOpen={true}
                setIsOpen={mockSetIsOpen}
                styles={mockStyles}
                taskDetailsData={mockTaskDetails}
                editedTaskDetails={mockTaskDetails}
            />
        );

        const closeButtons = screen.getAllByTestId(
            'task-update-modal-close-button'
        );
        expect(closeButtons[0]).toBeInTheDocument();
    });
    it('should not show the close button when dev is false', async () => {
        useRouter.mockReturnValue({ query: { dev: 'false' } });

        render(
            <TaskUpdateModal
                isOpen={true}
                setIsOpen={mockSetIsOpen}
                styles={mockStyles}
                taskDetailsData={mockTaskDetails}
                editedTaskDetails={mockTaskDetails}
            />
        );

        await waitFor(() => {
            expect(
                screen.queryByTestId('task-update-modal-close-button')
            ).not.toBeInTheDocument();
        });
    });
});
