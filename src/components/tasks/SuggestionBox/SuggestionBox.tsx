import { FC } from 'react';
import { SuggestionBoxProps } from '@/interfaces/suggestionBox.type';
import SuggestionList from './SuggestionList';
import UserNotFound from './UserNotFound';

const SuggestionBox: FC<SuggestionBoxProps> = ({
    onSelectAssignee,
    setActiveIndex,
    suggestions,
    selected,
}) => {
    let renderComponent = (
        <SuggestionList
            suggestions={suggestions}
            onSelectAssignee={onSelectAssignee}
            setActiveIndex={setActiveIndex}
            selected={selected}
        />
    );

    if (suggestions.length === 0) {
        renderComponent = <UserNotFound />;
    }

    return <>{renderComponent}</>;
};

export default SuggestionBox;
