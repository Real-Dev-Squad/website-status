export type GithubInfo = {
    github_id: string | undefined;
    profileImageUrl: string;
};

export type BoxProps = {
    onClickName: (userName: string) => void;
    suggestions: GithubInfo[];
};

export type ListProps = {
    suggestions: GithubInfo[];
    onClickName: (userName: string) => void;
};

export type LoaderProps = {
    showText?: boolean;
};
