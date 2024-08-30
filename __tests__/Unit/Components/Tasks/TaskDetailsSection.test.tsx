import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import TaskDetailsSection from '@/components/taskDetails/TaskDetailsSection';
import '@testing-library/jest-dom/extend-expect';
import { TASK } from '../../../../__mocks__/db/tasks';
import { useRouter } from 'next/router';
import { api } from '@/app/services/api';

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

const createMockStore = () => {
    return configureStore({
        reducer: {
            user: (state = { roles: {} }) => state,
            [api.reducerPath]: api.reducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(api.middleware),
    });
};

describe('TaskDetailsSection Component', () => {
    const mockHandleTaskStatusUpdate = jest.fn();
    const mockRouter = {
        query: { dev: true },
    };

    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue(mockRouter);
    });

    const defaultProps = {
        isEditing: false,
        type: TASK.type,
        priority: TASK.priority,
        status: TASK.status,
        link: TASK.featureUrl,
        percentCompleted: TASK.percentCompleted,
        handleTaskStatusUpdate: mockHandleTaskStatusUpdate,
        taskDetailsData: TASK,
    };

    it('should render task details correctly when not in editing mode', () => {
        render(
            <Provider store={createMockStore()}>
                <TaskDetailsSection {...defaultProps} />
            </Provider>
        );

        expect(screen.getByText(TASK.type)).toBeInTheDocument();
        expect(screen.getByText(TASK.priority)).toBeInTheDocument();
        expect(screen.getByText(TASK.status)).toBeInTheDocument();

        const linkElement = screen.getByRole('link', {
            name: /open github issue/i,
        });
        expect(linkElement).toHaveAttribute('href', TASK.featureUrl);
    });

    it('should render task status dropdown when in editing mode', () => {
        render(
            <Provider store={createMockStore()}>
                <TaskDetailsSection {...defaultProps} isEditing={true} />
            </Provider>
        );
        expect(screen.getByRole('combobox')).toBeInTheDocument();
        expect(screen.queryByText(TASK.status)).toBeNull();
    });

    it('should call handleTaskStatusUpdate when task status is changed', () => {
        render(
            <Provider store={createMockStore()}>
                <TaskDetailsSection {...defaultProps} isEditing={true} />
            </Provider>
        );
        const dropdown = screen.getByRole('combobox');
        fireEvent.change(dropdown, { target: { value: 'DONE' } });

        expect(mockHandleTaskStatusUpdate).toHaveBeenCalledWith({
            newStatus: 'DONE',
        });
    });

    it('should render progress container correctly', () => {
        render(
            <Provider store={createMockStore()}>
                <TaskDetailsSection {...defaultProps} />
            </Provider>
        );
        expect(
            screen.getByText(`${TASK.percentCompleted}%`)
        ).toBeInTheDocument();
    });
});
