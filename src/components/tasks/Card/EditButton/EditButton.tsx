import Image from 'next/image';
import { FC } from 'react';

import classNames from '@/components/tasks/Card/EditButton/EditButton.module.scss';

type EditButtonProps = {
    handleClick: () => void;
    size?: number;
};

const EditButton: FC<EditButtonProps> = ({ handleClick, size }) => (
    <div
        className={classNames.editButton}
        data-testid="edit-button"
        role="button"
        onClick={handleClick}
    >
        <Image
            src="/pencil.webp"
            alt="Edit Button"
            width={size}
            height={size}
            tabIndex={0}
        />
    </div>
);

export default EditButton;
