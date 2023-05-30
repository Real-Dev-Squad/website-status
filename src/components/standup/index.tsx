import { FC, useState, useEffect } from 'react';
import moment from 'moment';
import styles from '@/components/standup/standupContainer.module.scss';

import {
    useAddStandupMutation,
    useUserStandupDetailsQuery,
} from '@/app/services/standup';
import { useGetUserQuery } from '@/app/services/userApi';

import FormInputComponent from './FormInputComponent';
import { standupUpdateType } from '@/types/standup.type';
import { getTotalMissedUpdate } from '@/utils/getTotalMissedUpdate';
import { toast, ToastTypes } from '@/helperFunctions/toast';

const StandUpContainer: FC = () => {
    const [standupUpdate, setStandupUpdate] = useState<standupUpdateType>({
        type: 'user',
        completed: '',
        planned: '',
        blockers: '',
    });

    const [buttonDisable, setButtonDisable] = useState<boolean>(true);
    const [addStandup] = useAddStandupMutation();
    const { data: user } = useGetUserQuery();
    const { data: userStandupdata } = useUserStandupDetailsQuery(user?.id);

    const { SUCCESS, ERROR } = ToastTypes;
    const standupDates = userStandupdata?.data?.map((element) => element.date);
    const totalMissedUpdate = getTotalMissedUpdate(standupDates || []);
    const yesterdayDate = moment().subtract(1, 'days').format('MMMM DD, YYYY');

    const buttonStyleClass = buttonDisable
        ? `${styles.nonActiveButton}`
        : `${styles.activeButton}`;

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
    useEffect(() => {
        const isValid = isValidate();
        setButtonDisable(!isValid);
    }, [standupUpdate.completed, standupUpdate.planned]);

    const handleFormSubmission = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();
        try {
            await addStandup(standupUpdate);
            toast(SUCCESS, 'Standup submitted successfully');
            setStandupUpdate({
                type: 'user',
                completed: '',
                planned: '',
                blockers: '',
            });
        } catch (error) {
            toast(ERROR, 'Something went wrong!');
        }
    };

    return (
        <>
            <section className="container">
                <div className={styles.standupContainer}>
                    <div className={styles.standupBanner}>
                        <p className={styles.bannerPara}>
                            You have
                            <span
                                className={styles.totalMissedUpdate}
                                data-testid="missed-updates"
                            >
                                {totalMissedUpdate} missed
                            </span>
                            Standup updates this week
                        </p>
                        <p className={styles.bannerPara}>
                            Let&apos;s try to avoid having zero days{' '}
                        </p>
                    </div>
                    <div className={styles.standupUpdateContainer}>
                        <h1 className={styles.standupTitle}>Standup Update</h1>
                        <form
                            className={styles.standupForm}
                            onSubmit={handleFormSubmission}
                        >
                            <fieldset className={styles.formFields}>
                                <FormInputComponent
                                    htmlFor="completed"
                                    labelValue={yesterdayDate}
                                    dataTestId="yesterday-input-update"
                                    placeholder="e.g Raised PR for adding new config"
                                    name="completed"
                                    value={standupUpdate.completed}
                                    inputId="completed"
                                    handleChange={handleChange}
                                />
                                <FormInputComponent
                                    htmlFor="planned"
                                    labelValue="Today"
                                    dataTestId="today-input-update"
                                    placeholder="e.g Refactor signup to support Google login"
                                    name="planned"
                                    value={standupUpdate.planned}
                                    inputId="planned"
                                    handleChange={handleChange}
                                />
                                <FormInputComponent
                                    htmlFor="blockers"
                                    labelValue="Blockers"
                                    dataTestId="blocker-input-update"
                                    placeholder="e.g Waiting on identity team to deploy FF"
                                    name="blockers"
                                    value={standupUpdate.blockers}
                                    inputId="blockers"
                                    handleChange={handleChange}
                                />
                            </fieldset>
                            <button
                                className={`${styles.submitButton} ${buttonStyleClass}`}
                                disabled={!buttonDisable}
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
