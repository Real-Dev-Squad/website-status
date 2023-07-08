import { FC } from 'react';

import styles from '@/components/standup/standupContainer.module.scss';
import { InputProps } from '@/types/standup.type';

const FormInputComponent: FC<InputProps> = ({
    placeholder,
    name,
    value,
    dataTestId,
    labelValue,
    htmlFor,
    inputId,
    handleChange,
}) => {
    return (
        <>
            <label className={styles.updateHeading} htmlFor={htmlFor}>
                {labelValue}
            </label>
            <input
                id={inputId}
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
        </>
    );
};

export default FormInputComponent;
