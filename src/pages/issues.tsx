import { FC, useState, useEffect } from "react";
import useFetch from "@/hooks/useFetch";
import IssueList from "../components/issues/IssueList";
import classNames from "@/styles/issues.module.scss";
import Layout from "@/components/Layout";
import Head from "@/components/head";
import { ISSUES_FETCH_ERROR_MESSAGE, NO_ISSUES_FOUND_MESSAGE } from "@/components/constants/messages";

const ISSUES_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/issues/website-backend`;
const Issues: FC = () => {
	const [issueList, setissueList] = useState<[]>([]);

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
		(async () => {})();
	}, []);

	useEffect(() => {
		if ("issues" in response) {
			const issues = response.issues;
			const onlyIssues = issues.filter(
				(issue: { hasOwnProperty: (arg0: string) => any }) =>
					!issue.hasOwnProperty("pull_request")
			);
			setissueList(onlyIssues);
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
