import Image from 'next/image';
import { FC, HTMLProps } from 'react';

import classNames from '@/components/tasks/Card/EditButton/EditButton.module.scss';

interface EditButtonProps extends HTMLProps<HTMLDivElement> {
    handleClick: () => void;
    size?: number;
}

const EditButton: FC<EditButtonProps> = ({ handleClick, size, ...props }) => (
    <div
        className={classNames.editButton}
        data-testid="edit-button"
        role="button"
        onClick={handleClick}
        {...props}
    >
        <Image
            src="/pencil.webp"
            alt="Edit Button"
            width={size}
            height={size}
        />
    </div>
);

export default EditButton;
