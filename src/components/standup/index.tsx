import { FC, useState, useEffect } from 'react';

import FormInputComponent from './FormInputComponent';
import { standupUpdateType } from '@/interfaces/standup.type';
import { getYesterdayDate } from '@/utils/getYesterdayDate';

import styles from '@/components/standup/standupContainer.module.scss';

const StandUpContainer: FC = () => {
    const [standupUpdate, setStandupUpdate] = useState<standupUpdateType>({
        type: 'user',
        completed: '',
        planned: '',
        blockers: '',
    });

    const [buttonDisable, setButtonDisable] = useState<boolean>(true);

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
    const isVaidate = () => {
        return (
            standupUpdate.completed !== '' &&
            standupUpdate.planned !== '' &&
            standupUpdate.blockers !== ''
        );
    };
    useEffect(() => {
        const isValid = isVaidate();
        setButtonDisable(!isValid);
    }, [
        standupUpdate.completed,
        standupUpdate.planned,
        standupUpdate.blockers,
    ]);

    const handleFormSubmission = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setStandupUpdate({
            type: 'user',
            completed: '',
            planned: '',
            blockers: '',
        });
        console.log(standupUpdate);
    };

    return (
        <>
            <section className="container">
                <section className={styles.standupContainer}>
                    <div className={styles.standupBanner}>
                        <p>
                            You have
                            <span data-testid="missed-updates">2 missed</span>
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
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </section>
            </section>
        </>
    );
};

export default StandUpContainer;
