import { FC, useState, useEffect } from 'react';
import Head from '@/components/head';
import Layout from '@/components/Layout';
import PullRequest from '@/components/pullRequests';
import CardShimmer from '@/components/Loaders/cardShimmer';
import useFetch from '@/hooks/useFetch';
import styles from './PullRequestList.module.scss';

type pullRequestType = {
  title: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  url: string;
};

type PullRequestListProps = {
    prType: string;
};

function ScrollTop() {
  const topMargin = (document.documentElement
    && document.documentElement.scrollTop)
    || document.body.scrollTop;
  return topMargin;
}
function ScrollHeight() {
  const WindowHeight = (document.documentElement
    && document.documentElement.scrollHeight)
    || document.body.scrollHeight;
  return WindowHeight;
}

const PullRequestList: FC<PullRequestListProps> = ({ prType }) => {
  const [pullRequests, setPullRequests] = useState<pullRequestType[]>([]);
  const [noData, setNoData] = useState(false);
  const [page, setPage] = useState(1);
  const [isBottom, setIsBottom] = useState(false);

  const prUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/pullrequests/${prType}?page=${page}`;
  const {
    response,
    error,
    isLoading,
  } = useFetch(prUrl);

  useEffect(() => {
    if (!response?.pullRequests?.length && page > 1) {
      setNoData(true);
    }
    if (response?.pullRequests?.length > 0) {
      setPullRequests((pullRequest) => [...pullRequest, ...response.pullRequests]);
      setIsBottom(false);
    }
  }, [response]);

  useEffect(() => {
    if (isBottom && !noData) {
      setPage(page + 1);
    }
  }, [isBottom]);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = ScrollTop();
      const scrollHeight = ScrollHeight();
      if (scrollTop + window.innerHeight + 50 >= scrollHeight) {
        setIsBottom(true);
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <Layout>
      <Head title="PRs" />
      <div className={styles.scroll}>
        {
          error
            && <p className={styles.center_text}>Something went wrong! Please contact admin</p>
        }
        <div className={styles.prContainer}>
          {pullRequests.map((pullRequest: pullRequestType) => {
            const {
              title, username, createdAt, updatedAt, url: link,
            } = pullRequest;
            return (
              <PullRequest
                key={link}
                title={title}
                username={username}
                createdAt={createdAt}
                updatedAt={updatedAt}
                url={link}
              />
            );
          })}
          {
            isLoading
            && [...Array(15)].map((e: number) => <CardShimmer key={e} />)
          }
        </div>
      </div>
    </Layout>
  );
};

export default PullRequestList;
