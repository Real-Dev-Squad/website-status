import { FC, useState, useEffect } from 'react';
import useFetch from '@/hooks/useFetch';
import IssueList from '../components/issues/IssueList';
import classNames from '@/styles/issues.module.scss';
import Layout from '@/components/Layout';
import Head from '@/components/head';
import {
    ISSUES_FETCH_ERROR_MESSAGE,
    NO_ISSUES_FOUND_MESSAGE,
} from '@/components/constants/messages';
import { ISSUES_URL } from '@/components/constants/url';

const Issues: FC = () => {
    const [issueList, setIssueList] = useState<[]>([]);

    const { response, error, isLoading } = useFetch(ISSUES_URL, {
        data: {
            userData: {
                roles: {
                    super_user: true,
                },
            },
        },
    });

    useEffect(() => {
        if ('issues' in response) {
            const issuesAndPullRequests = response.issues;
            const onlyIssues = issuesAndPullRequests.filter(
                (issue: { hasOwnProperty: (arg0: string) => any }) =>
                    !Object.prototype.hasOwnProperty.call(issue, 'pull_request')
            );
            setIssueList(onlyIssues);
        }
    }, [isLoading, response]);

    return (
        <Layout>
            <Head title="Issues" />
            <div className={classNames.container}>
                {!!error && <p>{ISSUES_FETCH_ERROR_MESSAGE}</p>}
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
