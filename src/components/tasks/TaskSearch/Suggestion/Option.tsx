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

    return (
        <div
            data-testid="option"
            onClick={() => onClickHandler(idx)}
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
