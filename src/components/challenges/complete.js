import classNames from './styles.module.scss';
import Details from './details/details';
import PropTypes from 'prop-types';

const Complete = ({ content }) => {
  return (
    <div className={classNames.boxConent}>
      <p className={classNames.heading}>{content.title}</p>
      <Details text='Level' value={content.level} />
      <Details text='Challenge Started' value={content.start_date} />
      <Details text='Challenge Ends' value={content.end_date} />
      <Details text='Active Participants' value={content.participants.length} />
      <p className={classNames.viewStats}>
        <a href='#'>View Stats</a>
      </p>
    </div>
  );
};

Complete.propTypes = {
  content: PropTypes.object,
};

export default Complete;
