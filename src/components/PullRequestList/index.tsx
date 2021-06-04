import React, { FC, useState, useEffect } from 'react';
import Head from '@/components/head';
import Layout from '@/components/Layout';
import PullRequest from '@/components/pullRequests';
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
  const [isBottom, setIsBottom] = useState(false);

  const prUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/pullrequests/${prType}?page=${page}`;

  const fetchPRs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(prUrl);
      if (!response.data.pullRequests.length) {
        setNoData(true);
      }
      if (page > 1) {
        setPullRequests((pullRequest) => [...pullRequest, ...response.data.pullRequests]);
      } else {
        setPullRequests(response.data.pullRequests);
      }
    } catch (err) {
      setPullRequests([]);
      setError('Error fetching pull requests!');
    } finally {
      setLoading(false);
      setIsBottom(false);
    }
  };
  useEffect(() => {
    fetchPRs();
  }, [page]);

  useEffect(() => {
    if (isBottom && !noData) {
      setPage(page + 1);
    }
  }, [isBottom]);
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = (document.documentElement
        && document.documentElement.scrollTop)
        || document.body.scrollTop;
      const scrollHeight = (document.documentElement
          && document.documentElement.scrollHeight)
          || document.body.scrollHeight;
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
        <ul>
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
        </ul>
        {loading
          ? <p> loading...</p>
          : ''}
        {error ? <p className={styles.center_text}>{error}</p> : ''}
      </div>
    </Layout>
  );
};

export default PullRequestList;
