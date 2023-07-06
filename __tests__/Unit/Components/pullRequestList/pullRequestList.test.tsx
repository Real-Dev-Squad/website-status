import { Provider } from 'react-redux';
import { setupServer } from 'msw/node';
import { screen, waitFor } from '@testing-library/react';
import { store } from '@/app/store';
import PullRequestList from '@/components/PullRequestList';
import { renderWithRouter } from '@/test_utils/createMockRouter';
import { mockGetOpenPrs } from '../../../../__mocks__/db/prs';
import handlers from '../../../../__mocks__/handlers';

const server = setupServer(...handlers);

beforeAll(() => {
    server.listen({ onUnhandledRequest: 'error' });
});

beforeEach(() => {
    server.resetHandlers();
});

afterAll(() => {
    server.close();
});

describe('test pull request list component', function () {
    it('renders open pull requests', async function () {
        const { findByText } = renderWithRouter(
            <Provider store={store()}>
                <PullRequestList prType="open" />
            </Provider>
        );

        const titles = [
            'Tasks',
            'Issues',
            'Mine',
            'Open PRs',
            'Stale PRs',
            'Idle Users',
        ];

        titles.forEach((title) => {
            const titleOption = screen.getByRole('button', { name: title });
            expect(titleOption).not.toBeUndefined();
            expect(titleOption).toBeInTheDocument();
        });

        const prs = mockGetOpenPrs.pullRequests;

        await waitFor(async () => {
            const loadedElement = await findByText(prs[0].title);
            expect(loadedElement).toBeInTheDocument();
        });

        prs.forEach((pr) => {
            const prTitle = screen.getByText(pr.title);
            expect(prTitle).toBeInTheDocument();
        });
    });
});
