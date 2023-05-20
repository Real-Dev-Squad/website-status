import { FC } from 'react';

import styles from '@/components/standup/standupContainer.module.scss';
import { Standup } from '@/interfaces/standup.type';
import FormInputComponent from './FormInputComponent';

const StandUpContainer: FC<Standup> = ({
    handleFormSubmission,
    handleChange,
    yesterdayDate,
    buttonDisable,
    completed,
    planned,
    blockers,
}: Standup) => {
    const buttonStyleClass = buttonDisable
        ? `${styles.nonActiveButton}`
        : `${styles.activeButton}`;

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
                            onSubmit={(e: React.ChangeEvent<HTMLFormElement>) =>
                                handleFormSubmission(e)
                            }
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
                                    value={completed}
                                    handleChange={handleChange}
                                />
                                <label className={styles.updateHeading}>
                                    Today
                                </label>
                                <FormInputComponent
                                    dataTestId="today-input-update"
                                    placeholder="e.g Refactor signup to support Google login"
                                    name="planned"
                                    value={planned}
                                    handleChange={handleChange}
                                />

                                <label className={styles.updateHeading}>
                                    Blockers
                                </label>
                                <FormInputComponent
                                    dataTestId="blocker-input-update"
                                    placeholder="e.g Waiting on identity team to deploy FF"
                                    name="blockers"
                                    value={blockers}
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
