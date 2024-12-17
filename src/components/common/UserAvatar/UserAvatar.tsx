import styles from './userAvatar.module.scss';

type UserAvatarProps = {
    userProfileImageUrl: string;
};

const UserAvatar = ({ userProfileImageUrl }: UserAvatarProps) => {
    return (
        <img
            src={userProfileImageUrl}
            alt="Avatar"
            className={styles['user-avatar']}
        />
    );
};

export default UserAvatar;
