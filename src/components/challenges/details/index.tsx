import { FC } from 'react';
import classNames from '@/components/challenges/details/details.module.scss';

type IndexProps = { text: string; value: string | number };

const Index: FC<IndexProps> = ({ text, value }: IndexProps) => (
  <p>
    <span className={classNames.description}>{text}</span>
    :
    <span className={classNames.descValue}>{value}</span>
  </p>
);

export default Index;
