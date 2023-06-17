import SuggestionBox from '@/components/tasks/SuggestionBox/SuggestionBox';
import { render, screen, fireEvent } from '@testing-library/react';
import { DUMMY_PROFILE as placeholderImageURL } from '@/constants/display-sections';
import { GithubInfo } from '@/interfaces/suggestionBox.type';

const gitInfo: GithubInfo[] = [
    {
        github_id: 'fakhruddinkw',
        profileImageUrl: placeholderImageURL,
    },
    {
        github_id: 'iamitprakash',
        profileImageUrl: placeholderImageURL,
    },
];

describe('Suggestion Box', () => {
    const onClickName = jest.fn();
    it('should render User not found text, if the suggestion prop contains empty array', () => {
        render(
            <SuggestionBox
                suggestions={[]}
                onClickName={onClickName}
                loading={false}
            />
        );

        const userNotFound = screen.getByTestId('user_not_found');
        expect(userNotFound).toBeInTheDocument();
    });

    it('should render Loading.. when fetching initially ', () => {
        render(
            <SuggestionBox
                suggestions={[]}
                onClickName={onClickName}
                loading={true}
            />
        );

        const loadingText = screen.getByTestId('loading');
        expect(loadingText).toBeInTheDocument();
    });

    it('should render list of users when suggestions are not empty and loading is false', () => {
        render(
            <SuggestionBox
                suggestions={gitInfo}
                onClickName={onClickName}
                loading={false}
            />
        );

        const list = screen.getByTestId('suggestions');
        const listItems = screen.getAllByTestId('suggestion');
        const listImages = screen.getAllByTestId('image');

        expect(list).toBeInTheDocument();
        expect(listItems).toHaveLength(2);
        expect(listImages).toHaveLength(2);

        fireEvent.click(listItems[0]);
        expect(onClickName).toHaveBeenCalled();
    });
});
