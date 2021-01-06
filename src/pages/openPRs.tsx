import { FunctionComponent, useState, useEffect } from 'react';
import fetch from '../helperFunctions/fetch';
import Layout from '../components/Layout';
import Navbar from '../components/navbar';
import PullRequest from '../components/pullRequests';

const openPRs: FunctionComponent = () => {
    const url = 'https://staging-api.realdevsquad.com/pullrequests/open';
    const [state, setState] = useState(null);

    useEffect(() => {
        (async () => {
            const response = await fetch(url);
            setState(response.data.pullRequests);
        })();
    }, []);

    const getPRs = () => {
        return state.map((pullRequest) => {
            return (
                <PullRequest key={pullRequest.title} 
                             title={pullRequest.title} 
                             username={pullRequest.username}
                             createdAt={pullRequest.createdAt}
                             updatedAt={pullRequest.updatedAt}
                             url={pullRequest.url} />
            );
        });
    };

    return (
        <Layout>
            <Navbar page="OpenPRs" />
            {state ? <div className="container">
                {getPRs()}
            </div> : null}
        </Layout>
    );
};

export default openPRs;