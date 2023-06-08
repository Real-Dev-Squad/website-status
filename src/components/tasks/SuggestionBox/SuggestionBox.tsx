import React, { FC, useEffect, useState } from 'react';
// import { DUMMY_PROFILE as placeholderImageURL } from '@/constants/display-sections';
// import fetch from '@/helperFunctions/fetch';
// import { userDataType } from '@/interfaces/user.type';
import { GithubInfo } from '@/interfaces/suggestionBox.type';
// import { toast, ToastTypes } from '@/helperFunctions/toast';
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

    if (loading) renderComponent = <Loading />;
    else if (suggestions.length === 0) {
        renderComponent = <UserNotFound />;
    }

    return <div style={{ position: 'relative' }}>{renderComponent}</div>;
};

export default SuggestionBox;
