import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import RenderPills, {
    PillProps,
} from '@/components/tasks/TaskSearchDev/Suggestion/Pill';

describe('RenderPills', () => {
    const setNewPillValue = jest.fn();
    const handleKeyPress = jest.fn();
    const removePill = jest.fn();
    const setSelectedPill = jest.fn();
    test('should truncate the text if it is too long', () => {
        const props: PillProps = {
            idx: 0,
            option: {
                title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
            },
            newPillValue: '',
            setNewPillValue,
            handleKeyPress,
            removePill,
            selectedPill: false,
            pillToBeRemoved: -1,
            setSelectedPill,
        };

        const { container } = render(<RenderPills {...props} />);

        const parentPill = container.getElementsByClassName('parent-pill');
        const elementWithTestId = parentPill[0].querySelector(
            '[data-testid="pill-content"]'
        );
        expect(elementWithTestId).toHaveClass('pill-content');
    });

    test('should render editable input and not span in edit mode', () => {
        const props: PillProps = {
            idx: 0,
            option: {
                title: 'Make UI for task page better',
            },
            newPillValue: '',
            setNewPillValue,
            handleKeyPress,
            removePill,
            selectedPill: 0,
            pillToBeRemoved: -1,
            setSelectedPill,
        };

        const { getByTestId } = render(<RenderPills {...props} />);

        const pillInput = getByTestId('pill-input');
        expect(pillInput).toBeInTheDocument();
        fireEvent.change(pillInput, {
            target: { value: 'M' },
        });
        expect(setNewPillValue).toBeCalledTimes(1);
        expect(setNewPillValue).toHaveBeenCalledWith('M');

        expect(screen.queryByTestId('pill-content')).not.toBeInTheDocument();
    });
    it('pill should be clickable', () => {
        const props: PillProps = {
            idx: 0,
            option: {
                title: 'UI changes',
            },
            newPillValue: '',
            setNewPillValue,
            handleKeyPress,
            removePill,
            selectedPill: false,
            pillToBeRemoved: -1,
            setSelectedPill,
        };

        const { getByTestId } = render(<RenderPills {...props} />);
        const pillContent = getByTestId('pill-content');
        fireEvent.click(pillContent);
        expect(setNewPillValue).toBeCalled();
        expect(setNewPillValue).toBeCalledWith('title:UI changes');
        expect(setSelectedPill).toBeCalled();
        expect(setSelectedPill).toBeCalledWith(0);
    });
    it('pill should be highlighted when it is about to delete', () => {
        const props: PillProps = {
            idx: 0,
            option: {
                title: 'UI changes',
            },
            newPillValue: '',
            setNewPillValue,
            handleKeyPress,
            removePill,
            selectedPill: false,
            pillToBeRemoved: 0,
            setSelectedPill,
        };

        const { getByTestId } = render(<RenderPills {...props} />);
        const pillContent = getByTestId('parent-pill');
        expect(pillContent).toHaveClass('highlight');
    });

    it('should handle backspace', () => {
        const props: PillProps = {
            idx: 0,
            option: {
                title: 'Make UI for task page better',
            },
            newPillValue: '',
            setNewPillValue,
            handleKeyPress,
            removePill,
            selectedPill: 0,
            pillToBeRemoved: -1,
            setSelectedPill,
        };
        const { getByTestId } = render(<RenderPills {...props} />);
        const pillInput = getByTestId('pill-input');
        expect(pillInput).toBeInTheDocument();

        // Keeping single character to test backspace
        fireEvent.change(pillInput, { target: { value: 'M' } });
        fireEvent.keyDown(pillInput, { key: 'Backspace' });
        expect(setNewPillValue).toBeCalled();
        expect(handleKeyPress).toHaveBeenCalledWith(
            expect.objectContaining({ key: 'Backspace' })
        );
    });

    it('should handle Escape', () => {
        const props: PillProps = {
            idx: 0,
            option: {
                title: 'Make UI for task page better',
            },
            newPillValue: '',
            setNewPillValue,
            handleKeyPress,
            removePill,
            selectedPill: 0,
            pillToBeRemoved: -1,
            setSelectedPill,
        };
        const { getByTestId } = render(<RenderPills {...props} />);
        const pillInput = getByTestId('pill-input');
        expect(pillInput).toBeInTheDocument();

        // Keeping single character to test backspace
        fireEvent.keyDown(pillInput, { key: 'Escape' });
        expect(setNewPillValue).toBeCalled();
        expect(handleKeyPress).toHaveBeenCalledWith(
            expect.objectContaining({ key: 'Escape' })
        );
    });
    it('delete button should be clickable', () => {
        const props: PillProps = {
            idx: 0,
            option: {
                title: 'Make UI for task page better',
            },
            newPillValue: '',
            setNewPillValue,
            handleKeyPress,
            removePill,
            selectedPill: false,
            pillToBeRemoved: -1,
            setSelectedPill,
        };

        const { getByTestId } = render(<RenderPills {...props} />);
        const deleteButton = getByTestId('delete-pill-button');
        fireEvent.click(deleteButton);
        expect(removePill).toBeCalled();
        expect(removePill).toBeCalledTimes(1);
    });
});
