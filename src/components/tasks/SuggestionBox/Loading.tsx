import classNames from './suggestion.module.scss';

const Loading = () => {
    return (
        <span className={classNames['loading']} data-testid="loading">
            Loading...
        </span>
    );
};

export default Loading;
