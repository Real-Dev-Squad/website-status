import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { renderWithRouter } from '@/test_utils/createMockRouter';
import { setupServer } from 'msw/node';
import handlers from '../../../../__mocks__/handlers';
import { mockGetTaskProgress } from '../../../../__mocks__/db/progresses';
import ProgressCard from '@/components/ProgressCard';

const server = setupServer(...handlers);

beforeAll(() => {
    server.listen({
        onUnhandledRequest: 'error',
    });
});

afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('ProgressCard Component', () => {
    it('should render the ProgressCard', async () => {
        renderWithRouter(
            <Provider store={store()}>
                <ProgressCard taskProgress={mockGetTaskProgress.data} />
            </Provider>
        );
        const progress = screen.getByTestId('progressCard');
        expect(progress).toBeInTheDocument();
        expect(progress).toHaveTextContent('Progress Updates');
    });
    it('should render Asc/Dsc button  ', async () => {
        const { getByRole } = renderWithRouter(
            <Provider store={store()}>
                <ProgressCard taskProgress={mockGetTaskProgress.data} />
            </Provider>
        );

        expect(getByRole('button', { name: 'Dsc' })).toBeInTheDocument();
    });
    it('should change the text on click of Asc/Dsc button from dsc to asc  ', async () => {
        const { getByRole } = renderWithRouter(
            <Provider store={store()}>
                <ProgressCard taskProgress={mockGetTaskProgress.data} />
            </Provider>
        );
        const btn = getByRole('button', { name: 'Dsc' });
        fireEvent.click(btn);
        expect(getByRole('button', { name: 'Asc' })).toBeInTheDocument();
    });
    it('should render the progress enteries in ascending order  ', async () => {
        const { container } = renderWithRouter(
            <Provider store={store()}>
                <ProgressCard taskProgress={mockGetTaskProgress.data} />
            </Provider>
        );
        const progressArr = container.querySelectorAll(
            '[data-testid="tooltip"]'
        );

        expect(progressArr[0]).toHaveTextContent(
            'Updated at 31-05-23, 12:20PM'
        );
        expect(progressArr[1]).toHaveTextContent(
            'Updated at 31-05-23, 12:20PM'
        );
        expect(progressArr[2]).toHaveTextContent(
            'Updated at 29-05-23, 03:38AM'
        );
    });
    it('should render the progress enteries in dscending order after Dsc btn click  ', async () => {
        const { container, getByRole } = renderWithRouter(
            <Provider store={store()}>
                <ProgressCard taskProgress={mockGetTaskProgress.data} />
            </Provider>
        );

        const btn = getByRole('button', { name: 'Dsc' });
        fireEvent.click(btn);
        const progressArr = container.querySelectorAll(
            '[data-testid="tooltip"]'
        );
        expect(progressArr[0]).toHaveTextContent(
            'Updated at 27-05-23, 11:07AM'
        );
        expect(progressArr[1]).toHaveTextContent(
            'Updated at 29-05-23, 03:38AM'
        );
        expect(progressArr[2]).toHaveTextContent(
            'Updated at 31-05-23, 12:20PM'
        );
    });
});
