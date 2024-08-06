import { TaskSearchOption } from '@/interfaces/searchOptions.type';
import styles from './option.module.scss';
import Option from './Option';
interface SuggestionCoordinates {
    left: number | null;
    maxWidth: number | null;
    top: number | null;
}
interface OptionsProp {
    style: SuggestionCoordinates;
    suggestions: Array<TaskSearchOption>;
    activeSuggestionIndex: number;
    onSuggestionSelected: (idx: number) => void;
}
export default function Options({
    style,
    suggestions,
    activeSuggestionIndex,
    onSuggestionSelected,
}: OptionsProp) {
    return (
        <div
            data-testid="suggestion-box-container"
            style={{
                left: style.left || 'auto',
                maxWidth: style.maxWidth || 'auto',
                width: 'auto',
                top: style.top || 'auto',
            }}
            className={styles['suggestion-box']}
        >
            {suggestions.length > 0 ? (
                <div data-testid="suggestion-box" className="suggestion-box">
                    {suggestions.map((data, key) => (
                        <Option
                            idx={key}
                            activeSuggestionIndex={activeSuggestionIndex}
                            onClickHandler={onSuggestionSelected}
                            suggestion={data}
                            key={key}
                        />
                    ))}
                </div>
            ) : (
                <div
                    className={`${styles['suggestion-box']} ${styles['empty-box']}`}
                >
                    No suggestion found
                </div>
            )}
        </div>
    );
}
