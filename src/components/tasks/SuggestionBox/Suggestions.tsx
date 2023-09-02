import { forwardRef, useState } from 'react';
import classNames from '@/components/tasks/card/card.module.scss';
import { GithubInfo } from '@/interfaces/suggestionBox.type';
import { userDataType } from '@/interfaces/user.type';
import { Loader } from '../card/Loader';
import SuggestionBox from '../SuggestionBox/SuggestionBox';
import { SuggestionsProps } from '@/interfaces/suggestionBox.type';
import { useGetAllUsersByUsernameQuery } from '@/app/services/usersApi';
import { DUMMY_PROFILE as placeholderImageURL } from '@/constants/display-sections';
import useDebounce from '@/hooks/useDebounce';

const Suggestions = forwardRef<HTMLInputElement, SuggestionsProps>(
    ({ handleClick, assigneeName, showSuggestion, handleAssignment }, ref) => {
        const searchTerm = useDebounce(assigneeName, 500);
        const { data, isLoading } = useGetAllUsersByUsernameQuery(
            {
                searchString: searchTerm,
            },
            { skip: searchTerm ? false : true }
        );

        const usersData = data?.users;
        const suggestedUsers: GithubInfo[] = [];

        usersData?.map((data: userDataType) => {
            suggestedUsers.push({
                github_id: data.username,
                profileImageUrl: data?.picture?.url
                    ? data.picture.url
                    : placeholderImageURL,
            });
        });

        return (
            <div className={classNames.suggestionDiv}>
                <input
                    data-testid="assignee-input"
                    ref={ref}
                    value={assigneeName}
                    className={classNames.cardStrongFont}
                    onChange={(e) => handleAssignment(e)}
                    role="button"
                    tabIndex={0}
                />

                {isLoading ? (
                    <Loader />
                ) : (
                    showSuggestion && (
                        <SuggestionBox
                            suggestions={suggestedUsers}
                            onSelectAssignee={handleClick}
                        />
                    )
                )}
            </div>
        );
    }
);

Suggestions.displayName = 'Suggestions';

export default Suggestions;
