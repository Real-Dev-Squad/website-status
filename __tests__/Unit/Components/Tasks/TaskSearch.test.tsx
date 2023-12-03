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

    /*
        TODO: Fix this test case for dev mode, as blocked status in only available in dev mode.
     */
    // test('Blocked Button Selected then Search Bar Display status:blocked in dev', () => {
    //     const onSelect = jest.fn();
    //     const onInputChange = jest.fn();
    //     const onClickSearchButton = jest.fn();

    //     render(
    //         <TaskSearch
    //             dev={true}
    //             onSelect={onSelect}
    //             inputValue="status:blocked"
    //             onInputChange={onInputChange}
    //             onClickSearchButton={onClickSearchButton}
    //         />
    //     );

    //     const filterButton = screen.getByText('Filter');
    //     fireEvent.click(filterButton);
    //     const blockedButton = screen.getByRole('button', { name: /blocked/i });
    //     fireEvent.click(blockedButton);
    //     expect(onSelect).toHaveBeenCalledWith('BLOCKED');
    //     expect(screen.getByDisplayValue('status:blocked')).toBeInTheDocument();
    // });
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
