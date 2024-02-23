import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Option from '@/components/tasks/TaskSearchDev/Suggestion/Option';

describe('Option component', () => {
    const mockOnClickHandler = jest.fn();
    const mockSuggestion = { title: 'this is a long title' };

    it('should render correctly', () => {
        const { getByTestId } = render(
            <Option
                idx={0}
                onClickHandler={mockOnClickHandler}
                suggestion={mockSuggestion}
                activeSuggestionIndex={0}
            />
        );

        const optionElement = getByTestId('option');
        expect(optionElement).toBeInTheDocument();
        expect(optionElement).toHaveTextContent('title: this is a long title');
    });

    it('should call onClickHandler when clicked', () => {
        const { getByTestId } = render(
            <Option
                idx={0}
                onClickHandler={mockOnClickHandler}
                suggestion={mockSuggestion}
                activeSuggestionIndex={0}
            />
        );

        const optionElement = getByTestId('option');
        fireEvent.click(optionElement);
        expect(mockOnClickHandler).toHaveBeenCalledTimes(1);
        expect(mockOnClickHandler).toHaveBeenCalledWith(0);
    });

    it('should be selected if active', () => {
        const { getByTestId } = render(
            <Option
                idx={0}
                onClickHandler={mockOnClickHandler}
                suggestion={mockSuggestion}
                activeSuggestionIndex={0}
            />
        );

        const optionElement = getByTestId('option');
        expect(optionElement).toHaveClass('selected-suggestion');
    });
});
