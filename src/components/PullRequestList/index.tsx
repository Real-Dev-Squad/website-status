import React, { FC, useState, useEffect } from 'react';
import Head from '@/components/head';
import Layout from '@/components/Layout';
import PullRequest from '@/components/pullRequests';
import CardShimmer from '@/components/Loaders/cardShimmer';
import axios from 'axios';
import styles from './PullRequestList.module.scss';

axios.defaults.timeout = 3000;
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
  const [noData, setNoData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);

  const prUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/pullrequests/${prType}?page=${page}`;

  const fetchPRs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(prUrl);
      if (page > 1) {
        const newres = [...pullRequests, ...response.data.pullRequests];
        setPullRequests(newres);
      } else {
        setPullRequests(response.data.pullRequests);
      }

      if (!response.data.pullRequests.length) {
        setNoData(true);
      }
    } catch (err) {
      setPullRequests([]);
      setError('Error fetching pull requests!');
    } finally {
      setLoading(false);
    }
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
  const firstEvent = (e: any) => {
    if (e.target.clientHeight + e.target.scrollTop >= e.target.scrollHeight) {
      if (!noData) {
        const pg = page + 1;
        setPage(pg);
      }
    }
  };
  return (
    <Layout>
      <Head title="PRs" />

      <div className={styles.scroll} onScroll={firstEvent}>
        {loading
          ? [...Array(10)].map((e: number) => <CardShimmer key={e} />)
          : getPRs()}
      </div>
      {error ? <p className={styles.center_text}>{error}</p> : ''}
    </Layout>
  );
};

export default PullRequestList;
