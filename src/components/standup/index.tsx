import { FC, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '@/components/standup/standupContainer.module.scss';

import {
    useSaveProgressMutation,
    useGetProgressDetailsQuery,
} from '@/app/services/progressesApi';
import { useGetUserQuery } from '@/app/services/userApi';

import FormInputComponent from './FormInputComponent';
import { standupUpdateType } from '@/types/standup.type';
import { getTotalMissedUpdates } from '@/utils/getTotalMissedUpdate';
import { toast, ToastTypes } from '@/helperFunctions/toast';
import {
    ERROR_MESSAGE,
    STANDUP_SUBMISSION_SUCCESS,
    STANDUP_ALREADY_SUBMITTED,
    STANDUPTIME,
} from '@/constants/constants';
import ProgressHeader from '../ProgressForm/ProgressHeader';
import { getCurrentDate } from '@/utils/getCurrentDate';

const defaultState = {
    type: 'user',
    completed: '',
    planned: '',
    blockers: '',
};

const StandUpContainer: FC = () => {
    const router = useRouter();
    const [standupUpdate, setStandupUpdate] =
        useState<standupUpdateType>(defaultState);

    const [addStandup] = useSaveProgressMutation();
    const { data: user } = useGetUserQuery();
    const { data: userStandupdata } = useGetProgressDetailsQuery({
        userId: user?.id,
    });

    const { SUCCESS, ERROR } = ToastTypes;
    const standupDates = userStandupdata?.data?.map((element) => element.date);
    const totalMissedUpdates = getTotalMissedUpdates(standupDates || []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStandupUpdate((prevStandupUpdate) => ({
            ...prevStandupUpdate,
            [event.target.name]: event.target.value,
        }));
    };

    const currentDate = getCurrentDate(STANDUPTIME);

    const isValidate = () => {
        return (
            standupUpdate.completed &&
            standupUpdate.planned &&
            standupUpdate.blockers
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
            const response = await addStandup(standupUpdate);
            if ('error' in response) {
                toast(ERROR, STANDUP_ALREADY_SUBMITTED);
            } else {
                toast(SUCCESS, STANDUP_SUBMISSION_SUCCESS);
            }
            setStandupUpdate(defaultState);
        } catch (error) {
            console.error(error);
            toast(ERROR, ERROR_MESSAGE);
        }

        router.replace(router.asPath);
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
                        <h4 className={styles.StandupDate}>
                            Current Date - {currentDate}
                        </h4>
                        <form
                            className={styles.standupForm}
                            onSubmit={handleFormSubmission}
                            aria-label="form"
                        >
                            <fieldset className={styles.formFields}>
                                <FormInputComponent
                                    htmlFor="completed"
                                    labelValue="Yesterday"
                                    placeholder="e.g Raised PR for adding new config"
                                    name="completed"
                                    value={standupUpdate.completed}
                                    inputId="completed"
                                    handleChange={handleChange}
                                />
                                <FormInputComponent
                                    htmlFor="planned"
                                    labelValue="Today"
                                    placeholder="e.g Refactor signup to support Google login"
                                    name="planned"
                                    value={standupUpdate.planned}
                                    inputId="planned"
                                    handleChange={handleChange}
                                />
                                <FormInputComponent
                                    htmlFor="blockers"
                                    labelValue="Blockers"
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
