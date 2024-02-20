import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TaskSearch from '@/components/tasks/TaskSearch/TaskSearch';
import { Tab } from '@/interfaces/task.type';

jest.mock('@/utils/getChangedStatusName', () => ({
    getChangedStatusName: jest.fn((tab) => tab),
}));

describe('TaskSearch', () => {
    test('renders the search input', () => {
        const onSelect = jest.fn();
        const onInputChange = jest.fn();
        const onClickSearchButton = jest.fn();

        render(
            <TaskSearch
                onSelect={onSelect}
                inputValue=""
                onInputChange={onInputChange}
                onClickSearchButton={onClickSearchButton}
            />
        );

        const searchInput = screen.getByTestId('search-input');
        expect(searchInput).toBeInTheDocument();
    });

    test('calls onClickSearchButton when Search button is clicked', () => {
        const onSelect = jest.fn();
        const onInputChange = jest.fn();
        const onClickSearchButton = jest.fn();

        render(
            <TaskSearch
                onSelect={onSelect}
                inputValue=""
                onInputChange={onInputChange}
                onClickSearchButton={onClickSearchButton}
            />
        );
        const searchInput = screen.getByTestId('search-input');
        fireEvent.change(searchInput, { target: { value: 'is:active' } });
        const searchButton = screen.getByText('Search');
        fireEvent.click(searchButton);
        expect(onClickSearchButton).toHaveBeenCalledTimes(1);
    });

    test('opens the filter modal when the Filter button is clicked', () => {
        const onSelect = jest.fn();
        const onInputChange = jest.fn();
        const onClickSearchButton = jest.fn();

        render(
            <TaskSearch
                onSelect={onSelect}
                inputValue=""
                onInputChange={onInputChange}
                onClickSearchButton={onClickSearchButton}
            />
        );

        const filterButton = screen.getByText('Filter');
        fireEvent.click(filterButton);
        const modalTitle = screen.getByTestId('filter-modal');
        expect(modalTitle).toBeInTheDocument();
    });

    test('calls onInputChange when the search input value changes', () => {
        const onSelect = jest.fn();
        const onInputChange = jest.fn();
        const onClickSearchButton = jest.fn();

        render(
            <TaskSearch
                onSelect={onSelect}
                inputValue=""
                onInputChange={onInputChange}
                onClickSearchButton={onClickSearchButton}
            />
        );

        const searchInput = screen.getByTestId('search-input');
        fireEvent.change(searchInput, { target: { value: 'is:merged' } });
        expect(onInputChange).toHaveBeenCalledWith('is:merged');
    });

    test('calls onInputChange when the search input value changes when dev is true', () => {
        const onSelect = jest.fn();
        const onInputChange = jest.fn();
        const onClickSearchButton = jest.fn();

        render(
            <TaskSearch
                dev={false}
                onSelect={onSelect}
                inputValue=""
                onInputChange={onInputChange}
                onClickSearchButton={onClickSearchButton}
            />
        );

        const searchInput = screen.getByTestId('search-input');
        fireEvent.change(searchInput, { target: { value: 'is:done' } });
        expect(onInputChange).toHaveBeenCalledWith('is:done');
    });

    test('calls onSelect when the any one filter button is clicked', () => {
        const onSelect = jest.fn();
        const onInputChange = jest.fn();
        const onClickSearchButton = jest.fn();

        render(
            <TaskSearch
                onSelect={onSelect}
                inputValue=""
                onInputChange={onInputChange}
                onClickSearchButton={onClickSearchButton}
            />
        );
        const filterButton = screen.getByText('Filter');
        fireEvent.click(filterButton);
        const assignedButton = screen.getByText(/assigned/i);
        fireEvent.click(assignedButton);
        expect(onSelect).toHaveBeenCalledWith('ASSIGNED');
    });

    test('calls onSelect when the any one filter button is clicked and dev is true', () => {
        const onSelect = jest.fn();
        const onInputChange = jest.fn();
        const onClickSearchButton = jest.fn();

        render(
            <TaskSearch
                dev={true}
                onSelect={onSelect}
                inputValue=""
                onInputChange={onInputChange}
                onClickSearchButton={onClickSearchButton}
            />
        );
        const filterButton = screen.getByText('Filter');
        fireEvent.click(filterButton);
        const unassignedButton = screen.getByText(/unassigned/i);
        fireEvent.click(unassignedButton);
        expect(onSelect).toHaveBeenCalledWith('UNASSIGNED');
    });

    test('calls onClickSearchButton when enter key is pressed', () => {
        const onSelect = jest.fn();
        const onInputChange = jest.fn();
        const onClickSearchButton = jest.fn();

        render(
            <TaskSearch
                onSelect={onSelect}
                inputValue="status:assigned"
                dev={false}
                activeTab={Tab.ASSIGNED}
                onInputChange={onInputChange}
                onClickSearchButton={onClickSearchButton}
            />
        );

        const searchInput = screen.getByTestId('search-input');
        fireEvent.change(searchInput, { target: { value: 'is:merged' } });
        fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' });
        expect(onClickSearchButton).toBeCalled();
    });

    test('Should not display status:all in search bar in dev mode', () => {
        const onSelect = jest.fn();
        const onInputChange = jest.fn();
        const onClickSearchButton = jest.fn();

        render(
            <TaskSearch
                dev={true}
                onSelect={onSelect}
                inputValue=""
                onInputChange={onInputChange}
                onClickSearchButton={onClickSearchButton}
            />
        );

        const filterButton = screen.getByText('Filter');
        fireEvent.click(filterButton);
        const blockedButton = screen.getByRole('button', { name: /all/i });
        fireEvent.click(blockedButton);
        expect(onSelect).toHaveBeenCalledWith('ALL');
        expect(screen.queryByText('status:all')).not.toBeInTheDocument();
    });
    test('Should display status:all in search bar', () => {
        const onSelect = jest.fn();
        const onInputChange = jest.fn();
        const onClickSearchButton = jest.fn();

        render(
            <TaskSearch
                dev={false}
                onSelect={onSelect}
                inputValue="status:all"
                onInputChange={onInputChange}
                onClickSearchButton={onClickSearchButton}
            />
        );

        const filterButton = screen.getByText('Filter');
        fireEvent.click(filterButton);
        const blockedButton = screen.getByRole('button', { name: /all/i });
        fireEvent.click(blockedButton);
        expect(onSelect).toHaveBeenCalledWith('ALL');
        expect(screen.getByDisplayValue('status:all')).toBeInTheDocument();
    });
});

describe('Multi select task search in dev mode', () => {
    const onSelect = jest.fn();
    const onInputChange = jest.fn();
    const onClickSearchButton = jest.fn();
    test('renders search input with empty string if dev mode is enabled', () => {
        render(
            <TaskSearch
                onSelect={onSelect}
                dev={true}
                inputValue=""
                onInputChange={onInputChange}
                onClickSearchButton={onClickSearchButton}
            />
        );
        const searchInput = screen.getByTestId('search-input');
        expect(searchInput).toBeInTheDocument();
        expect(searchInput).toHaveTextContent('');
    });

    test('should contain pill based on query param', async () => {
        const onSelect = jest.fn();
        const onInputChange = jest.fn();
        const onClickSearchButton = jest.fn();

        const { getByTestId } = render(
            <TaskSearch
                dev={true}
                onSelect={onSelect}
                inputValue="status:blocked"
                onInputChange={onInputChange}
                onClickSearchButton={onClickSearchButton}
            />
        );

        const pillContent = getByTestId('pill-content');
        expect(pillContent).toBeInTheDocument();
        expect(pillContent).toHaveTextContent('status:blocked');
    });
    test('search button should be clickable even if search input is empty', () => {
        render(
            <TaskSearch
                onSelect={onSelect}
                inputValue=""
                dev={true}
                onInputChange={onInputChange}
                onClickSearchButton={onClickSearchButton}
            />
        );
        const searchButton = screen.getByTestId('search-button');
        expect(searchButton).toBeInTheDocument();
        fireEvent.click(searchButton);
        expect(onClickSearchButton).toHaveBeenCalled();
        expect(onClickSearchButton).toBeCalledWith('status:all');
    });

    test('should display suggestions based on typed key through user input', async () => {
        const onClickSearchButton = jest.fn();
        render(
            <TaskSearch
                onSelect={onSelect}
                inputValue=""
                dev={true}
                onInputChange={onInputChange}
                onClickSearchButton={onClickSearchButton}
            />
        );
        const searchInput = screen.getByTestId('search-input');
        fireEvent.change(searchInput, { target: { value: 'status:blocked' } });

        await waitFor(
            () => {
                const options = screen.getAllByTestId('suggestion-box');
                expect(options).toHaveLength(1);
            },
            { timeout: 1000 }
        );
    });

    test('BACKLOG Button Selected then Search Bar Display status:backlog in dev', async () => {
        const onSelect = jest.fn();
        const onInputChange = jest.fn();
        const onClickSearchButton = jest.fn();

        const { getByTestId } = render(
            <TaskSearch
                dev={true}
                onSelect={onSelect}
                inputValue="status:backlog"
                onInputChange={onInputChange}
                onClickSearchButton={onClickSearchButton}
            />
        );

        const filterButton = screen.getByText('Filter');
        fireEvent.click(filterButton);
        const backlogButton = screen.getByRole('button', { name: /backlog/i });
        fireEvent.click(backlogButton);
        expect(onSelect).toHaveBeenCalledWith('BACKLOG');
        await waitFor(
            () => {
                const pillContent = getByTestId('pill-content');
                expect(pillContent).toBeInTheDocument();
                expect(pillContent).toHaveTextContent('status:backlog');
            },
            { timeout: 1000 }
        );
    });

    test('should generate suggestion once clicked on option pill', async () => {
        const { getByTestId } = render(
            <TaskSearch
                dev={true}
                onSelect={onSelect}
                inputValue="status:blocked"
                onInputChange={onInputChange}
                onClickSearchButton={onClickSearchButton}
            />
        );

        const pillContent = getByTestId('pill-content');
        fireEvent.click(pillContent);
        await waitFor(
            () => {
                const options = screen.getAllByTestId('suggestion-box');
                expect(options).toHaveLength(1);
            },
            { timeout: 1000 }
        );
    });

    test('should set focus back to input if clicked in surrounding of it', async () => {
        const onClickSearchButton = jest.fn();
        const { getByTestId } = render(
            <TaskSearch
                onSelect={onSelect}
                inputValue=""
                dev={true}
                onInputChange={onInputChange}
                onClickSearchButton={onClickSearchButton}
            />
        );
        const searchInput = screen.getByTestId('search-input');
        expect(searchInput).toBeInTheDocument();
        const wrapperDiv = getByTestId('pill-input-wrapper');
        fireEvent.click(wrapperDiv);
        expect(searchInput).toHaveFocus();
    });
    test('should discard changes and set focus back to input if escape is pressed', async () => {
        const { getByTestId } = render(
            <TaskSearch
                dev={true}
                onSelect={onSelect}
                inputValue="status:blocked"
                onInputChange={onInputChange}
                onClickSearchButton={onClickSearchButton}
            />
        );

        const pillContent = getByTestId('pill-content');
        fireEvent.click(pillContent);
        const pillInput = getByTestId('pill-input');
        fireEvent.keyDown(pillInput, { key: 'Escape', code: 'Escape' });
        const searchInput = screen.getByTestId('search-input');
        expect(searchInput).toHaveFocus();
        const suggestions = screen.queryByTestId('suggestion-box');
        expect(suggestions).toBeNull();
    });
    test('should take 2 backspaces to remove a pill, if pressed in an empty input field', async () => {
        render(
            <TaskSearch
                dev={true}
                onSelect={onSelect}
                inputValue="status:blocked"
                onInputChange={onInputChange}
                onClickSearchButton={onClickSearchButton}
            />
        );

        const searchInput = screen.getByTestId('search-input');
        fireEvent.keyDown(searchInput, { key: 'Backspace', code: 'Backspace' });
        const parentPill = screen.queryByTestId('parent-pill');
        expect(parentPill).toHaveClass('highlight');
        fireEvent.keyDown(searchInput, { key: 'Backspace', code: 'Backspace' });
        const pillContent = screen.queryByTestId('pill-content');
        expect(pillContent).toBeNull();
        expect(searchInput).toHaveFocus();
    });
    test('should delete the pill if entire value of its is cleared', async () => {
        const { getByTestId } = render(
            <TaskSearch
                dev={true}
                onSelect={onSelect}
                inputValue="status:blocked"
                onInputChange={onInputChange}
                onClickSearchButton={onClickSearchButton}
            />
        );
        const pillContent = getByTestId('pill-content');
        fireEvent.click(pillContent);
        const pillInput = getByTestId('pill-input');
        fireEvent.change(pillInput, { target: { value: 'M' } });
        fireEvent.keyDown(pillInput, { key: 'Backspace' });
        const isPillPresent = screen.queryByTestId('pill-content');
        expect(isPillPresent).toBeNull();
    });
    test('should be able to traverse between options through arrow keys', async () => {
        render(
            <TaskSearch
                dev={true}
                onSelect={onSelect}
                inputValue=""
                onInputChange={onInputChange}
                onClickSearchButton={onClickSearchButton}
            />
        );

        const searchInput = screen.getByTestId('search-input');
        fireEvent.change(searchInput, { target: { value: 'testing work' } });

        await waitFor(
            async () => {
                fireEvent.click(searchInput);
                fireEvent.keyDown(searchInput, { key: 'ArrowDown' });
                await expect(searchInput).not.toHaveAttribute('readonly');
                fireEvent.keyDown(searchInput, { key: 'ArrowUp' });
                await expect(searchInput).not.toHaveAttribute('readonly');
            },
            { timeout: 1000 }
        );
    });
    test('should be able to select options using ENTER key', async () => {
        const { getByTestId } = render(
            <TaskSearch
                dev={true}
                onSelect={onSelect}
                inputValue=""
                onInputChange={onInputChange}
                onClickSearchButton={onClickSearchButton}
            />
        );

        const searchInput = screen.getByTestId('search-input');
        fireEvent.change(searchInput, { target: { value: 'testing work' } });

        await waitFor(
            () => {
                fireEvent.click(searchInput);
                fireEvent.keyDown(searchInput, { key: 'ArrowDown' });
                fireEvent.keyDown(searchInput, { key: 'Enter' });
                const pillContent = getByTestId('pill-content');
                expect(pillContent).toBeInTheDocument();
            },
            { timeout: 1000 }
        );
    });
    test('should fetch tasks if ENTER is pressed', async () => {
        render(
            <TaskSearch
                dev={true}
                onSelect={onSelect}
                inputValue=""
                onInputChange={onInputChange}
                onClickSearchButton={onClickSearchButton}
            />
        );

        const searchInput = screen.getByTestId('search-input');
        fireEvent.keyDown(searchInput, { key: 'Enter' });
        expect(onClickSearchButton).toBeCalled();
        expect(onClickSearchButton).toBeCalledWith('status:all');
        const suggestions = screen.queryByTestId('suggestion-box');
        expect(suggestions).toBeNull();
    });
    it('should remove pill from UI if clicked on delete button', () => {
        render(
            <TaskSearch
                dev={true}
                onSelect={onSelect}
                inputValue="status:blocked"
                onInputChange={onInputChange}
                onClickSearchButton={onClickSearchButton}
            />
        );

        const deleteButton = screen.getByTestId('delete-pill-button');
        fireEvent.click(deleteButton);
        const pillContent = screen.queryByTestId('pill-content');
        expect(pillContent).toBeNull();
        const searchInput = screen.getByTestId('search-input');
        expect(searchInput).toHaveFocus();
    });
    test('should discard changes made in pill and set focus back to input if clicked outside of pill', async () => {
        const { getByTestId } = render(
            <TaskSearch
                dev={true}
                onSelect={onSelect}
                inputValue="status:in-progress"
                onInputChange={onInputChange}
                onClickSearchButton={onClickSearchButton}
            />
        );

        const pillContent = getByTestId('pill-content');
        fireEvent.click(pillContent);
        const pillInput = getByTestId('pill-input');
        fireEvent.change(pillInput, {
            target: { value: 'status:blocked' },
        });
        const wrapperDiv = getByTestId('pill-input-wrapper');

        fireEvent.click(wrapperDiv);
        const searchInput = screen.getByTestId('search-input');
        expect(searchInput).toHaveFocus();
        expect(pillContent).not.toHaveTextContent('status:blocked');
    });
    test('should be able to update pill value through keyboard', async () => {
        const onClickSearchButton = jest.fn();
        const { getByTestId } = render(
            <TaskSearch
                onSelect={onSelect}
                inputValue="status:in-progress"
                dev={true}
                onInputChange={onInputChange}
                onClickSearchButton={onClickSearchButton}
            />
        );
        const pillContent = getByTestId('pill-content');
        fireEvent.click(pillContent);
        const pillInput = getByTestId('pill-input');
        fireEvent.change(pillInput, {
            target: { value: 'status:assigned' },
        });

        await waitFor(
            () => {
                fireEvent.keyDown(pillInput, { key: 'Enter', code: 'Enter' });
                const pillContent = getByTestId('pill-content');
                expect(pillContent).toBeInTheDocument();
                expect(pillContent).toHaveTextContent('status:assigned');
            },
            { timeout: 1000 }
        );
    });
    test('should display suggestions even if white space is present at the end', async () => {
        const onClickSearchButton = jest.fn();
        render(
            <TaskSearch
                onSelect={onSelect}
                inputValue=""
                dev={true}
                onInputChange={onInputChange}
                onClickSearchButton={onClickSearchButton}
            />
        );
        const searchInput = screen.getByTestId('search-input');
        fireEvent.change(searchInput, { target: { value: ' status:in ' } });

        await waitFor(
            () => {
                const options = screen.getAllByTestId('option');
                expect(options).toHaveLength(2);
            },
            { timeout: 1000 }
        );
    });

    test('should be able to close suggestions if input is out of focus', async () => {
        const onClickSearchButton = jest.fn();
        const { getByTestId } = render(
            <TaskSearch
                onSelect={onSelect}
                inputValue="status:in-progress"
                dev={true}
                onInputChange={onInputChange}
                onClickSearchButton={onClickSearchButton}
            />
        );
        const searchInput = getByTestId('search-input');
        fireEvent.change(searchInput, {
            target: { value: 'status:assigned' },
        });
        const onBlurMock = jest.fn();
        searchInput.addEventListener('blur', onBlurMock);

        await waitFor(
            () => {
                fireEvent.blur(searchInput);
                expect(onBlurMock).toHaveBeenCalled();
                const suggestions = screen.queryByTestId('suggestion-box');
                expect(suggestions).toBeNull();
            },
            { timeout: 1000 }
        );
    });
});
