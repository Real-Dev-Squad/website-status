import { FunctionComponent, useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import Navbar from '../components/navbar';
import PullRequest from '../components/pullRequests';

const openPRs: FunctionComponent = () => {
    axios.defaults.baseURL = 'https://staging-api.realdevsquad.com/';

    const [state, updateState] = useState(null);
    useEffect(() => {
        axios.get('/pullrequests/open')
            .then((response) => {
                updateState(response.data.pullRequests);
                console.log(state);
            });
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