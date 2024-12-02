import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskUpdateModal from '@/components/taskDetails/TaskUpdateModal';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import Modal from '@/components/Modal';
import ProgressContainer from '@/components/tasks/card/progressContainer';
import ProgressForm from '@/components/ProgressForm/ProgressForm';
import getCurrentDate from '@/utils/getLatestDate';

jest.mock('@/components/Modal', () =>
    jest.fn(({ isOpen, toggle, children }) => (
        <div data-testid="mock-modal">
            {isOpen && (
                <div>
                    <button data-testid="close-modal" onClick={toggle}>
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
    };

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
    it('should calls setIsOpen when close button is clicked', () => {
        render(
            <Provider store={store()}>
                <TaskUpdateModal {...defaultProps} />
            </Provider>
        );

        const closeButton = screen.getByTestId('close-modal');
        fireEvent.click(closeButton);

        expect(mockSetIsOpen).toHaveBeenCalledWith(false);
    });

    it('should passes correct props to ProgressContainer', () => {
        render(
            <Provider store={store()}>
                <TaskUpdateModal {...defaultProps} />
            </Provider>
        );

        expect(ProgressContainer).toHaveBeenCalledWith(
            expect.objectContaining({
                isDev: defaultProps.isDev,
                content: defaultProps.taskDetailsData,
            }),
            {}
        );
    });

    it(' should passes correct props to ProgressForm', () => {
        render(
            <Provider store={store()}>
                <TaskUpdateModal {...defaultProps} />
            </Provider>
        );

        expect(ProgressForm).toHaveBeenCalledWith(expect.any(Object), {});
    });

    it(' should displays the correct date from getCurrentDate', () => {
        render(
            <Provider store={store()}>
                <TaskUpdateModal {...defaultProps} />
            </Provider>
        );

        expect(screen.getByText('On 2023-12-01')).toBeInTheDocument();
    });
});
