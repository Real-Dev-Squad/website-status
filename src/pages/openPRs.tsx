import { FC } from 'react';
import PullRequestList from '@/components/PullRequestList';

const openPRs: FC = () => <PullRequestList prType="open" />;

export default openPRs;
