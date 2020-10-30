import classNames from './label.module.scss';

const Label = ({ text, value }) => {
  return (
    <p>
      <span className={classNames.description}>{text}</span>:
      <span className={classNames.descValue}>{value}</span>
    </p>
  );
};

export default Label;
