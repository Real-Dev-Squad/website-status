import { fireEvent, screen, waitFor } from '@testing-library/react';

import { renderWithRouter } from '@/test_utils/createMockRouter';

import ProgressForm from '@/components/ProgressForm/ProgressForm';
import { questions } from '@/constants/ProgressUpdates';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { setupServer } from 'msw/node';
import handlers from '../../../../__mocks__/handlers';
import { ToastContainer } from 'react-toastify';

const mockQuestion = [
    {
        id: 0,
        name: 'test-question',
        question: 'Something to test',
    },
];
const server = setupServer(...handlers);

describe('Progress form', function () {
    beforeAll(() => {
        server.listen();
    });
    afterEach(() => {
        server.resetHandlers();
    });
    afterAll(() => {
        server.close();
    });
    it('Should Render 3 input fields with appropriate data', function () {
        renderWithRouter(
            <Provider store={store()}>
                <ProgressForm questions={questions} />
            </Provider>
        );

        const textBoxes = screen.getAllByRole('textbox');
        expect(textBoxes).toHaveLength(3);
        const button = screen.getByRole('button') as HTMLButtonElement;
        expect(button).toBeInTheDocument();
        expect(button.type).toBe('submit');
    });

    it('Should change input values separately', function () {
        renderWithRouter(
            <Provider store={store()}>
                <ProgressForm questions={questions} />
            </Provider>
        );

        const textAreas = screen.getAllByRole(
            'textbox'
        ) as Array<HTMLInputElement>;

        textAreas.forEach((textArea) => {
            expect(textArea.value).toBe('');
        });

        fireEvent.change(textAreas[0], { target: { value: '123' } });
        expect(textAreas[0].value).toBe('123');

        fireEvent.change(textAreas[1], { target: { value: '234' } });
        expect(textAreas[1].value).toBe('234');

        fireEvent.change(textAreas[2], { target: { value: '567' } });
        expect(textAreas[2].value).toBe('567');

        expect(textAreas[0].value).toBe('123');
        expect(textAreas[1].value).toBe('234');
        expect(textAreas[2].value).toBe('567');
    });

    it('Should enable the button and able to make a api call when all values are entered', async function () {
        renderWithRouter(
            <Provider store={store()}>
                <ProgressForm questions={questions} />
                <ToastContainer />
            </Provider>,
            {
                push: jest.fn(),
            }
        );

        const textAreas = screen.getAllByRole(
            'textbox'
        ) as Array<HTMLInputElement>;

        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();

        expect(button).toHaveAttribute('disabled');

        fireEvent.change(textAreas[0], { target: { value: '123' } });
        fireEvent.change(textAreas[1], { target: { value: '234' } });
        fireEvent.change(textAreas[2], { target: { value: '567' } });

        expect(button).not.toHaveAttribute('disabled');

        fireEvent.click(button);

        await Promise.all([
            waitFor(() =>
                expect(
                    screen.getByText('Task Progress saved successfully')
                ).toBeInTheDocument()
            ),
            waitFor(() =>
                expect(
                    screen.getByTestId('loading-spinner')
                ).toBeInTheDocument()
            ),
        ]);
    });

    it('onClick should not work in case of no inputs', async function () {
        renderWithRouter(
            <Provider store={store()}>
                <ProgressForm questions={questions} />
            </Provider>
        );

        const button = screen.getByRole('button');
        fireEvent.click(button);
        expect(button).toHaveAttribute('disabled');

        await waitFor(() =>
            expect(
                screen.queryByText('Task Progress saved successfully')
            ).toBeNull()
        );
    });

    it('tests for default case in reducer', function () {
        renderWithRouter(
            <Provider store={store()}>
                <ProgressForm questions={mockQuestion} />
            </Provider>
        );

        const textArea = screen.getByRole('textbox') as HTMLInputElement;

        fireEvent.change(textArea, { target: { value: '123' } });
        expect(textArea.value).toBe('');
    });
});
