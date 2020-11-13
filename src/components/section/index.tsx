import { FunctionComponent } from 'react';
import ActiveSection from './active-section';
import CompletedSection from './completed-section';
import classNames from './section.module.scss';

type IndexProps = {
  content: { is_active: number; id: number }[];
  screen: string;
};

const Index: FunctionComponent<IndexProps> = ({ content, screen }) => {
  return (
    <section className={classNames.section}>
      <ActiveSection sectionContent={content} screen={screen} />
      <CompletedSection sectionContent={content} screen={screen} />
    </section>
  );
};

export default Index;
