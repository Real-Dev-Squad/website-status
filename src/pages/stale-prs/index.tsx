import { FC } from 'react';
import PullRequestList from '@/components/PullRequestList';

const stalePRs: FC = () => <PullRequestList prType="stale" />;

export default stalePRs;
