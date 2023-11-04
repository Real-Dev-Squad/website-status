export type GithubInfo = {
    github_id: string | undefined;
    profileImageUrl: string;
};

export type SuggestionBoxProps = {
    onSelectAssignee: (userName: string) => void;
    setActiveIndex: (index: number) => void;
    suggestions: GithubInfo[];
    selected: number;
};

export type SuggestionListProps = {
    suggestions: GithubInfo[];
    onSelectAssignee: (userName: string) => void;
    setActiveIndex: (index: number) => void;
    selected: number;
};
export type SuggestionsProps = {
    assigneeName: string;
    showSuggestion: boolean;
    handleAssignment: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleClick: (userName: string) => void;
    setShowSuggestion: (value: boolean) => void;
    placeholderText?: string;
};
