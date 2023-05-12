import { FC } from 'react';
import PullRequestList from '@/components/PullRequestList';

const stalePR: FC = () => <PullRequestList prType="stale" />;

export default stalePR;
