import { render, fireEvent, screen } from '@testing-library/react';
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

        expect(screen.queryByTestId('selected-option')).toBeInTheDocument();

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

        expect(screen?.queryByTestId('options')).toHaveClass('show');
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

    test('handler should not be called when event target is not a child of container', () => {
        const value = sampleOptions[0];
        const onChangeMock = jest.fn();
        render(
            <Select
                value={value}
                onChange={onChangeMock}
                options={sampleOptions}
            />
        );
        const selectContainer = screen.getByTestId('selected-option');

        // Simulate a keyboard event with a target that is not a child of the container
        fireEvent.keyDown(document.body, { key: 'Enter' });

        // The handler function should not be called since the target is not a child of the container
        expect(onChangeMock).not.toHaveBeenCalled();

        // Handler should be called when the target is a child of the container
        fireEvent.click(selectContainer);
        // The dropdown should be visible after the key press.
        expect(screen?.queryByTestId('options')).toHaveClass('show');
    });

    test('navigates options with arrow keys', () => {
        const value = sampleOptions[0];
        const onChangeMock = jest.fn();
        render(
            <Select
                value={value}
                onChange={onChangeMock}
                options={sampleOptions}
            />
        );
        const selectContainer = screen.getByRole('button');
        // Simulate pressing the "ArrowDown" key to open the dropdown.
        fireEvent.keyDown(selectContainer, {
            key: 'ArrowDown',
            code: 'ArrowDown',
        });
        // The dropdown should be visible after the key press.
        expect(screen.getByTestId('options')).toBeVisible();

        // Simulate pressing the "ArrowDown" key to open the dropdown.
        fireEvent.keyDown(selectContainer, {
            key: 'ArrowDown',
            code: 'ArrowDown',
        });

        // The second option should be highlighted.
        expect(screen.getByText('Option 2')).toHaveClass('highlighted');
    });

    test('using escape key for closing the options', () => {
        const value = sampleOptions[0];
        const onChangeMock = jest.fn();
        render(
            <Select
                value={value}
                onChange={onChangeMock}
                options={sampleOptions}
            />
        );
        const selectContainer = screen.getByRole('button');
        fireEvent.click(selectContainer);

        // The dropdown should be visible after the key press.
        expect(screen.getByTestId('options')).toBeVisible();

        // Simulate pressing the "Escape" key to close the dropdown.
        fireEvent.keyDown(selectContainer, { key: 'Escape', code: 'Escape' });

        //  The dropdown should be closed after selecting an option.
        expect(screen?.queryByTestId('options')).not.toHaveClass('show');
    });

    test('handler should close the dropdown when the container loses focus (onBlur event)', () => {
        const value = sampleOptions[0];
        const onChangeMock = jest.fn();
        render(
            <Select
                value={value}
                onChange={onChangeMock}
                options={sampleOptions}
            />
        );
        const selectContainer = screen.getByTestId('selected-option');
        const optionsList = screen.getByTestId('options');

        // Open the dropdown by simulating a click on the select container
        fireEvent.click(selectContainer);
        expect(optionsList).toBeVisible();

        // Simulate blur event on the select container
        fireEvent.blur(selectContainer);

        // The dropdown should be closed after the container loses focus
        expect(screen?.queryByTestId('options')).not.toHaveClass('show');
    });

    test('handler should set the highlighted index when an option is hovered (onMouseEnter event)', () => {
        const value = sampleOptions[0];
        const onChangeMock = jest.fn();
        render(
            <Select
                value={value}
                onChange={onChangeMock}
                options={sampleOptions}
            />
        );
        const optionElement = screen.getByText('Option 2');

        // Simulate mouse enter on the option element
        fireEvent.mouseEnter(optionElement);

        // The highlighted index should be set to the index of the hovered option
        expect(optionElement).toHaveClass('highlighted');
    });
});
