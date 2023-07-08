import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { ConditionalLinkWrapper } from '@/components/tasks/card/ConditionalLinkWrapper';
import { renderWithRouter } from '@/test_utils/createMockRouter';

const titleProps = {
    url: 'https://realdevsquad.com/tasks/6KhcLU3yr45dzjQIVm0J/details',
    taskID: '6KhcLU3yr45dzjQIVm0J',
};

describe('ConditionalLinkWrapper', () => {
    it('renders children when isTaskDetailsPageLinkEnabled is false', () => {
        const isTaskDetailsPageLinkEnabled = false;
        const { getByText } = render(
            <ConditionalLinkWrapper
                shouldDisplayLink={isTaskDetailsPageLinkEnabled}
            >
                Card title
            </ConditionalLinkWrapper>
        );

        const textElement = getByText('Card title');
        expect(textElement).toBeInTheDocument();
    });

    test('renders children as a link when isTaskDetailsPageLinkEnabled is true and redirectingPath is provided', () => {
        const isTaskDetailsPageLinkEnabled = true;
        render(
            <ConditionalLinkWrapper
                shouldDisplayLink={isTaskDetailsPageLinkEnabled}
                {...titleProps}
                redirectingPath={titleProps.url}
                taskId={titleProps.taskID}
            >
                Card title
            </ConditionalLinkWrapper>
        );
        waitFor(() => {
            expect(
                screen.getByRole('link', {
                    name: /mobile app signin github deeplinking/i,
                })
            ).toHaveAttribute(
                'href',
                'https://realdevsquad.com/tasks/6KhcLU3yr45dzjQIVm0J/details'
            );
            const textElement = screen.getByText('Card title');
            expect(textElement).toBeInTheDocument();
        });
    });
    it('does not render children as a link when isTaskDetailsPageLinkEnabled is true but redirectingPath is not provided', () => {
        const isTaskDetailsPageLinkEnabled = true;

        const { queryByTestId } = renderWithRouter(
            <ConditionalLinkWrapper
                shouldDisplayLink={isTaskDetailsPageLinkEnabled}
            >
                Card title
            </ConditionalLinkWrapper>
        );

        const linkElement = queryByTestId('link');
        expect(linkElement).not.toBeInTheDocument();
    });
});
