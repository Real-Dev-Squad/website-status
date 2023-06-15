import { FC } from 'react';
import { BoxProps } from '@/interfaces/suggestionBox.type';
import SuggestionList from './SuggestionList';
import UserNotFound from './UserNotFound';

const SuggestionBox: FC<BoxProps> = ({ onClickName, suggestions }) => {
    let renderComponent = (
        <SuggestionList suggestions={suggestions} onClickName={onClickName} />
    );

    if (suggestions.length === 0) {
        renderComponent = <UserNotFound />;
    }

    return <>{renderComponent}</>;
};

export default SuggestionBox;
