import { TaskSearchOption } from '@/interfaces/searchOptions.type';
import className from './option.module.scss';
import Option from './Option';
interface IProp {
    suggestions: Array<TaskSearchOption>;
    activeSuggestionIndex: number;
    onSuggestionSelected: (idx: number) => void;
}
export default function Options({
    suggestions,
    activeSuggestionIndex,
    onSuggestionSelected,
}: IProp) {
    return (
        <div className={className['suggestion-box']}>
            {suggestions.length > 0 ? (
                <div className="suggestion-box">
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
                    className={`${className['suggestion-box']} ${className['empty-box']}`}
                >
                    No suggestion found
                </div>
            )}
        </div>
    );
}
