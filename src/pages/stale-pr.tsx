import { FC } from 'react';
import PullRequestList from '@/components/PullRequestList';
import { ThemedComponent } from '@/interfaces/themedComponent.type';

const stalePR: FC<ThemedComponent> = ({themeSetter, theme}) => <PullRequestList prType="stale" themeSetter={themeSetter} theme={theme} />;

export default stalePR;