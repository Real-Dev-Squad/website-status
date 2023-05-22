import React, { FC } from 'react';

import styles from '@/components/standup/standupContainer.module.scss';
import { InputProps } from '@/interfaces/standup.type';

const FormInputComponent: FC<InputProps> = ({
    placeholder,
    name,
    value,
    dataTestId,
    handleChange,
}) => {
    return (
        <input
            data-testid={dataTestId}
            type="text"
            className={styles.inputField}
            placeholder={placeholder}
            required
            name={name}
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e)
            }
        />
    );
};

export default React.memo(FormInputComponent);
