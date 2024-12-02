import { render, screen } from '@testing-library/react';
import InputWithQuestions from '@/components/ProgressForm/InputWithQuestions';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

const name = 'Test-Question';
const func = jest.fn();

describe('Input field with label', function () {
    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({
            query: {
                dev: 'true',
            },
        });
    });

    it('Should render an input field with the appropriate label in dev mode', function () {
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

    it('Should render an input field with the appropriate label in production mode', function () {
        (useRouter as jest.Mock).mockReturnValue({
            query: {
                dev: 'false',
            },
        });

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
