import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import TaskDependencies from '@/components/taskDetails/TaskDependencies';
import '@testing-library/jest-dom/extend-expect';
import {
    taskDetailsApi,
    useGetTasksDependencyDetailsQuery,
} from '@/app/services/taskDetailsApi';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

const createMockStore = () => {
    return configureStore({
        reducer: {
            [taskDetailsApi.reducerPath]: taskDetailsApi.reducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(taskDetailsApi.middleware),
    });
};

jest.mock('@/app/services/taskDetailsApi', () => {
    const actualApi = jest.requireActual('@/app/services/taskDetailsApi');
    return {
        ...actualApi,
        useGetTasksDependencyDetailsQuery: jest.fn(),
    };
});

describe('TaskDependencies Component', () => {
    const mockSetEditedTaskDetails = jest.fn();
    const mockPush = jest.fn();

    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({
            push: mockPush,
        });

        jest.clearAllMocks();

        (useGetTasksDependencyDetailsQuery as jest.Mock).mockReturnValue({
            data: [
                {
                    status: 'fulfilled',
                    value: { id: '6KhcLU3yr45dzjQIVm0J', title: 'Task 1' },
                },
                {
                    status: 'fulfilled',
                    value: { id: 'taskid-2', title: 'Task 2' },
                },
            ],
            isLoading: false,
            isError: false,
        });
    });

    const defaultProps = {
        isEditing: false,
        taskDependencyIds: ['6KhcLU3yr45dzjQIVm0J', 'taskid-2'],
        setEditedTaskDetails: mockSetEditedTaskDetails,
    };

    it('should render task dependencies correctly when API returns data', async () => {
        render(
            <Provider store={createMockStore()}>
                <TaskDependencies {...defaultProps} />
            </Provider>
        );

        await waitFor(() => {
            expect(screen.getByText('Task 1')).toBeInTheDocument();
            expect(screen.getByText('Task 2')).toBeInTheDocument();
        });
    });

    it('should render an error message when API fails to fetch a dependency', async () => {
        (useGetTasksDependencyDetailsQuery as jest.Mock).mockReturnValue({
            data: [
                {
                    status: 'rejected',
                    reason: 'Failed to fetch',
                    id: '6KhcLU3yr45dzjQIVm0J',
                },
                {
                    status: 'rejected',
                    reason: 'Failed to fetch',
                    id: 'taskid-2',
                },
            ],
            isLoading: false,
            isError: true,
        });

        render(
            <Provider store={createMockStore()}>
                <TaskDependencies {...defaultProps} />
            </Provider>
        );

        await waitFor(() => {
            expect(
                screen.getByText('Unable to fetch dependency tasks')
            ).toBeInTheDocument();
        });
    });

    it('should show a loading state while API is fetching data', () => {
        (useGetTasksDependencyDetailsQuery as jest.Mock).mockReturnValue({
            data: null,
            isLoading: true,
            isError: false,
        });

        render(
            <Provider store={createMockStore()}>
                <TaskDependencies {...defaultProps} />
            </Provider>
        );

        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
});
