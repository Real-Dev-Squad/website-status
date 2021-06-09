import { FC, useState, useEffect } from 'react';
import Head from '@/components/head';
import Layout from '@/components/Layout';
import PullRequest from '@/components/pullRequests';
import CardShimmer from '@/components/Loaders/cardShimmer';
import axios from 'axios';
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

const PullRequestList: FC<PullRequestListProps> = ({ prType }) => {
  const [pullRequests, setPullRequests] = useState<pullRequestType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);

  const prUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/pullrequests/${prType}?page=${page}`;

  const fetchPRs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(prUrl);
      setPullRequests(response.data.pullRequests);

      if (!response.data.pullRequests.length) {
        setError(`No more ${prType} PRs...`);
      } else {
        setError('');
      }
    } catch (err) {
      setPullRequests([]);
      setError('Error fetching pull requests!');
    } finally {
      setLoading(false);
    }
  };

  const handlePrev = () => {
    setPage(page > 1 ? page - 1 : 1);
  };

  const handleNext = () => {
    setPage(pullRequests.length ? page + 1 : page);
  };

  useEffect(() => {
    fetchPRs();
  }, [page]);

  const getPRs = () => pullRequests.map((pullRequest: pullRequestType) => {
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
  });

  return (
    <Layout>
      <Head title="PRs" />

      <div className="container">
        <div className={styles['openPRs-container']}>
          {loading
            ? [...Array(10)].map((e: number) => <CardShimmer key={e} />)
            : getPRs()}
        </div>
      </div>
      {error ? <p className={styles.center_text}>{error}</p> : ''}

      <div className={styles.pagination}>
        <button
          className={styles.pagination_btn}
          type="button"
          onClick={handlePrev}
          disabled={page <= 1}
        >
          Prev
        </button>

        <button
          className={styles.pagination_btn}
          type="button"
          onClick={handleNext}
          disabled={pullRequests.length === 0}
        >
          Next
        </button>
      </div>
    </Layout>
  );
};

export default PullRequestList;
