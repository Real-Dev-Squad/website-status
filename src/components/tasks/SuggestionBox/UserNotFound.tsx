import classNames from './suggestion.module.scss';

const UserNotFound = () => {
    return (
        <span
            className={classNames['no-suggestions']}
            data-testid="user_not_found"
        >
            User not found!
        </span>
    );
};

export default UserNotFound;
