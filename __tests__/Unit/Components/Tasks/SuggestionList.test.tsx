import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import SuggestionList from '@/components/tasks/SuggestionBox/SuggestionList';
import { GithubInfo } from '@/interfaces/suggestionBox.type';
import { DUMMY_PROFILE as placeholderImageURL } from '@/constants/display-sections';

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

describe('SuggestionList', () => {
    const onSelectAssignee = jest.fn();
    it('renders github username and profile picture of the user', () => {
        render(
            <SuggestionList
                suggestions={gitInfo}
                onSelectAssignee={onSelectAssignee}
            />
        );

        const list = screen.getByTestId('suggestions');
        const listItems = screen.getAllByTestId('suggestion');
        const listImages = screen.getAllByTestId('image');

        expect(list).toBeInTheDocument();
        expect(listItems).toHaveLength(2);
        expect(listImages).toHaveLength(2);

        fireEvent.click(listItems[0]);
        expect(onSelectAssignee).toHaveBeenCalled();
    });
});
