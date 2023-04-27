import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { CardTitleWrapper } from '@/components/tasks/card/CardTitleWrapper';
// import { renderWithRouter } from '@/test_utils/createMockRouter';
// import { Provider } from 'react-redux';
// import { store } from '@/app/store';

const titleProps = {
    url: 'https://realdevsquad.com/tasks/6KhcLU3yr45dzjQIVm0J/details',
    taskID: '6KhcLU3yr45dzjQIVm0J',
};

describe('CardTitleWrapper', () => {
    // test('Card title should not be a link when there is no feature flag',()=>{

    // });

    test('Card title should  be a link when there is  feature flag', () => {
        render(<CardTitleWrapper condition={true} {...titleProps} />);
        waitFor(() => {
            // const titleElement = screen.getByText(
            //     /mobile app signin github deeplinking/i
            // );
            // console.log(titleElement, 'title element');
            expect(
                screen.getByRole('link', {
                    name: /mobile app signin github deeplinking/i,
                })
            ).toHaveAttribute(
                'href',
                'https://realdevsquad.com/tasks/6KhcLU3yr45dzjQIVm0J/details'
            );
        });

    

        // waitFor(() => {
        //     // screen.debug();
        //     const title =  screen.getByText(/mobile app signin github deeplinking/i);
        //     console.log(title, 'title inside');

        //     // expect(
        //     //     screen.getByText(/kj vuyvjh/i)
        //     // ).toBeInTheDocument();
        // });
    });
});
