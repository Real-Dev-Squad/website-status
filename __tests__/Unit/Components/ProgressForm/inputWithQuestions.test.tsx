import InputWithQuestions from '@/components/ProgressForm/InputWithQuestions';
import { render, screen } from '@testing-library/react';

const name = 'Test-Question';
const func = jest.fn();

describe('Input field with label', function () {
    it('Should render a input field with appropriate label', function () {
        render(
            <InputWithQuestions
                name={name}
                question="This is a test question"
                value=""
                onChange={func}
            />
        );
        const input = screen.getByLabelText(name);
        expect(input).toBeInTheDocument();
    });
});
