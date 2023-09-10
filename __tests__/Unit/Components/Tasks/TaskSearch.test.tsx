import { render, screen, fireEvent } from '@testing-library/react';
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
                dev={true}
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
                inputValue=""
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
});
