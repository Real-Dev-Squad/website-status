import { fireEvent, screen } from '@testing-library/react';

import { renderWithProviders } from '@/test-utils/renderWithProvider';

import ProgressForm from '@/components/ProgressForm/ProgressForm';
import { questions } from '@/constants/ProgressUpdates';

const mockOnClick = jest.fn();
const mockQuestion = [
    {
        id: 0,
        name: 'test-question',
        question: 'Something to test',
    },
];

describe('Progress form', function () {
    it('Should Render 3 input fields with appropriate data', function () {
        renderWithProviders(<ProgressForm questions={questions} />);

        const textBoxes = screen.getAllByRole('textbox');
        expect(textBoxes).toHaveLength(3);
        const button = screen.getByRole('button') as HTMLButtonElement;
        expect(button).toBeInTheDocument();
        expect(button.type).toBe('submit');
    });

    it('Should change input values separately', function () {
        renderWithProviders(<ProgressForm questions={questions} />);

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

    it('Should enable the button when all values are entered', function () {
        renderWithProviders(<ProgressForm questions={questions} />);

        const textAreas = screen.getAllByRole(
            'textbox'
        ) as Array<HTMLInputElement>;

        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();

        expect(button.className).toBe('buttonDisabled');

        fireEvent.change(textAreas[0], { target: { value: '123' } });
        fireEvent.change(textAreas[1], { target: { value: '234' } });
        fireEvent.change(textAreas[2], { target: { value: '567' } });

        expect(button.className).toBe('buttonEnabled');
    });

    it('Check if onClick is working', function () {
        renderWithProviders(<ProgressForm questions={questions} />);

        const button = screen.getByRole('button');

        button.onclick = mockOnClick;
        fireEvent.click(button);

        expect(mockOnClick).toBeCalledTimes(1);
    });

    it('tests for default case in reducer', function () {
        renderWithProviders(<ProgressForm questions={mockQuestion} />);

        const textArea = screen.getByRole('textbox') as HTMLInputElement;

        fireEvent.change(textArea, { target: { value: '123' } });
        expect(textArea.value).toBe('');
    });
});
