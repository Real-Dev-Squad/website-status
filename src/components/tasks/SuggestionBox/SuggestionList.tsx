import { FC } from 'react';
import {
    GithubInfo,
    SuggestionListProps,
} from '@/interfaces/suggestionBox.type';
import styles from '@/components/tasks/SuggestionBox/suggestion.module.scss';

const SuggestionList: FC<SuggestionListProps> = ({
    suggestions,
    onSelectAssignee,
    setActiveIndex,
    selected,
}) => {
    const clickHandler = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        const textContent = e.currentTarget.textContent;
        if (textContent !== null) {
            onSelectAssignee(textContent);
        }
    };

    return (
        <ul className={styles['suggestions']} data-testid="suggestions">
            {suggestions.map((suggestion: GithubInfo, index: number) => {
                return (
                    <li
                        key={suggestion.github_id}
                        className={
                            index === selected
                                ? styles['suggestions-selected']
                                : ''
                        }
                        onClick={clickHandler}
                        onMouseOver={() => setActiveIndex(index)}
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
