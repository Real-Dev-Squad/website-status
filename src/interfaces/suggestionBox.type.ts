export type GithubInfo = {
    github_id: string | undefined;
    profileImageUrl: string;
};

export type BoxProps = {
    onClickName: (userName: string) => void;
    loading: boolean;
    suggestions: GithubInfo[];
};

export type ListProps = {
    suggestions: GithubInfo[];
    onClickName: (userName: string) => void;
};
