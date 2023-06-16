import { FC } from 'react';
import { GithubInfo } from '@/interfaces/suggestionBox.type';
import classNames from '@/components/tasks/SuggestionBox/suggestion.module.scss';

type Props = {
    suggestions: GithubInfo[];
    onClickName: (userName: string) => void;
};

const SuggestionList: FC<Props> = ({ suggestions, onClickName }) => {
    const clickHandler = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        onClickName(e.currentTarget.innerText);
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
