import { useState, useEffect, ChangeEvent, useRef } from 'react';
import classNames from './UserSearchField.module.scss';
import { useGetAllUsersQuery } from '@/app/services/usersApi';
import { logs } from '@/constants/calendar';

type SearchFieldProps = {
    onSearchTextSubmitted: (user: any, data: any) => void;
    loading: boolean;
};

function useOutsideAlerter(ref: any, handleOutsideClick: any) {
    useEffect(() => {
        function handleClickOutside(event: any) {
            if (ref.current && !ref.current.contains(event.target)) {
                handleOutsideClick();
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref]);
}

const SearchField = ({ onSearchTextSubmitted, loading }: SearchFieldProps) => {
    const handleOutsideClick = () => {
        setDisplayList([]);
    };
    const suggestionInputRef = useRef(null);
    useOutsideAlerter(suggestionInputRef, handleOutsideClick);
    const [searchText, setSearchText] = useState<string>('');
    const onSearchTextChanged = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
        filterUser(e.target.value);
    };

    const handleOnSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setDisplayList([]);
        const user = usersList.find(
            (user: any) => user.username === searchText
        );
        onSearchTextSubmitted(user, data);
    };

    const { data: userData, isError, isLoading } = useGetAllUsersQuery({});
    const [usersList, setUsersList] = useState([]);
    const [displayList, setDisplayList]: any = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        if (userData?.users) {
            const users: any = userData.users;
            const filteredUsers = users.filter(
                (user: any) => !user.incompleteUserDetails
            );
            const logData = filteredUsers.map((user: any) => {
                const log = logs[Math.floor(Math.random() * 4)];
                return {
                    data: log,
                    userId: user.id,
                };
            });
            setData(logData);
            setUsersList(filteredUsers);
        }
    }, [isLoading, userData]);

    const isValidUsername = () => {
        const usernames = usersList.map((user: any) => user.username);
        if (usernames.includes(searchText)) {
            return true;
        }
        return false;
    };

    const filterUser = (searchText: string) => {
        if (searchText === '') {
            setDisplayList([]);
            return;
        }
        setDisplayList(
            usersList.filter((item: any) => {
                return item.username
                    ?.toLowerCase()
                    .includes(searchText.toLowerCase());
            })
        );
    };

    return (
        <form
            className={classNames.userSearchFieldContainer}
            onSubmit={(e) => {
                handleOnSubmit(e);
            }}
            data-testid="issue-form"
            ref={suggestionInputRef}
        >
            <input
                placeholder="Enter username"
                value={searchText}
                onChange={onSearchTextChanged}
                className={classNames.userSearchInput}
                onFocus={() => {
                    filterUser(searchText);
                }}
            />
            <ul className={classNames.suggestions}>
                {displayList.map((user: any) => (
                    <li
                        key={user.id}
                        className={classNames.suggestion}
                        onClick={() => {
                            setSearchText(user.username);
                            setDisplayList([]);
                        }}
                    >
                        {user.username}
                    </li>
                ))}
            </ul>
            <button
                className={classNames.userSearchSubmitButton}
                disabled={
                    loading || !(searchText ?? '').trim() || !isValidUsername()
                }
            >
                Submit
            </button>
        </form>
    );
};
export { SearchField };
