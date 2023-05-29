import React, { FC, useEffect, useState } from 'react';
import { DUMMY_PROFILE as placeholderImageURL } from '@/constants/display-sections';
import classNames from '@/components/tasks/card/suggestion.module.scss';
import fetch from '@/helperFunctions/fetch';
import { userDataType } from '@/interfaces/user.type';
import { GithubInfo } from '@/interfaces/suggestionBox.type';
import { toast, ToastTypes } from '@/helperFunctions/toast';

type Props = {
    assigneeName: string;
    onClickName: (userName: string) => void;
};

const SuggestionBox: FC<Props> = ({
    assigneeName,
    onClickName = () => undefined,
}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [suggestions, setSuggestions] = useState<GithubInfo[]>([]);

    const { ERROR } = ToastTypes;

    const clickHandler = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        onClickName(e.currentTarget.innerText);
    };

    const fetchUsers = async () => {
        setLoading(true);
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/users?search=${assigneeName}`;
        try {
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
        } catch (error: any) {
            setLoading(false);
            if ('response' in error) {
                toast(ERROR, error.response.data.message);
                return;
            }
            toast(ERROR, error.message);
        }
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

    // let suggestionList;

    // if (assigneeName) {
    //     if (suggestions.length) {
    //         suggestionList = (
    //             <ul className={classNames['suggestions']}>
    //                 {suggestions.map((suggestion: GithubInfo) => {
    //                     return (
    //                         <li
    //                             key={suggestion.github_id}
    //                             onClick={clickHandler}
    //                         >
    //                             <span>{suggestion.github_id}</span>
    //                             <img
    //                                 src={suggestion.profileImageUrl}
    //                                 width={20}
    //                                 height={20}
    //                             />
    //                         </li>
    //                     );
    //                 })}
    //             </ul>
    //         );
    //     } else {
    //         suggestionList = (
    //             <span className={classNames['no-suggestions']}>
    //                 User not found!
    //             </span>
    //         );
    //     }
    // }

    // return (
    //     <div style={{ position: 'relative' }}>
    //         {loading && (
    //             <span className={classNames['loading']}>Loading..</span>
    //         )}
    //         {!loading && suggestionList}
    //     </div>
    // );

    const SuggestionList = () => {
        return (
            <ul className={classNames['suggestions']}>
                {suggestions.map((suggestion: GithubInfo) => {
                    return (
                        <li key={suggestion.github_id} onClick={clickHandler}>
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
    };

    const Loading = () => {
        return <span className={classNames['loading']}>Loading...</span>;
    };

    const UserNotFound = () => {
        return (
            <span className={classNames['no-suggestions']}>
                User not found!
            </span>
        );
    };

    if (loading)
        return (
            <div style={{ position: 'relative' }}>
                <Loading />
            </div>
        );
    if (suggestions.length === 0 && assigneeName.trim() !== '')
        return (
            <div style={{ position: 'relative' }}>
                <UserNotFound />
            </div>
        );
    if (suggestions.length && assigneeName)
        return (
            <div style={{ position: 'relative' }}>
                <SuggestionList />
            </div>
        );
    return <></>;
};

export default SuggestionBox;
