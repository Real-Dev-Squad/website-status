import { FC } from 'react';
import { GithubInfo } from '@/interfaces/suggestionBox.type';
import SuggestionList from './SuggestionList';
import Loading from './Loading';
import UserNotFound from './UserNotFound';

type Props = {
    onClickName: (userName: string) => void;
    loading: boolean;
    suggestions: GithubInfo[];
};

const SuggestionBox: FC<Props> = ({ onClickName, suggestions, loading }) => {
    let renderComponent = (
        <SuggestionList suggestions={suggestions} onClickName={onClickName} />
    );

    if (loading) {
        renderComponent = <Loading />;
    } else if (suggestions.length === 0) {
        renderComponent = <UserNotFound />;
    }

    return <>{renderComponent}</>;
};

export default SuggestionBox;
