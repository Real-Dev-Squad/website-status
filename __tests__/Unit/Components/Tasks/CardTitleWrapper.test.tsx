import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { CardTitleWrapper } from '@/components/tasks/card/CardTitleWrapper';

const titleProps = {
    url: 'https://realdevsquad.com/tasks/6KhcLU3yr45dzjQIVm0J/details',
    taskID: '6KhcLU3yr45dzjQIVm0J',
};

describe('CardTitleWrapper', () => {
    test('Card title should be a link when there is feature flag', () => {
        render(<CardTitleWrapper condition={true} {...titleProps} />);
        waitFor(() => {
            expect(
                screen.getByRole('link', {
                    name: /mobile app signin github deeplinking/i,
                })
            ).toHaveAttribute(
                'href',
                'https://realdevsquad.com/tasks/6KhcLU3yr45dzjQIVm0J/details'
            );
        });
    });
});
