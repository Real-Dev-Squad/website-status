import { render } from '@testing-library/react';
import Card from '@/components/issues/Card';
import MarkdownRenderer from '@/components/MarkdownRenderer/MarkdownRenderer';
import { IssueItem } from '@/interfaces/issueItem.type';

const issue_one: IssueItem = {
    html_url: 'https://github.com/dummy-owner/dummy-repo/issues/11',
    id: 732825067,
    title: 'Dummy issue',
    user: {
        login: 'dummyuser',
        html_url: 'https://github.com/ankushdharkar',
    },
    labels: [],
    state: 'open',
    assignee: {
        login: 'dummyassignee',
        html_url: 'https://github.com/dummyassignee',
    },
    created_at: '2020-10-30T02:08:48Z',
    body: null,
};
const issue_two: IssueItem = {
    html_url: 'https://github.com/dummy-owner/dummy-repo/issues/11',
    id: 732825067,
    title: 'Dummy issue',
    user: {
        login: 'dummyuser',
        html_url: 'https://github.com/ankushdharkar',
    },
    labels: [],
    state: 'open',
    assignee: {
        login: 'dummyassignee',
        html_url: 'https://github.com/dummyassignee',
    },
    created_at: '2020-10-30T02:08:48Z',
    body: 'Dummy issue description',
};

describe('Issue card', () => {
    test('Should render issue information correctly', () => {
        const screen = render(<Card issue={issue_one} />);

        expect(screen.getByText(issue_one.title)).toBeInTheDocument();
        expect(screen.getByText(issue_one.html_url)).toBeInTheDocument();
        expect(screen.getByRole('button')).toHaveTextContent('Convert to task');
    });

    test('Should render issue created by information correctly', () => {
        const screen = render(<Card issue={issue_one} />);
        const date = new Date(issue_one.created_at).toDateString();
        const issueUser = screen.getByText(issue_one.user.login);
        expect(screen.getByText(`Opened on ${date} by`)).toBeInTheDocument();
        expect(issueUser).toBeInTheDocument();
        expect(issueUser).toHaveAttribute('href', issue_one.user.html_url);
    });

    test('Should render the assignee information correctly', () => {
        const screen = render(<Card issue={issue_one} />);
        const assignee = screen.getByText(issue_one.assignee?.login);
        expect(assignee).toBeInTheDocument();
        expect(assignee).toHaveAttribute('href', issue_one.assignee?.html_url);
    });

    test('Should render the MarkdownRenderer component with the correct content', () => {
        const screen = render(
            <MarkdownRenderer
                content={issue_one.body ?? 'No description provided.'}
            />
        );
        const contentElement = screen.getByText(
            issue_one.body ?? 'No description provided.'
        );
        expect(contentElement).toBeInTheDocument();
    });

    test('Should render the MarkdownRenderer component with the correct content', () => {
        const screen = render(<Card issue={issue_two} />);
        const contentElement = screen.getByText(
            issue_two.body ?? 'No description provided.'
        );
        expect(contentElement).toBeInTheDocument();
    });
});
