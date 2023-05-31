import { render } from '@testing-library/react';
import Card from '@/components/issues/Card';
import MarkdownRenderer from '@/components/MarkdownRenderer/MarkdownRenderer';
import Markdown from 'markdown-to-jsx';

import {
    issueResponseNullBody,
    issuesResponseSearchedWithQuery,
} from '../../../../__mocks__/db/issues';

describe('Issue card', () => {
    test('Should render issue information correctly', () => {
        const screen = render(
            <Card issue={issuesResponseSearchedWithQuery[0]} />
        );

        expect(
            screen.getByText(issuesResponseSearchedWithQuery[0].title)
        ).toBeInTheDocument();
        expect(
            screen.getByText(issuesResponseSearchedWithQuery[0].html_url)
        ).toBeInTheDocument();
        expect(screen.getByRole('button')).toHaveTextContent('Convert to task');
    });

    test('Should render issue created by information correctly', () => {
        const screen = render(
            <Card issue={issuesResponseSearchedWithQuery[0]} />
        );
        const date = new Date(
            issuesResponseSearchedWithQuery[0].created_at
        ).toDateString();
        const issueUser = screen.getByText(
            issuesResponseSearchedWithQuery[0].user.login
        );
        expect(screen.getByText(`Opened on ${date} by`)).toBeInTheDocument();
        expect(issueUser).toBeInTheDocument();
        expect(issueUser).toHaveAttribute(
            'href',
            issuesResponseSearchedWithQuery[0].user.html_url
        );
    });

    test('Should render the assignee information correctly', () => {
        const screen = render(
            <Card issue={issuesResponseSearchedWithQuery[0]} />
        );
        const assignee = screen.getByText(
            issuesResponseSearchedWithQuery[0].assignee?.login
        );
        expect(assignee).toBeInTheDocument();
        expect(assignee).toHaveAttribute(
            'href',
            issuesResponseSearchedWithQuery[0].assignee?.html_url
        );
    });

    test('Should render "No description provided." if the issue body is null', () => {
        const screen = render(
            <MarkdownRenderer
                content={
                    issueResponseNullBody.body ?? 'No description provided.'
                }
            />
        );
        const contentElement = screen.getByText(
            issueResponseNullBody.body ?? 'No description provided.'
        );
        expect(contentElement).toBeInTheDocument();
    });

    test('Should render the MarkdownRenderer component with the correct content', () => {
        const body = issuesResponseSearchedWithQuery[0].body;
        const screen = render(<MarkdownRenderer content={body} />);
        const bodyElement = screen.getByText(
            'One-Click Issue To Task Conversion- v1 Release'
        );
        const markdownElement = screen.getByText('Closes #92');
        const markdownElement2 = screen.getByText(
            'The following sub-tasks are to be completed to release one-click issue to task conversion feature to main branch'
        );

        expect(bodyElement).toBeInTheDocument();
        expect(markdownElement).toBeInTheDocument();
        expect(markdownElement2).toBeInTheDocument();
    });
});
