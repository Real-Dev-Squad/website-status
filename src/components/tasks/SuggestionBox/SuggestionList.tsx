import { FC } from 'react';
import {
    GithubInfo,
    SuggestionListProps,
} from '@/interfaces/suggestionBox.type';
import classNames from '@/components/tasks/SuggestionBox/suggestion.module.scss';

const SuggestionList: FC<SuggestionListProps> = ({
    suggestions,
    onSelectAssignee,
}) => {
    const clickHandler = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        onSelectAssignee(e.currentTarget.innerText);
    };

    return (
        <ul className={classNames['suggestions']} data-testid="suggestions">
            {suggestions.map((suggestion: GithubInfo) => {
                return (
                    <li
                        key={suggestion.github_id}
                        onClick={clickHandler}
                        data-testid="suggestion"
                    >
                        <span>{suggestion.github_id}</span>
                        <img
                            src={suggestion.profileImageUrl}
                            width={20}
                            height={20}
                            data-testid="image"
                        />
                    </li>
                );
            })}
        </ul>
    );
};

export default SuggestionList;
