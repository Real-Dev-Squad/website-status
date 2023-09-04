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
    showSuggestion: boolean;
    handleAssignment: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleClick: (userName: string) => void;
};
