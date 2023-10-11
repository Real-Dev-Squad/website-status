import { FC, useState, useEffect } from 'react';
import Head from '@/components/head';
import Layout from '@/components/Layout';
import PullRequest from '@/components/pullRequests';
import CardShimmer from '@/components/Loaders/cardShimmer';
import styles from './PullRequestList.module.scss';
import { useGetPrsQuery } from '@/app/services/pullRequestsApi';

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

function getNumberOfCards() {
    const screenHeight = globalThis.innerHeight;
    const screenWidth = globalThis.innerWidth;
    const cardHeight = 147;
    const minCardWidth = 300;
    const maxCardsHorizontally = 3;
    const minCardsHorizontally = 1;

    const cardWidth =
        screenWidth / 4 > minCardWidth ? screenWidth / 4 : minCardWidth;

    const checkForSmallDisplays =
        Math.floor(screenWidth / cardWidth) > minCardsHorizontally
            ? Math.floor(screenWidth / minCardWidth)
            : minCardsHorizontally;

    const horizontalNumberOfCards =
        maxCardsHorizontally > checkForSmallDisplays
            ? checkForSmallDisplays
            : maxCardsHorizontally;

    const verticalNumberOfCards = Math.floor(screenHeight / cardHeight);
    return Math.floor(verticalNumberOfCards * horizontalNumberOfCards);
}

function ScrollTop() {
    const topMargin =
        (document.documentElement && document.documentElement.scrollTop) ||
        document.body.scrollTop;
    return topMargin;
}
function ScrollHeight() {
    const WindowHeight =
        (document.documentElement && document.documentElement.scrollHeight) ||
        document.body.scrollHeight;
    return WindowHeight;
}

const PullRequestList: FC<PullRequestListProps> = ({ prType }) => {
    const [pullRequests, setPullRequests] = useState<pullRequestType[]>([]);
    const [noData, setNoData] = useState(false);
    const [page, setPage] = useState(1);
    const [isBottom, setIsBottom] = useState(false);
    const numberOfCards = getNumberOfCards();
    const {
        data: prs,
        error,
        isLoading,
    } = useGetPrsQuery({ prType, page, numberOfCards });

    useEffect(() => {
        if (!prs?.pullRequests?.length && page > 1) {
            setNoData(true);
        }
        if (prs?.pullRequests) {
            if (prs.pullRequests.length > 0) {
                setPullRequests((pullRequest) => [
                    ...pullRequest,
                    ...prs.pullRequests,
                ]);
                setIsBottom(false);
            }
        }
    }, [prs]);

    useEffect(() => {
        if (isBottom && !noData) {
            setPage((page) => page + 1);
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
            <div
                className={styles.scroll}
                data-testid="scrollableCardContainer"
            >
                {error && (
                    <p className={styles.center_text}>
                        Something went wrong! Please contact admin
                    </p>
                )}
                <div className={styles.prContainer}>
                    {pullRequests.map((pullRequest: pullRequestType) => {
                        const {
                            title,
                            username,
                            createdAt,
                            updatedAt,
                            url: link,
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
                    {isLoading &&
                        [...Array(15)].map((_, index: number) => (
                            <CardShimmer key={index} />
                        ))}
                </div>
            </div>
        </Layout>
    );
};

export default PullRequestList;
