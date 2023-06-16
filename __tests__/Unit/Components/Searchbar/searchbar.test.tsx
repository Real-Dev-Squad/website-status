import Searchbar from '@/components/Dashboard/Searchbar';
import { splitNSearch } from '@/utils/splitNSearch';
import { fireEvent, render, screen } from '@testing-library/react';

jest.mock('../../../../src/utils/splitNSearch', () => ({
    splitNSearch: jest.fn(),
}));

describe('test searchbar component', function () {
    it('renders searchbar input and a search button', function () {
        render(<Searchbar label="test-label" />);

        const input = screen.getByTestId('searchbar_input') as HTMLInputElement;
        const searchBtn = screen.getByTestId('search_btn') as HTMLButtonElement;

        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute('placeholder', 'test-label:');
        expect(searchBtn).toBeInTheDocument();
        expect(searchBtn).toHaveTextContent('Search');
    });

    it('checks if we can type into the searchbar', function () {
        render(<Searchbar label="test-label" />);

        const input = screen.getByTestId('searchbar_input') as HTMLInputElement;

        fireEvent.change(input, { target: { value: '123,456' } });
        expect(input.value).toBe('123,456');
    });

    it('tests if the click handler is called', function () {
        render(<Searchbar label="test-label" />);

        const input = screen.getByTestId('searchbar_input') as HTMLInputElement;

        const searchBtn = screen.getByTestId('search_btn') as HTMLButtonElement;

        fireEvent.change(input, { tatget: { value: '123' } });
        fireEvent.click(searchBtn);

        expect(splitNSearch).toBeCalledTimes(1);
    });

    it('tests if enter key calls search', function () {
        render(<Searchbar label="test-label" />);

        const input = screen.getByTestId('searchbar_input') as HTMLInputElement;

        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 });

        expect(splitNSearch).toBeCalledTimes(2);
    });

    it('tests other key down events do not call search', function () {
        render(<Searchbar label="test-label" />);

        const input = screen.getByTestId('searchbar_input') as HTMLInputElement;

        fireEvent.keyDown(input, { key: 'A', code: 'KeyA' });

        expect(splitNSearch).toBeCalledTimes(2);
    });
});
