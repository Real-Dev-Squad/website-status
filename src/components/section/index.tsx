import ActiveSection from './active-section';
import CompletedSection from './completed-section';

const Challenges = (props) => {
  return (
    <>
      <ActiveSection sectionContent={props.content} screen={props.screen}/>
      <CompletedSection sectionContent={props.content} screen={props.screen}/>
    </>
  );
};

export default Challenges;
