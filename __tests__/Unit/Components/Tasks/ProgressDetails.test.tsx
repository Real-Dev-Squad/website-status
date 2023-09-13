import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { renderWithRouter } from '@/test_utils/createMockRouter';
import { setupServer } from 'msw/node';
import handlers from '../../../../__mocks__/handlers';
import { mockGetTaskProgress } from '../../../../__mocks__/db/progresses';
import ProgressDetails from '@/components/taskDetails/ProgressDetails';

const server = setupServer(...handlers);

beforeAll(() => {
    server.listen({
        onUnhandledRequest: 'error',
    });
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('ProgressDetails Component', () => {
    it('should render the ProgressDetails', async () => {
        renderWithRouter(
            <Provider store={store()}>
                <ProgressDetails data={mockGetTaskProgress.data[2]} />
            </Provider>
        );

        const progress = screen.getByTestId('progress-item');
        expect(progress).toBeInTheDocument();
        expect(progress).toHaveTextContent('Wednesday, 31 May 2023');
    });
    it('should open the modal with the specific progress details when clicked on details', () => {
        renderWithRouter(
            <Provider store={store()}>
                <ProgressDetails data={mockGetTaskProgress.data[2]} />
            </Provider>
        );

        const progress = screen.getByTestId('progress-item');
        fireEvent.click(progress);

        const modalBackground = screen.getByTestId('modal-background');
        const content = screen.getByTestId('content');
        const completed = screen.getByText('Completed:');

        expect(modalBackground).toBeInTheDocument();
        expect(content).toBeInTheDocument();
        expect(completed).toBeInTheDocument();
    });

    it('should close the modal when clicking outside the modal', () => {
        renderWithRouter(
            <Provider store={store()}>
                <ProgressDetails data={mockGetTaskProgress.data[2]} />
            </Provider>
        );

        const progress = screen.getByTestId('progress-item');
        fireEvent.click(progress);

        const modalBackground = screen.getByTestId('modal-background');
        const content = screen.getByTestId('content');

        expect(modalBackground).toBeInTheDocument();
        fireEvent.click(modalBackground);

        expect(content).not.toBeInTheDocument();
    });

    it('should close the modal on clicking CLOSE button', () => {
        renderWithRouter(
            <Provider store={store()}>
                <ProgressDetails data={mockGetTaskProgress.data[2]} />
            </Provider>
        );

        const progress = screen.getByTestId('progress-item');
        fireEvent.click(progress);

        const closeButton = screen.getByText('Close');
        expect(closeButton).toBeInTheDocument();

        const content = screen.getByTestId('content');
        expect(content).toBeInTheDocument();

        fireEvent.click(closeButton);

        expect(content).not.toBeInTheDocument();
    });
});
