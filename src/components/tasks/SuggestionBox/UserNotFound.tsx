import styles from './suggestion.module.scss';

const UserNotFound = () => {
    return (
        <div className={styles['no-suggestions']} data-testid="user_not_found">
            User not found!
        </div>
    );
};

export default UserNotFound;
