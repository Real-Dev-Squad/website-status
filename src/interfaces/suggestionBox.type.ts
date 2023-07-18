export type GithubInfo = {
    github_id: string | undefined;
    profileImageUrl: string;
};

export type SuggestionBoxProps = {
    onSelectAssignee: (userName: string) => void;
    suggestions: GithubInfo[];
};

export type SuggestionListProps = {
    suggestions: GithubInfo[];
    onSelectAssignee: (userName: string) => void;
};

export type SuggestionsProps = {
    assigneeName: string;
    searchTerm: string;
    showSuggestion: boolean;
    handleAssignment: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleChange: (e: any, changedProperty: any) => void;
    handleClick: (userName: string) => void;
};
