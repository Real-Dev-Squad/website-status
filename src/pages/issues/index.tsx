import { FC, useState, useEffect, ChangeEvent } from 'react';
import IssueList from '../../components/issues/IssueList';
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
import { useRouter } from 'next/router';
import { getQueryStringFromInput } from '@/utils/getQueryStringFromInput';
import { getQueryStringFromUrl } from '@/utils/getQueryStringFromUrl';

type SearchFieldProps = {
    onSearchTextSubmitted: (querySearchString: string) => void;
    loading: boolean;
};

const handleFeatureFlag = (dev = '', cb: () => void) => {
    if (dev === 'true') {
        cb();
    }
};

const SearchField = ({ onSearchTextSubmitted, loading }: SearchFieldProps) => {
    const router = useRouter();
    const dev = router?.query?.dev;
    const qQueryParam = router?.query?.q;
    const [searchText, setSearchText] = useState<string>('');
    const onSearchTextChanged = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

    const queryParamValue = getQueryStringFromInput(searchText);
    const updateQueryString = () => {
        router.push({
            query: {
                ...router.query,
                q: `search:${queryParamValue.text.toLowerCase()}`,
            },
        });
    };

    const handleOnSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearchTextSubmitted(searchText);
        handleFeatureFlag(router?.query?.dev?.toString(), updateQueryString);
    };

    useEffect(() => {
        const querySearchString = getQueryStringFromUrl(router) as string;
        handleFeatureFlag(dev?.toString(), () => {
            setSearchText(querySearchString);
        });
    }, [dev, qQueryParam]);
    return (
        <form
            className={classNames.searchFieldContainer}
            onSubmit={(e) => {
                handleOnSubmit(e);
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
                disabled={loading || !(searchText ?? '').trim()}
            >
                Submit
            </button>
        </form>
    );
};

const Issues: FC = () => {
    const querySearchString = '';
    const router = useRouter();
    const dev = router?.query?.dev;
    const isDevMode = dev === 'true';

    // const qQueryParam = router?.query?.q;
    const [issueList, setIssueList] = useState<IssueItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<null | any>(null);

    const fetchIssues = async (searchText = '') => {
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
        const querySearchString = getQueryStringFromUrl(router) as string;
        if (isDevMode && querySearchString) {
            fetchIssues(querySearchString);
        }
    }, [dev, querySearchString]);

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
                    onSearchTextSubmitted={fetchIssues}
                    loading={isLoading}
                />
                {renderElement}
            </div>
        </Layout>
    );
};

export default Issues;
