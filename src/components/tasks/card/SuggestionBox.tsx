import React, { FC, useEffect, useState } from 'react';
import { DUMMY_PROFILE as placeholderImageURL } from '@/constants/display-sections';
import classNames from '@/components/tasks/card/suggestion.module.scss';
import fetch from '@/helperFunctions/fetch';
import { userDataType } from '@/interfaces/user.type';
import { GithubInfo } from '@/interfaces/suggestionBox.type';

type Props = {
    assigneeName: string;
    showSuggestion: boolean;
    onClickName: (userName: string) => void;
};

const SuggestionBox: FC<Props> = ({
    assigneeName,
    showSuggestion = false,
    onClickName = () => undefined,
}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [suggestions, setSuggestions] = useState<GithubInfo[]>([]);

    const clickHandler = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        onClickName(e.currentTarget.innerText);
    };

    const fetchUsers = async () => {
        setLoading(true);
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/users?search=${assigneeName}`;
        const { requestPromise } = fetch({ url });
        const users = await requestPromise;
        const usersData = users.data.users;
        const suggestedUsers: GithubInfo[] = [];
        usersData.map((data: userDataType) => {
            suggestedUsers.push({
                github_id: data.github_id,
                profileImageUrl: data?.picture?.url
                    ? data.picture.url
                    : placeholderImageURL,
            });
        });

        setSuggestions(suggestedUsers);
        setLoading(false);
    };

    useEffect(() => {
        let timerId: NodeJS.Timeout;
        if (assigneeName) {
            timerId = setTimeout(() => {
                fetchUsers();
            }, 200);
        }

        return () => {
            setSuggestions([]);

            clearTimeout(timerId);
        };
    }, [assigneeName]);

    let suggestionList;

    if (showSuggestion && assigneeName) {
        if (suggestions.length) {
            suggestionList = (
                <ul className={classNames['suggestions']}>
                    {suggestions.map((suggestion: GithubInfo) => {
                        return (
                            <li
                                key={suggestion.github_id}
                                onClick={clickHandler}
                            >
                                <span>{suggestion.github_id}</span>
                                <img
                                    src={suggestion.profileImageUrl}
                                    width={20}
                                    height={20}
                                />
                            </li>
                        );
                    })}
                </ul>
            );
        } else {
            suggestionList = (
                <span className={classNames['no-suggestions']}>
                    User not found!
                </span>
            );
        }
    }

    return (
        <div style={{ position: 'relative' }}>
            {loading && (
                <span className={classNames['loading']}>Loading..</span>
            )}
            {!loading && suggestionList}
        </div>
    );
};

export default SuggestionBox;
