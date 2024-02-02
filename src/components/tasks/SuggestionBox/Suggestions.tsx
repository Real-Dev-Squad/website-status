import { forwardRef, useEffect, useState } from 'react';
import styles from '@/components/tasks/SuggestionBox/suggestion.module.scss';
import { GithubInfo } from '@/interfaces/suggestionBox.type';
import { userDataType } from '@/interfaces/user.type';
import { Loader } from '../card/Loader';
import SuggestionBox from '../SuggestionBox/SuggestionBox';
import { SuggestionsProps } from '@/interfaces/suggestionBox.type';
import { useGetAllUsersByUsernameQuery } from '@/app/services/usersApi';
import { DUMMY_PROFILE as placeholderImageURL } from '@/constants/display-sections';
import useDebounce from '@/hooks/useDebounce';

const Suggestions = forwardRef<HTMLInputElement, SuggestionsProps>(
    (
        {
            handleClick,
            assigneeName,
            showSuggestion,
            handleAssignment,
            setShowSuggestion,
            placeholderText = 'Assignee',
        },
        ref
    ) => {
        const searchTerm = useDebounce(assigneeName, 500);
        const { data, isLoading } = useGetAllUsersByUsernameQuery(
            {
                searchString: searchTerm,
            },
            { skip: searchTerm ? false : true }
        );
        const [activeIndex, setActiveIndex] = useState(0);

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

        const handelKeyboardInput = (e: React.KeyboardEvent) => {
            const key = e.key;
            if (suggestedUsers.length > 0) {
                if (['ArrowDown', 'ArrowUp', 'Enter', 'Escape'].includes(key)) {
                    let operation = 0;
                    switch (key) {
                        case 'ArrowUp': {
                            e.preventDefault();
                            operation =
                                activeIndex <= 0
                                    ? suggestedUsers.length - 1
                                    : activeIndex - 1;
                            break;
                        }
                        case 'ArrowDown': {
                            e.preventDefault();
                            operation =
                                (activeIndex + 1) % suggestedUsers.length;
                            break;
                        }
                        case 'Enter': {
                            const username = suggestedUsers[activeIndex]
                                .github_id as string;
                            handleClick(username);
                            break;
                        }
                        case 'Escape': {
                            setShowSuggestion(false);
                            break;
                        }
                    }
                    setActiveIndex(operation);
                }
            }
        };

        useEffect(() => {
            setActiveIndex(0);
        }, [suggestedUsers.length]);

        return (
            <div className={styles.suggestionDiv}>
                <input
                    data-testid="assignee-input"
                    ref={ref}
                    value={assigneeName}
                    placeholder={placeholderText}
                    className={styles.suggestionsInput}
                    onChange={(e) => handleAssignment(e)}
                    onKeyDown={handelKeyboardInput}
                    tabIndex={0}
                />

                {isLoading ? (
                    <Loader />
                ) : (
                    showSuggestion && (
                        <SuggestionBox
                            suggestions={suggestedUsers}
                            onSelectAssignee={handleClick}
                            setActiveIndex={setActiveIndex}
                            selected={activeIndex}
                        />
                    )
                )}
            </div>
        );
    }
);

Suggestions.displayName = 'Suggestions';

export default Suggestions;
