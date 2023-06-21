import Searchbar from '@/components/Dashboard/Searchbar';
import * as util from '@/utils/splitNSearch';
import { fireEvent, render, screen } from '@testing-library/react';

describe('test searchbar component', function () {
    beforeEach(() => {
        jest.spyOn(util, 'splitNSearch');
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('renders searchbar input and a search button', function () {
        render(<Searchbar label="test-label" />);

        const input = screen.getByRole('textbox') as HTMLInputElement;
        const searchBtn = screen.getByRole('button', {
            name: 'Search',
        }) as HTMLButtonElement;

        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute('placeholder', 'test-label:');
        expect(searchBtn).toBeInTheDocument();
        expect(searchBtn).toHaveTextContent('Search');
    });

    it('checks if we can type into the searchbar', function () {
        render(<Searchbar label="test-label" />);

        const input = screen.getByPlaceholderText(
            'test-label:'
        ) as HTMLInputElement;

        fireEvent.change(input, { target: { value: '123,456' } });
        expect(input.value).toBe('123,456');
    });

    it('tests if the click handler is called', function () {
        render(<Searchbar label="test-label" />);

        const input = screen.getByPlaceholderText(
            'test-label:'
        ) as HTMLInputElement;

        const searchBtn = screen.getByRole('button', {
            name: 'Search',
        }) as HTMLButtonElement;

        fireEvent.change(input, { target: { value: '123' } });
        fireEvent.click(searchBtn);

        expect(util.splitNSearch).toBeCalledTimes(1);
    });

    it('tests if enter key calls search', function () {
        render(<Searchbar label="test-label" />);

        const input = screen.getByPlaceholderText(
            'test-label:'
        ) as HTMLInputElement;

        fireEvent.change(input, { target: { value: '123' } });
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 });

        expect(util.splitNSearch).toBeCalledTimes(1);
    });

    it('tests other key down events do not call search', function () {
        render(<Searchbar label="test-label" />);

        const input = screen.getByPlaceholderText(
            'test-label:'
        ) as HTMLInputElement;

        fireEvent.keyDown(input, { key: 'A', code: 'KeyA' });

        expect(util.splitNSearch).toBeCalledTimes(0);
    });
});
