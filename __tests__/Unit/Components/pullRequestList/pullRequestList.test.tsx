import { screen } from '@testing-library/react';
import PullRequestList from '@/components/PullRequestList';
import { renderWithRouter } from '@/test_utils/createMockRouter';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { mockGetOpenPrs } from '../../../../__mocks__/db/prs';

describe('test pull request list component', function () {
    it('renders open pull requests', function () {
        renderWithRouter(
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
        prs.forEach((pr) => {
            const prTitle = screen.getByText(pr.title);
            expect(prTitle).toBeInTheDocument();
        });
    });
});
