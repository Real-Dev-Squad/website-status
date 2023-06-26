import { FC, useState, useEffect } from 'react';
import moment from 'moment';
import styles from '@/components/standup/standupContainer.module.scss';

import {
    useSaveProgressMutation,
    useUserProgressDetailsQuery,
} from '@/app/services/progressesApi';
import { useGetUserQuery } from '@/app/services/userApi';

import FormInputComponent from './FormInputComponent';
import { standupUpdateType } from '@/types/standup.type';
import { getTotalMissedUpdates } from '@/utils/getTotalMissedUpdate';
import { toast, ToastTypes } from '@/helperFunctions/toast';
import {
    ERROR_MESSAGE,
    STANDUP_SUBMISSION_SUCCESS,
} from '@/constants/constants';
import ProgressHeader from '../ProgressForm/ProgressHeader';

const defaultState = {
    type: 'user',
    completed: '',
    planned: '',
    blockers: '',
};

const StandUpContainer: FC = () => {
    const [standupUpdate, setStandupUpdate] =
        useState<standupUpdateType>(defaultState);

    const [addStandup] = useSaveProgressMutation();
    const { data: user } = useGetUserQuery();
    const { data: userStandupdata } = useUserProgressDetailsQuery(user?.id);

    const { SUCCESS, ERROR } = ToastTypes;
    const standupDates = userStandupdata?.data?.map((element) => element.date);
    const totalMissedUpdates = getTotalMissedUpdates(standupDates || []);
    const yesterdayDate = moment().subtract(1, 'days').format('MMMM DD, YYYY');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStandupUpdate((prevStandupUpdate) => ({
            ...prevStandupUpdate,
            [event.target.name]: event.target.value,
        }));
    };
    const isValidate = () => {
        return (
            standupUpdate.completed !== '' &&
            standupUpdate.planned !== '' &&
            standupUpdate.blockers !== ''
        );
    };

    const buttonStyleClass = !isValidate()
        ? `${styles.nonActiveButton}`
        : `${styles.activeButton}`;

    const handleFormSubmission = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();
        try {
            await addStandup(standupUpdate);
            toast(SUCCESS, STANDUP_SUBMISSION_SUCCESS);
            setStandupUpdate(defaultState);
        } catch (error) {
            console.error(error);
            toast(ERROR, ERROR_MESSAGE);
        }
    };

    return (
        <>
            <section className="container">
                <ProgressHeader
                    totalMissedUpdates={totalMissedUpdates}
                    updateType="Standup"
                />
                <div className={styles.standupContainer}>
                    <div className={styles.standupUpdateContainer}>
                        <h1 className={styles.standupTitle}>Standup Update</h1>
                        <form
                            className={styles.standupForm}
                            onSubmit={handleFormSubmission}
                            data-testid="form"
                        >
                            <fieldset className={styles.formFields}>
                                <FormInputComponent
                                    htmlFor="completed"
                                    labelValue={yesterdayDate}
                                    dataTestId="completedInputField"
                                    placeholder="e.g Raised PR for adding new config"
                                    name="completed"
                                    value={standupUpdate.completed}
                                    inputId="completed"
                                    handleChange={handleChange}
                                />
                                <FormInputComponent
                                    htmlFor="planned"
                                    labelValue="Today"
                                    dataTestId="todayInputField"
                                    placeholder="e.g Refactor signup to support Google login"
                                    name="planned"
                                    value={standupUpdate.planned}
                                    inputId="planned"
                                    handleChange={handleChange}
                                />
                                <FormInputComponent
                                    htmlFor="blockers"
                                    labelValue="Blockers"
                                    dataTestId="blockerInputField"
                                    placeholder="e.g Waiting on identity team to deploy FF"
                                    name="blockers"
                                    value={standupUpdate.blockers}
                                    inputId="blockers"
                                    handleChange={handleChange}
                                />
                            </fieldset>
                            <button
                                className={`${styles.submitButton} ${buttonStyleClass}`}
                                disabled={!isValidate()}
                                type="submit"
                                data-testid="button"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default StandUpContainer;
