import { waitFor, fireEvent } from '@testing-library/react';
import Issues from '@/pages/issues';
import { store } from '@/app/store';
import { Provider } from 'react-redux';
import { renderWithRouter } from '@/test_utils/createMockRouter';
import { setupServer } from 'msw/node';
import handlers from '../../../__mocks__/handlers';
import { issuesNoDataFoundHandler } from '../../../__mocks__/handlers/issues.handler';

const server = setupServer(...handlers);

beforeAll(() => {
    server.listen({ onUnhandledRequest: 'error' });
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Issues Page', () => {
    const inputPlaceholderText = 'Enter query string to search issues';
    const buttonAttribute = {
        name: 'Submit',
    };
    const loadingText = 'Loading...';

    it('Should render search fields in issues page properly', async () => {
        const { getByPlaceholderText, getByRole, getByText } = renderWithRouter(
            <Provider store={store()}>
                <Issues />
            </Provider>
        );

        const inputElement = getByPlaceholderText(inputPlaceholderText);
        expect(inputElement).toBeInTheDocument();

        const buttonElement = getByRole('button', buttonAttribute);
        expect(buttonElement).toBeInTheDocument();

        // button should be disabled when the data is loading
        const loadingElement = getByText(loadingText);
        expect(loadingElement).toBeInTheDocument();
        expect(buttonElement).toBeDisabled();
    });

    it('should fire correct API when issues searched with query string', async () => {
        const { findByText, findByPlaceholderText, findByRole } =
            renderWithRouter(
                <Provider store={store()}>
                    <Issues />
                </Provider>
            );

        // Test for issues title when API called without search query param
        const issueTitleBeforeQuerySearch =
            'Status view to all features being built for our app';
        const issueTitleBeforeQuerySearchElement = await findByText(
            issueTitleBeforeQuerySearch
        );
        expect(issueTitleBeforeQuerySearchElement).toBeInTheDocument();

        // trigger change and click event to search issues with query param
        const inputElement = await findByPlaceholderText(inputPlaceholderText);
        const buttonElement = await findByRole('button', buttonAttribute);

        fireEvent.change(inputElement, { target: { value: 'website' } });
        expect(inputElement).toHaveAttribute('value', 'website');
        fireEvent.click(buttonElement);

        await waitFor(async () => {
            const issueTitleAfterQuerySearch =
                'One-Click Issue to Task Conversion v1 Release';
            const issueTitleAfterQuerySearchElement = await findByText(
                issueTitleAfterQuerySearch
            );
            expect(issueTitleAfterQuerySearchElement).toBeInTheDocument();
        });
    });

    it('Should render "No Issues Found" when no issues are returned from the API', async () => {
        server.use(issuesNoDataFoundHandler);
        const { findByText, queryByText, findByPlaceholderText, findByRole } =
            renderWithRouter(
                <Provider store={store()}>
                    <Issues />
                </Provider>
            );

        const messageElement = await findByText('No Issues Found');
        expect(messageElement).toBeInTheDocument();

        const loadingElement = queryByText(loadingText);
        expect(loadingElement).not.toBeInTheDocument();

        // submit button should be disabled when the input search text is empty
        const inputElement = await findByPlaceholderText(inputPlaceholderText);
        expect(inputElement).toHaveAttribute('value', '');

        const buttonElement = await findByRole('button', buttonAttribute);
        expect(buttonElement).toBeDisabled();
    });
});
