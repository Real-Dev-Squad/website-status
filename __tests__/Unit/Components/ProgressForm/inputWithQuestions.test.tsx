import { render, screen } from '@testing-library/react';
import InputWithQuestions from '@/components/ProgressForm/InputWithQuestions';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

const name = 'Test-Question';
const func = jest.fn();

describe('Input field with label', () => {
    beforeEach(() => {
        (useRouter as jest.Mock).mockImplementation(() => ({
            query: { dev: 'false' },
        }));
    });

    it('Should render a input field with appropriate label', () => {
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

    it('Should render with dev mode', () => {
        (useRouter as jest.Mock).mockImplementation(() => ({
            query: { dev: 'true' },
        }));

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
