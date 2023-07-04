import React from 'react';
import { fireEvent, getByText, render, screen } from '@testing-library/react';
import SuggestionList from '@/components/tasks/SuggestionBox/SuggestionList';
import { GithubInfo } from '@/interfaces/suggestionBox.type';
import { DUMMY_PROFILE as placeholderImageURL } from '@/constants/display-sections';

const gitInfo: GithubInfo[] = [
    {
        github_id: 'Jan',
        profileImageUrl: placeholderImageURL,
    },
    {
        github_id: 'John',
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

        const listImages = screen.getAllByTestId('image');

        const assigneeOne = screen.getByText('Jan');
        const assigneeTwo = screen.getByText('John');

        expect(list).toBeInTheDocument();
        expect(assigneeOne).toBeInTheDocument();
        expect(assigneeTwo).toBeInTheDocument();
        expect(listImages).toHaveLength(2);

        fireEvent.click(assigneeOne);
        expect(onSelectAssignee).toHaveBeenCalled();
    });
});
