import { render, screen } from '@testing-library/react';
import Tasks from '@/pages/tasks';
import { store } from '@/app/store';
import { Provider } from 'react-redux';
import { AppTreeType } from 'next/dist/shared/lib/utils';

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

describe('Tasks', () => {
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
