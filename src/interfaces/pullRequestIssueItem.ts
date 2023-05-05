import { IssueItem } from './issueItem.type';

export type PullRequestAndIssueItem = IssueItem & {
    diff_url: string;
    html_url: string;
    patch_url: string;
    url: string;
};
