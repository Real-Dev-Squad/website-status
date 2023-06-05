import { FC, useState, useEffect, ChangeEvent } from 'react';
import IssueList from '../../components/issues/IssueList';
import classNames from '@/styles/issues.module.scss';
import Layout from '@/components/Layout';
import Head from '@/components/head';
import {
    ISSUES_FETCH_ERROR_MESSAGE,
    NO_ISSUES_FOUND_MESSAGE,
} from '@/constants/messages';
import { useLazyGetOrgIssuesQuery } from '@/app/services/issuesApi';

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
        <form
            className={classNames.searchFieldContainer}
            onSubmit={(e) => {
                e.preventDefault();
                onSearchTextSubmitted();
            }}
        >
            <input
                placeholder="Enter query string to search issues"
                value={searchText}
                onChange={onSearchTextChanged}
                className={classNames.issueSearchInput}
            />
            <button
                className={classNames.issuesSearchSubmitButton}
                disabled={loading || !searchText.trim()}
            >
                Submit
            </button>
        </form>
    );
};

const Issues: FC = () => {
    const [searchText, setSearchText] = useState<string>('');
    const [getIssues, { data: issueList = [], isLoading, error, isFetching }] =
        useLazyGetOrgIssuesQuery();

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

    useEffect(() => {
        getIssues('');
    }, []);

    return (
        <Layout>
            <Head title="Issues" />
            <div className={classNames.container}>
                <SearchField
                    searchText={searchText}
                    onSearchTextChanged={onSearchTextChanged}
                    onSearchTextSubmitted={() => getIssues(searchText, true)}
                    loading={isLoading || isFetching}
                />
                {renderElement}
            </div>
        </Layout>
    );
};

export default Issues;
