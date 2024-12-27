import styles from './userAvatar.module.scss';

type UserAvatarProps = {
    userProfileImageUrl: string;
};

export const UserAvatar = ({ userProfileImageUrl }: UserAvatarProps) => {
    return (
        <img
            src={userProfileImageUrl}
            alt="Avatar"
            className={styles['user-avatar']}
        />
    );
};
