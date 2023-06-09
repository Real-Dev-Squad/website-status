import classNames from './suggestion.module.scss';

const Loading = () => {
    return (
        <div className={classNames['loading']} data-testid="loading">
            Loading...
        </div>
    );
};

export default Loading;
