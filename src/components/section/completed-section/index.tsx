import classNames from './completed-section.module.scss';
import Complete from '../../challenges/complete';

const CompletedSection = (props) => {
  let completeContent;

  if (props.screen == 'Challenges') {
    completeContent = props.sectionContent.map((challenge) => {
      if (!challenge.isActive) {
        return <Complete key={challenge.id} content={challenge} />;
      }
    });
  }
  return <div className={classNames.complete}>{completeContent}</div>;
};

export default CompletedSection;
