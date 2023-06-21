import { FC, HTMLProps } from 'react';

import classNames from '@/components/tasks/Card/AssigneeButton/AssigneeButton.module.scss';
interface Props extends HTMLProps<HTMLButtonElement> {
    handleClick: () => Promise<void>;
    assignee?: string;
    isDisabled: boolean;
}

const AssigneeButton: FC<Props> = ({ handleClick, assignee, isDisabled }) => {
    return (
        <button
            className={classNames.card__top__button}
            type="button"
            disabled={isDisabled}
            onClick={handleClick}
        >
            {`Assign to ${assignee}`}
        </button>
    );
};

export default AssigneeButton;
