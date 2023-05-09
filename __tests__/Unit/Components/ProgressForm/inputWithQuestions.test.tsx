import InputWithQuestions from '@/components/ProgressForm/InputWithQuestions';
import { fireEvent, render, screen } from '@testing-library/react';

const name = 'Test-Question';

describe('Input field with label', function () {
    it('Should render a input field with appropriate label', function () {
        render(
            <InputWithQuestions
                name={name}
                question="This is a test question"
            />
        );
        const input = screen.getByLabelText(name);
        expect(input).toBeInTheDocument();
    });

    it('Should change the value of textArea when typed into', function () {
        render(
            <InputWithQuestions
                name="Test-Question"
                question="This is a test question"
            />
        );
        const textArea = screen.getByRole('textbox') as HTMLInputElement;
        expect(textArea?.value).toBe('');
        fireEvent.change(textArea, { target: { value: '123' } });
        expect(textArea.value).toBe('123');
    });
});
