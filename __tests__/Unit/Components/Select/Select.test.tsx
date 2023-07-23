import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For additional DOM matchers
import { Select } from '@/components/Select';

const sampleOptions = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
];

const onSelectMock = jest.fn();
describe('Select', () => {
    test('renders with initial state', () => {
        const value = sampleOptions[0];
        render(
            <Select
                value={value}
                onChange={() => onSelectMock()}
                options={sampleOptions}
            />
        );

        expect(screen?.queryByTestId('selected-option')).toBeInTheDocument();

        expect(screen?.queryByTestId('options')).not.toHaveClass('show');
    });

    test('opens dropdown when clicked', () => {
        const value = sampleOptions[0];
        render(
            <Select
                value={value}
                onChange={() => onSelectMock()}
                options={sampleOptions}
            />
        );
        const selectContainer = screen?.getByRole('button', {
            name: value.label,
        });

        fireEvent.click(selectContainer);

        expect(screen?.getByTestId('options')).toBeVisible();
    });

    test('selects an option', () => {
        const value = sampleOptions[0];
        const onChangeMock = jest.fn();
        render(
            <Select
                value={value}
                onChange={onChangeMock}
                options={sampleOptions}
            />
        );

        const option2 = screen?.getByText('Option 2');
        fireEvent.click(option2);

        expect(onChangeMock).toHaveBeenCalledWith(sampleOptions[1]);
    });
});
