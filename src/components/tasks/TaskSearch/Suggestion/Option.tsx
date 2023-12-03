import className from './option.module.scss';

interface IProps {
    idx: number;
    onClickHandler: (idx: number) => void;
    suggestion: { [key: string]: string };
    activeSuggestionIndex: number;
}
export default function Option({
    idx,
    onClickHandler,
    suggestion,
    activeSuggestionIndex,
}: IProps) {
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
