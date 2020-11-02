import classNames from './details.module.scss';
import PropTypes from 'prop-types';

const Details = ({ text, value }) => {
  return (
    <p>
      <span className={classNames.description}>{text}</span>:
      <span className={classNames.descValue}>{value}</span>
    </p>
  );
};

Details.propTypes = {
  text: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default Details;
