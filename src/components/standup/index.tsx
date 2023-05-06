import React, { FC } from 'react';

import styles from '@/components/standup/standupContainer.module.scss';
import { Standup } from '@/interfaces/standup.type';

const StandUpContainer: FC<Standup> = ({
    handleFormSubmission,
    handleChange,
    yesterdayDate,
    buttonDisable,
    completed,
    planned,
    blockers,
}: Standup) => {
    return (
        <>
            <section className="container">
                <section className={styles.standupContainer}>
                    <section className={styles.standupBanner}>
                        <p>
                            You have
                            <span data-testid="missed-updates">2 missed</span>
                            Standup updates this week
                        </p>
                        <p>Let&apos;s try to avoid having zero days </p>
                    </section>
                    <section className={styles.standupUpdateContainer}>
                        <h1>Standup Update</h1>
                        <form
                            className={styles.standupForm}
                            onSubmit={(e: React.ChangeEvent<HTMLFormElement>) =>
                                handleFormSubmission(e)
                            }
                        >
                            <section className={styles.yesterdayUpdate}>
                                <label
                                    className={styles.updateHeading}
                                    htmlFor="completed"
                                >
                                    On {yesterdayDate}
                                </label>
                                <input
                                    id="completed"
                                    type="text"
                                    className={styles.inputFlield}
                                    placeholder="e.g Raised PR for adding new config"
                                    data-testid="yesterday-input-update"
                                    required
                                    name="completed"
                                    value={completed}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => handleChange(e)}
                                />
                            </section>
                            <section className={styles.todayUpdate}>
                                <label className={styles.updateHeading}>
                                    Today
                                </label>
                                <input
                                    type="text"
                                    className={styles.inputFlield}
                                    placeholder="e.g Refactor signup to support Google login"
                                    data-testid="today-input-update"
                                    required
                                    name="planned"
                                    value={planned}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => handleChange(e)}
                                />
                            </section>
                            <section className={styles.blockerUpdate}>
                                <label className={styles.updateHeading}>
                                    Blockers
                                </label>
                                <input
                                    type="text"
                                    className={styles.inputFlield}
                                    placeholder="e.g Waiting on identity team to deploy FF"
                                    data-testid="blocker-input-update"
                                    required
                                    name="blockers"
                                    value={blockers}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => handleChange(e)}
                                />
                            </section>
                            <button
                                className={`${styles.submitButton} ${
                                    buttonDisable
                                        ? styles.nonActiveButton
                                        : styles.activeButton
                                }`}
                                disabled={!buttonDisable}
                            >
                                Submit
                            </button>
                        </form>
                    </section>
                </section>
            </section>
        </>
    );
};

export default StandUpContainer;
