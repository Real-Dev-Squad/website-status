import { FC, useState, useEffect, ChangeEvent } from 'react';
import IssueList from '../components/issues/IssueList';
import classNames from '@/styles/issues.module.scss';
import Layout from '@/components/Layout';
import Head from '@/components/head';
import {
    ISSUES_FETCH_ERROR_MESSAGE,
    NO_ISSUES_FOUND_MESSAGE,
} from '@/constants/messages';
import { ISSUES_URL } from '@/constants/url';
import { IssueItem } from '@/interfaces/issueItem.type';
import { PullRequestAndIssueItem } from '@/interfaces/pullRequestIssueItem';

type SearchFieldProps = {
    searchText: string;
    onSearchTextChanged: (event: ChangeEvent<HTMLInputElement>) => void;
    onSearchTextSubmitted: () => void;
    loading: boolean;
};

const SearchField = ({
    searchText,
    onSearchTextChanged,
    onSearchTextSubmitted,
    loading,
}: SearchFieldProps) => {
    return (
        <div className={classNames.searchFieldContainer}>
            <input
                placeholder="Enter query string to search issues"
                value={searchText}
                onChange={onSearchTextChanged}
                className={classNames.issueSearchInput}
            />
            <button
                onClick={onSearchTextSubmitted}
                className={classNames.issuesSearchSubmitButton}
                disabled={loading || !searchText.trim()}
            >
                Submit
            </button>
        </div>
    );
};

const Issues: FC = () => {
    const [issueList, setIssueList] = useState<IssueItem[]>([]);
    const [searchText, setSearchText] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<null | any>(null);

    const fetchIssues = async () => {
        try {
            setIsLoading(true);
            const res = await fetch(`${ISSUES_URL}?q=${searchText}`);
            const data = await res.json();
            if ('issues' in data) {
                // GitHub treats issues and PRs as issues
                // Filtering issues out from the response
                const issuesAndPullRequests: PullRequestAndIssueItem[] =
                    data.issues;
                // The issue is a PR if the object has a key "pull_request"
                const onlyIssues: IssueItem[] = issuesAndPullRequests.filter(
                    (item: PullRequestAndIssueItem) =>
                        !Object.prototype.hasOwnProperty.call(
                            item,
                            'pull_request'
                        )
                );
                setIssueList(onlyIssues);
            }
            setIsLoading(false);
            setError(null);
        } catch (error) {
            console.error(error);
            setIssueList([]);
            setError(error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchIssues();
    }, []);

    const onSearchTextChanged = (e: ChangeEvent<HTMLInputElement>) =>
        setSearchText(e.target.value);

    let renderElement = <p>Loading...</p>;

    if (!isLoading) {
        if (error) {
            renderElement = <p>{ISSUES_FETCH_ERROR_MESSAGE}</p>;
        } else if (issueList.length) {
            renderElement = <IssueList list={issueList} />;
        } else {
            renderElement = <p>{NO_ISSUES_FOUND_MESSAGE}</p>;
        }
    }

    return (
        <Layout>
            <Head title="Issues" />
            <div className={classNames.container}>
                <SearchField
                    searchText={searchText}
                    onSearchTextChanged={onSearchTextChanged}
                    onSearchTextSubmitted={fetchIssues}
                    loading={isLoading}
                />
                {renderElement}
            </div>
        </Layout>
    );
};

export default Issues;
