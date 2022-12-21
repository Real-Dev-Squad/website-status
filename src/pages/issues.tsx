import { FC, useState, useEffect } from "react";
import useFetch from "@/hooks/useFetch";
import IssueList from "../components/issues/IssueList";

const ISSUES_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/issues/website-backend`;
const Issues: FC = () => {
  const [issueList, setissueList] = useState<[]>([]);

  const { response, error, isLoading } = useFetch(ISSUES_URL);

  useEffect(() => {
    if ("issues" in response) {
      const issues = response.issues;
      const onlyIssues = issues.filter(issue => (!(issue.hasOwnProperty('pull_request'))));
      setissueList(onlyIssues);
    }
  }, [isLoading, response]);

  return (
    <div className="app">
      <IssueList list={issueList} />
    </div>
  );
};

export default Issues;
