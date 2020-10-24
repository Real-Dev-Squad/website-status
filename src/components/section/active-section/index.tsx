import classNames from './active-section.module.scss';
import Active from '../../challenges/active';

const ActiveSection = (props) => {
  let activeContent;

  if (props.screen == 'Challenges') {
    activeContent = props.sectionContent.map((challenge) => {
      if (challenge.isActive) {
        return <Active key={challenge.id} content={challenge} />;
      }
    });
  }
  return <div className={classNames.active}>{activeContent}</div>;
};

export default ActiveSection;
