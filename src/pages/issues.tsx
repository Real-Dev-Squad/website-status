import { FC, useState, useEffect } from 'react';
import IssueList from '../components/issues/IssueList';
import classNames from '@/styles/issues.module.scss';
import Layout from '@/components/Layout';
import Head from '@/components/head';
import {
    ISSUES_FETCH_ERROR_MESSAGE,
    NO_ISSUES_FOUND_MESSAGE,
} from '@/components/constants/messages';
import { ISSUES_URL } from '@/components/constants/url';
import axios from 'axios';

type SearchFieldProps = {
    searchText: string;
    onSearchTextChanged: (event: any) => void;
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
    const [issueList, setIssueList] = useState<[]>([]);
    const [searchText, setSearchText] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<null | any>(null);

    const fetchIssues = async () => {
        try {
            setIsLoading(true);
            const res = await fetch(`${ISSUES_URL}?q=${searchText}`);
            const data = await res.json();
            if ('issues' in data) {
                const issuesAndPullRequests: any = data.issues;
                const onlyIssues = issuesAndPullRequests.filter(
                    (issue: { hasOwnProperty: (arg0: string) => any }) =>
                        !Object.prototype.hasOwnProperty.call(
                            issue,
                            'pull_request'
                        )
                );
                setIssueList(onlyIssues);
            }
            setIsLoading(false);
            setError(null);
        } catch (error) {
            setIssueList([]);
            setError(error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchIssues();
    }, []);

    const onSearchTextChanged = (e: any) => setSearchText(e.target.value);

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
                {!isLoading && !!error && <p>{ISSUES_FETCH_ERROR_MESSAGE}</p>}
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        {issueList.length > 0 ? (
                            <IssueList list={issueList} />
                        ) : (
                            !error && NO_ISSUES_FOUND_MESSAGE
                        )}
                    </>
                )}
            </div>
        </Layout>
    );
};

export default Issues;
