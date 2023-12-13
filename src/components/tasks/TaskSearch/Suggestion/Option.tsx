import className from './option.module.scss';

interface OptionProps {
    idx: number;
    onClickHandler: (pillIndex: number) => void;
    suggestion: { [key: string]: string };
    activeSuggestionIndex: number;
}
export default function Option({
    idx,
    onClickHandler,
    suggestion,
    activeSuggestionIndex,
}: OptionProps) {
    const [key] = Object.keys(suggestion);
    const selectOption = (
        e:
            | React.MouseEvent<HTMLDivElement, MouseEvent>
            | React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>
    ) => {
        e.preventDefault();
        onClickHandler(idx);
    };
    return (
        <div
            data-testid="option"
            onMouseDown={selectOption}
            onClick={selectOption}
            className={`${className['suggestion-div']} ${
                idx === activeSuggestionIndex
                    ? className['selected-suggestion']
                    : ''
            }`}
        >
            {JSON.stringify(`${[key]}: ${suggestion[key]}`).replaceAll('"', '')}
        </div>
    );
}
