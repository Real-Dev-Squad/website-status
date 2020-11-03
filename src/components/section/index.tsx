import ActiveSection from './active-section';
import CompletedSection from './completed-section';
import classNames from './section.module.scss';
import PropTypes from 'prop-types';

const Index = ({ content, screen }) => {
  return (
    <section className={classNames.section}>
      <ActiveSection sectionContent={content} screen={screen} />
      <CompletedSection sectionContent={content} screen={screen} />
    </section>
  );
};

Index.propTypes = {
  content: PropTypes.array,
  screen: PropTypes.string,
};

export default Index;
