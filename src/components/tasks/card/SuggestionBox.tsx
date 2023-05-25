import { FC } from 'react';
import { DUMMY_PROFILE as placeholderImageURL } from '@/constants/display-sections';
import classes from '@/components/tasks/card/suggestion.module.scss';

type Props = {
    assigneeName: string;
    githubUsername: string[];
    showSuggestion: boolean;
    onClickName: (userName: string) => void;
};

const SuggestionBox: FC<Props> = ({
    assigneeName,
    githubUsername,
    showSuggestion = false,
    onClickName = () => undefined,
}) => {
    const filteredSuggestion = githubUsername.filter((userName) =>
        userName.includes(assigneeName)
    );

    const clickHandler = (e: any) => {
        onClickName(e.target.innerText);
    };

    let suggestionList;

    if (showSuggestion && assigneeName) {
        if (filteredSuggestion.length) {
            suggestionList = (
                <ul className={classes['suggestions']}>
                    {filteredSuggestion.map((suggestion) => {
                        return (
                            <li key={suggestion} onClick={clickHandler}>
                                <span>{suggestion}</span>
                                <img
                                    src={placeholderImageURL}
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
                <span className={classes['no-suggestions']}>
                    User not found!
                </span>
            );
        }
    }

    return <div style={{ position: 'relative' }}>{suggestionList}</div>;
};

export default SuggestionBox;
