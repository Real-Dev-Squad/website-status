import { TaskSearchOption } from '@/interfaces/searchOptions.type';
import className from './option.module.scss';
import Option from './Option';
interface SuggestionCoordinates {
    left: number | null;
    maxWidth: number | null;
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
            style={
                suggestions.length !== 0
                    ? {
                          left: style.left || 'auto',
                          maxWidth: style.maxWidth || 'auto',
                          width: 'auto',
                      }
                    : {}
            }
            className={className['suggestion-box']}
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
                    className={`${className['suggestion-box']} ${className['empty-box']}`}
                >
                    No suggestion found
                </div>
            )}
        </div>
    );
}
