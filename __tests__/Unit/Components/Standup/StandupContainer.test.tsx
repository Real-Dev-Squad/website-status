import StandUpContainer from '@/components/standup';
import { renderWithRouter } from '@/test_utils/createMockRouter';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import handlers from '../../../../__mocks__/handlers';
import {
    ERROR_MESSAGE,
    STANDUP_SUBMISSION_SUCCESS,
    STANDUP_ALREADY_SUBMITTED,
} from '@/constants/constants';
import { failedPostStandup } from '../../../../__mocks__/handlers/standup.handler';
import { ToastContainer } from 'react-toastify';
import * as SaveProgressHook from '@/app/services/progressesApi';
import moment from 'moment';

const server = setupServer(...handlers);

describe.only('StandupContainer', () => {
    beforeAll(() => {
        server.listen();
    });
    afterEach(() => {
        server.resetHandlers();
    });
    afterAll(() => {
        server.close();
    });

    test('should render  standup Form ', function () {
        const { container } = renderWithRouter(
            <Provider store={store()}>
                <StandUpContainer />
            </Provider>
        );
        screen.debug();
        const submitButton = screen.getByRole('button', { name: 'Submit' });
        const addButton = container.getElementsByClassName('addButton');
        expect(screen.getByText('Standup Update')).toBeInTheDocument();
        expect(screen.getByText('Yesterday')).toBeInTheDocument();
        expect(screen.getByText('Today')).toBeInTheDocument();
        expect(screen.getByText('Blocker')).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
        expect(addButton.length).toBe(3);
    });
});
