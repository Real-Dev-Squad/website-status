import { FC, useState, useEffect } from 'react';

import styles from '@/components/standup/standupContainer.module.scss';

import {
    useAddStandupMutation,
    useUserStandupDetailsQuery,
} from '@/app/services/standup';
import { useGetUserQuery } from '@/app/services/userApi';

import FormInputComponent from './FormInputComponent';
import { standupUpdateType } from '@/interfaces/standup.type';
import { getYesterdayDate } from '@/utils/getYesterdayDate';
import { getTotalMissedUpdate } from '@/utils/getTotalMissedUpdate';

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
    const standupDates = userStandupdata?.data?.map((element) => element.date);
    const totalMissedUpdate = getTotalMissedUpdate(standupDates || []);

    const yesterdayDate = getYesterdayDate();

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
        setStandupUpdate({
            type: 'user',
            completed: '',
            planned: '',
            blockers: '',
        });
        await addStandup(standupUpdate);
    };

    return (
        <>
            <section className="container">
                <div className={styles.standupContainer}>
                    <div className={styles.standupBanner}>
                        <p>
                            You have
                            <span data-testid="missed-updates">
                                {totalMissedUpdate} missed
                            </span>
                            Standup updates this week
                        </p>
                        <p>Let&apos;s try to avoid having zero days </p>
                    </div>
                    <div className={styles.standupUpdateContainer}>
                        <h1>Standup Update</h1>
                        <form
                            className={styles.standupForm}
                            onSubmit={handleFormSubmission}
                        >
                            <fieldset className={styles.formFields}>
                                <label
                                    className={styles.updateHeading}
                                    htmlFor="completed"
                                >
                                    On {yesterdayDate}
                                </label>
                                <FormInputComponent
                                    dataTestId="yesterday-input-update"
                                    placeholder="e.g Raised PR for adding new config"
                                    name="completed"
                                    value={standupUpdate.completed}
                                    handleChange={handleChange}
                                />
                                <label className={styles.updateHeading}>
                                    Today
                                </label>
                                <FormInputComponent
                                    dataTestId="today-input-update"
                                    placeholder="e.g Refactor signup to support Google login"
                                    name="planned"
                                    value={standupUpdate.planned}
                                    handleChange={handleChange}
                                />

                                <label className={styles.updateHeading}>
                                    Blockers
                                </label>
                                <FormInputComponent
                                    dataTestId="blocker-input-update"
                                    placeholder="e.g Waiting on identity team to deploy FF"
                                    name="blockers"
                                    value={standupUpdate.blockers}
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
