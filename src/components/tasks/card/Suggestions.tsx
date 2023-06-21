import { useState, forwardRef } from 'react';
import classNames from '@/components/tasks/card/card.module.scss';
import { GithubInfo } from '@/interfaces/suggestionBox.type';
import { userDataType } from '@/interfaces/user.type';
import { Loader } from './Loader';
import SuggestionBox from '../SuggestionBox/SuggestionBox';
import { DUMMY_PROFILE as placeholderImageURL } from '@/constants/display-sections';
import fetch from '@/helperFunctions/fetch';
import { toast, ToastTypes } from '@/helperFunctions/toast';
import { SuggestionsProps } from '@/interfaces/suggestionBox.type';

let timer: NodeJS.Timeout;

const Suggestions = forwardRef<HTMLInputElement, SuggestionsProps>(
    (
        {
            assigneeName,
            showSuggestion,
            handleAssignment,
            handleChange,
            handleClick,
        },
        ref
    ) => {
        const [isLoadingSuggestions, setIsLoadingSuggestions] =
            useState<boolean>(false);
        const [suggestions, setSuggestions] = useState<GithubInfo[]>([]);

        const { ERROR } = ToastTypes;

        const fetchUsers = async (e: string) => {
            if (!e) return;
            setIsLoadingSuggestions(true);

            const url = `${process.env.NEXT_PUBLIC_BASE_URL}/users?search=${e}`;
            try {
                const { requestPromise } = fetch({ url });
                const users = await requestPromise;
                const usersData = users.data.users;
                const suggestedUsers: GithubInfo[] = [];
                usersData.map((data: userDataType) => {
                    suggestedUsers.push({
                        github_id: data.username,
                        profileImageUrl: data?.picture?.url
                            ? data.picture.url
                            : placeholderImageURL,
                    });
                });

                setSuggestions(suggestedUsers);
                setIsLoadingSuggestions(false);
            } catch (error: any) {
                setIsLoadingSuggestions(false);
                toast(ERROR, error.message);
            }
        };

        const debounce = (fn: (e: string) => void, delay: number) => {
            return function (e: string) {
                clearTimeout(timer);
                setSuggestions([]);
                timer = setTimeout(() => {
                    fn(e);
                }, delay);
            };
        };

        return (
            <div className={classNames.suggestionDiv}>
                <input
                    ref={ref}
                    value={assigneeName}
                    className={classNames.cardStrongFont}
                    onKeyDown={(e) => {
                        handleChange(e, 'assignee');
                    }}
                    onChange={(e) => {
                        handleAssignment(e);
                        debounce(fetchUsers, 400)(e.target.value);
                    }}
                    role="button"
                    tabIndex={0}
                />

                {isLoadingSuggestions ? (
                    <Loader />
                ) : (
                    showSuggestion && (
                        <SuggestionBox
                            suggestions={suggestions}
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
