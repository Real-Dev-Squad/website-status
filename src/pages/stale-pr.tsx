import Section from 'components/pullRequests/section';
import Layout from 'components/Layout';
import Navbar from 'components/navbar';
import { Helmet } from 'react-helmet';
import { FunctionComponent } from 'react';

const stalePR: FunctionComponent<Props> = ({stalePRs}) => {
    return (
        <div>
            <Layout>
                <Helmet>
                    <title>Stale PRs | Status Real Dev Squad</title>
                </Helmet>
                <Navbar page = 'StalePRs'/>
                    <div className="container">
                        <Section heading='Stale PRs' content= {stalePRs.pullRequests}/>
                    </div>
            </Layout>
        </div>
    )
}

export async function getStaticProps() {
    const res = await fetch('https://staging-api.realdevsquad.com/pullrequests/stale')
    const stalePRs = await res.json()
    return {
      props: {
        stalePRs,
      }
    }
}

export default stalePR;
