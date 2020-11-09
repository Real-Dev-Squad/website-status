import { FunctionComponent } from 'react';
import classNames from './details.module.scss';

type IndexProps = { text: string; value: string | number };

const Index: FunctionComponent<IndexProps> = ({ text, value }) => {
  return (
    <p>
      <span className={classNames.description}>{text}</span>:
      <span className={classNames.descValue}>{value}</span>
    </p>
  );
};

export default Index;
