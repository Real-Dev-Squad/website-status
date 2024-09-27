import { render, screen } from '@testing-library/react';
import Tasks from '@/pages/tasks';
import { store } from '@/app/store';
import { Provider } from 'react-redux';
import { AppTreeType } from 'next/dist/shared/lib/utils';
import { useGetAllTasksQuery } from '@/app/services/tasksApi';

type TaskPageProps = {
    dev: boolean;
    pathname: string;
    query: {
        dev: string;
    };
    AppTree: AppTreeType;
};

jest.mock('next/router', () => ({
    useRouter: () => ({
        query: {
            dev: 'true',
        },
    }),
}));

jest.mock('@/app/services/tasksApi', () => ({
    useGetAllTasksQuery: jest.fn(),
}));

describe('Tasks', () => {
    it('should display shimmer cards when isLoading is true and dev is true', () => {
        (useGetAllTasksQuery as jest.Mock).mockReturnValue({
            data: { tasks: [], next: '' },
            isError: false,
            isLoading: true,
            isFetching: false,
        });

        render(
            <Provider store={store()}>
                <Tasks />
            </Provider>
        );
        const skeletonContainer = screen.getByTestId('task-skeleton-container');
        expect(skeletonContainer).toBeInTheDocument();

        const shimmerCards = screen.getAllByTestId('task-shimmer-card');
        expect(shimmerCards).toHaveLength(5);
    });

    it('should render the Tasks component', () => {
        render(
            <Provider store={store()}>
                <Tasks />
            </Provider>
        );

        expect(screen.getByText('Tasks')).toBeInTheDocument();
    });

    it('getInitialProps should return dev as true', async () => {
        const mockContext: Partial<TaskPageProps> = {
            query: { dev: 'true' },
            pathname: '',
        };

        const props = await Tasks.getInitialProps(mockContext as TaskPageProps);
        expect(props).toEqual({ dev: true });
    });
});
