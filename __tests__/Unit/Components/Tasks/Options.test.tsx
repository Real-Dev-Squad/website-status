import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Options from '@/components/tasks/TaskSearch/Suggestion/Options';
import { TaskSearchOption } from '@/interfaces/searchOptions.type';

describe('Option component', () => {
    const onSuggestionSelected = jest.fn();
    const activeSuggestionIndex = 0;

    test('renders suggestions when suggestions array has elements', () => {
        const suggestions: Array<TaskSearchOption> = [
            { title: 'This is a title' },
            { assignee: 'joy-gupta' },
            { status: 'in-progress' },
        ];

        const { getByText } = render(
            <Options
                style={{ left: 2, maxWidth: 3, top: 3 }}
                suggestions={suggestions}
                activeSuggestionIndex={activeSuggestionIndex}
                onSuggestionSelected={onSuggestionSelected}
            />
        );

        suggestions.forEach((suggestion) => {
            const key = Object.keys(suggestion)[0];
            const value = suggestion[key];
            expect(getByText(`${key}: ${value}`)).toBeInTheDocument();
        });
    });

    test('renders "No suggestion found" when suggestions array is empty', () => {
        const suggestions: Array<TaskSearchOption> = [];

        const { getByText } = render(
            <Options
                style={{ left: 2, maxWidth: 3, top: 3 }}
                suggestions={suggestions}
                activeSuggestionIndex={activeSuggestionIndex}
                onSuggestionSelected={onSuggestionSelected}
            />
        );

        expect(getByText('No suggestion found')).toBeInTheDocument();
    });

    test('calls onSuggestionSelected with correct suggestion when option is clicked', () => {
        const suggestions: Array<TaskSearchOption> = [
            { title: 'This is a title' },
            { assignee: 'joy-gupta' },
            { status: 'in-progress' },
        ];

        const { getByText } = render(
            <Options
                style={{ left: 2, maxWidth: 3, top: 3 }}
                suggestions={suggestions}
                activeSuggestionIndex={activeSuggestionIndex}
                onSuggestionSelected={onSuggestionSelected}
            />
        );

        fireEvent.click(getByText('title: This is a title'));
        expect(onSuggestionSelected).toHaveBeenCalledWith(0);
    });
    test('should apply styles to suggestion provide through props', () => {
        const suggestions: Array<TaskSearchOption> = [
            { title: 'This is a title' },
            { assignee: 'joy-gupta' },
            { status: 'in-progress' },
        ];

        const { getByTestId } = render(
            <Options
                style={{ left: 10, maxWidth: 500, top: 20 }}
                suggestions={suggestions}
                activeSuggestionIndex={activeSuggestionIndex}
                onSuggestionSelected={onSuggestionSelected}
            />
        );
        const container = getByTestId('suggestion-box-container');
        expect(container.style.left).toBe('10px');
        expect(container.style.maxWidth).toBe('500px');
        expect(container.style.width).toBe('auto');
        expect(container.style.top).toBe('20px');
    });
});
