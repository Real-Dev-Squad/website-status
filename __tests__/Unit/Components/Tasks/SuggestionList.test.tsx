import React from 'react';
import { fireEvent, getByText, render, screen } from '@testing-library/react';
import SuggestionList from '@/components/tasks/SuggestionBox/SuggestionList';
import gitInfo from '../../../../__mocks__/db/githubUser';

describe('SuggestionList', () => {
    const onSelectAssignee = jest.fn();
    const setActiveIndex = jest.fn();
    it('should render github username and profile picture of the user', () => {
        render(
            <SuggestionList
                suggestions={gitInfo}
                onSelectAssignee={onSelectAssignee}
                setActiveIndex={setActiveIndex}
                selected={0}
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
