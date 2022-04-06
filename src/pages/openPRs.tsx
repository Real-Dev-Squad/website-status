import { FC } from 'react';
import PullRequestList from '@/components/PullRequestList';
import { ThemedComponent } from '@/interfaces/themedComponent.type';

const openPRs: FC<ThemedComponent> = ({themeSetter, theme}) => <PullRequestList prType="open" themeSetter={themeSetter} theme={theme} />;

export default openPRs;
