import { render } from '@testing-library/react';
import Card from '@/components/issues/Card';
import MarkdownRenderer from '@/components/MarkdownRenderer/MarkdownRenderer';
import { IssueItem } from '@/interfaces/issueItem.type';

const DEFAULT_PROPS: IssueItem = {
    html_url: 'https://github.com/Real-Dev-Squad/todo-action-items/issues/11',
    id: 732825067,
    title: 'Status view to all features being built for our app',
    user: {
        login: 'ankushdharkar',
        html_url: 'https://github.com/ankushdharkar',
    },
    labels: [],
    state: 'open',
    assignee: {
        login: 'whyDontI',
        html_url: 'https://github.com/whyDontI',
    },
    created_at: '2020-10-30T02:08:48Z',
};

describe('Issue card', () => {
    test('Should render issue information correctly', () => {
        const screen = render(<Card issue={DEFAULT_PROPS} />);

        expect(screen.getByText(DEFAULT_PROPS.title)).toBeInTheDocument();
        expect(screen.getByText(DEFAULT_PROPS.html_url)).toBeInTheDocument();
        expect(screen.getByRole('button')).toHaveTextContent('Convert to task');
    });

    test('Should render issue created by information correctly', () => {
        const screen = render(<Card issue={DEFAULT_PROPS} />);
        const date = new Date(DEFAULT_PROPS.created_at).toDateString();
        const issueUser = screen.getByText(DEFAULT_PROPS.user.login);

        expect(screen.getByText(`Opened on ${date} by`)).toBeInTheDocument();
        expect(issueUser).toBeInTheDocument();
        expect(issueUser).toHaveAttribute('href', DEFAULT_PROPS.user.html_url);
    });

    test('Should render the assignee information correctly', () => {
        const screen = render(<Card issue={DEFAULT_PROPS} />);

        const assignee = screen.getByText(DEFAULT_PROPS.assignee?.login);

        expect(assignee).toBeInTheDocument();
        expect(assignee).toHaveAttribute(
            'href',
            DEFAULT_PROPS.assignee?.html_url
        );
    });

    test('Should render the MarkdownRenderer component with the correct content', () => {
        const screen = render(
            <MarkdownRenderer
                content={DEFAULT_PROPS.body ?? 'No description provided.'}
            />
        );

        const contentElement = screen.getByText(
            DEFAULT_PROPS.body ?? 'No description provided.'
        );

        expect(contentElement).toBeInTheDocument();
    });
});
