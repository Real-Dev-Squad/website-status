import { fireEvent, render, waitFor } from '@testing-library/react';
import Card from '@/components/issues/Card';
import MarkdownRenderer from '@/components/MarkdownRenderer/MarkdownRenderer';

import {
    issueResponseNullBody,
    issuesResponseSearchedWithQuery,
} from '../../../../__mocks__/db/issues';
import { renderWithRouter } from '@/test_utils/createMockRouter';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import fetch from '@/helperFunctions/fetch';

jest.mock('@/helperFunctions/fetch');
jest.mock('@/hooks/useUserData', () => {
    return () => ({
        data: {
            roles: {
                admin: true,
                super_user: false,
            },
        },
        isUserAuthorized: true,
        isSuccess: true,
    });
});

describe('Issue card', () => {
    test('Should render issue title correctly', () => {
        const screen = render(
            <MarkdownRenderer
                content={issuesResponseSearchedWithQuery[0].title}
            />
        );
        const titleElement = screen.getByText(
            'One-Click Issue to Task Conversion v1 Release'
        );
        expect(titleElement).toBeInTheDocument();
    });
    test('Should render issue information correctly', () => {
        const screen = renderWithRouter(
            <Provider store={store()}>
                <Card issue={issuesResponseSearchedWithQuery[0]} />
            </Provider>
        );
        expect(
            screen.getByText(issuesResponseSearchedWithQuery[0].html_url)
        ).toBeInTheDocument();
        expect(screen.getByRole('button')).toHaveTextContent('Convert to task');
    });

    test('Should render issue created by information correctly', () => {
        const screen = renderWithRouter(
            <Provider store={store()}>
                <Card issue={issuesResponseSearchedWithQuery[0]} />
            </Provider>
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
        const screen = renderWithRouter(
            <Provider store={store()}>
                <Card issue={issuesResponseSearchedWithQuery[0]} />
            </Provider>
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

    test('Should render action form when dev mode is enabled', () => {
        const screen = renderWithRouter(
            <Provider store={store()}>
                <Card issue={issuesResponseSearchedWithQuery[0]} />
            </Provider>,
            {
                query: { dev: 'true' },
            }
        );
        expect(screen.getByRole('button')).toHaveTextContent('Convert to Task');
    });
    test('should render issue card with convert to task button', () => {
        const screen = renderWithRouter(
            <Provider store={store()}>
                <Card issue={issuesResponseSearchedWithQuery[0]} />
            </Provider>,
            {
                query: { dev: 'true' },
            }
        );
        expect(screen.getByRole('button')).toHaveTextContent('Convert to Task');
    });
    test('should open a modal when button is clicked', () => {
        const screen = renderWithRouter(
            <Provider store={store()}>
                <Card issue={issuesResponseSearchedWithQuery[0]} />
            </Provider>,
            {
                query: { dev: 'true' },
            }
        );
        const convertToTaskButton = screen.getByText(/Convert to Task/i);
        fireEvent.click(convertToTaskButton);
        const taskRequestModalTitle = screen.getByText(/Task Request/i);
        expect(taskRequestModalTitle).toBeInTheDocument();
        const taskAssignmentModalTitle = screen.getByText(/Task Assignment/i);
        expect(taskAssignmentModalTitle).toBeInTheDocument();
    });
    test('should contain task request and assignment tabs', () => {
        const screen = renderWithRouter(
            <Provider store={store()}>
                <Card issue={issuesResponseSearchedWithQuery[0]} />
            </Provider>,
            {
                query: { dev: 'true' },
            }
        );
        const convertToTaskButton = screen.getByText(/Convert to Task/i);
        fireEvent.click(convertToTaskButton);
        const taskRequestTabButton = screen.getByText(/Task Request/i);
        fireEvent.click(taskRequestTabButton);
        const createRequestButton = screen.getByText(/Create Request/i);
        expect(createRequestButton).toBeInTheDocument();
        const taskAssignmentTabButton = screen.getByText(/Task Assignment/i);
        fireEvent.click(taskAssignmentTabButton);
        const assignTaskButton = screen.getByText(/Assign Task/i);
        expect(assignTaskButton).toBeInTheDocument();
    });
    test('should call create task request handler when create request button is clicked', async () => {
        const screen = renderWithRouter(
            <Provider store={store()}>
                <Card
                    issue={{
                        ...issuesResponseSearchedWithQuery[0],
                        taskExists: false,
                        taskId: undefined,
                    }}
                />
            </Provider>,
            {
                query: { dev: 'true' },
            }
        );
        const convertToTaskButton = screen.getByText(/Convert to Task/i);
        fireEvent.click(convertToTaskButton);
        const taskRequestTabButton = screen.getByText(/Task Request/i);
        fireEvent.click(taskRequestTabButton);
        const createRequestButton = screen.getByText(/Create Request/i);
        await waitFor(() => {
            fireEvent.click(createRequestButton);
        });
        expect(fetch).toHaveBeenCalled();
    });
});
