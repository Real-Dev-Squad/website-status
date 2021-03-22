import { FC, useState, useEffect } from 'react';
import Head from '@/components/head';
import Layout from '@/components/Layout';
import PullRequest from '@/components/pullRequests';
import fetch from '@/helperFunctions/fetch';
import CardShimmer from '@/components/Loaders/cardShimmer';

type pullRequestType = {
  title: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  url: string;
};

const stalePR: FC = () => {
  const [pullRequests, setPullRequests] = useState<pullRequestType[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  async function fetchStalePRs() {
    setLoading(true);
    const response = await fetch({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/pullrequests/stale?page=${page}`,
    });
    setPullRequests(response.data.pullRequests);
    setLoading(false);
  }

  function handlePrev() {
    setPage(page > 1 ? page - 1 : 1);
  }

  function handleNext() {
    setPage(pullRequests.length ? page + 1 : page);
  }

  useEffect(() => {
    fetchStalePRs();
  }, [page]);

  const getPRs = () => pullRequests.map((pullRequest: pullRequestType) => {
    const {
      title, username, createdAt, updatedAt, url: link,
    } = pullRequest;
    return (
      <>
        <PullRequest
          key={link}
          title={title}
          username={username}
          createdAt={createdAt}
          updatedAt={updatedAt}
          url={link}
        />
      </>
    );
  });

  return (
    <Layout>
      <Head title="Stale PRs" />

      <div className="container">
        {loading
          ? [...Array(10)].map((e: number) => <CardShimmer key={e} />)
          : getPRs()}
      </div>
      {!pullRequests.length ? <p className="center-text">No more stale PRs...</p> : ''}

      <div className="pagination">
        <button
          className="pagination-btn"
          type="button"
          onClick={handlePrev}
          disabled={page <= 1}
        >
          Prev
        </button>

        <button
          className="pagination-btn"
          type="button"
          onClick={handleNext}
          disabled={pullRequests.length === 0}
        >
          Next
        </button>
      </div>

      <style jsx>
        {`
        .center-text {
          font-size: 1.5em;
          text-align: center;
        }

        .pagination {
          display: flex;
          justify-content: center;
        }

        .pagination-btn {
          margin: 1rem;
          padding: 1rem;
          font-size: 1.5em;
          cursor: pointer;
          border: none;
          background-color: #bfbfbf;
          border-radius: 5px;
        }
      `}
      </style>
    </Layout>
  );
};

export default stalePR;
