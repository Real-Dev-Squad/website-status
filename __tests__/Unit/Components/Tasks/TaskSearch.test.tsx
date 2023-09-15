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
        const overdueButton = screen.getByText(/overdue/i);
        fireEvent.click(overdueButton);
        expect(onSelect).toHaveBeenCalledWith('OVERDUE');
    });

    test('calls onClickSearchButton when enter key is pressed', () => {
        const onSelect = jest.fn();
        const onInputChange = jest.fn();
        const onClickSearchButton = jest.fn();

        render(
            <TaskSearch
                onSelect={onSelect}
                inputValue=""
                activeTab={Tab.OVERDUE}
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
