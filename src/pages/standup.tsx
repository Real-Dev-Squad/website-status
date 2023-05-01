import React, { FC } from 'react';
import Head from '@/components/head';
import Layout from '@/components/Layout';

import styles from '@/styles/standup.module.scss';

const StandUp: FC = () => {
    return (
        <>
            <Layout>
                <Head title="Standup" />
                <div className="container">
                    <div className={styles.standupContainer}>
                        <div className={styles.standupBanner}>
                            <p>
                                You have
                                <span data-testid="missed-updates">
                                    2 missed
                                </span>
                                Standup updates this week
                            </p>
                            <p>Let&apos;s try to avoid having zero days </p>
                            <div className={styles.buttonContainer}>
                                <button className={styles.continueButton}>
                                    continue
                                </button>
                                <button className={styles.updateButton}>
                                    Fill Old Updates
                                </button>
                            </div>
                        </div>
                        <div className={styles.standupUpdateContainer}>
                            <h1>Standup Update</h1>
                            <div className={styles.standupForm}>
                                <div className={styles.yesterdayUpdate}>
                                    <label className={styles.updateHeading}>
                                        On March 11, 2023
                                    </label>
                                    <input
                                        type="text"
                                        className={styles.inputFlield}
                                        placeholder="e.g Raised PR for adding new config"
                                        data-testid="yesterday-input-update"
                                    />
                                </div>
                                <div className={styles.todayUpdate}>
                                    <label className={styles.updateHeading}>
                                        Today
                                    </label>
                                    <input
                                        type="text"
                                        className={styles.inputFlield}
                                        placeholder="e.g Refactor signup to support Google login"
                                        data-testid="today-input-update"
                                    />
                                </div>
                                <div className={styles.blockerUpdate}>
                                    <label className={styles.updateHeading}>
                                        Blockers
                                    </label>
                                    <input
                                        type="text"
                                        className={styles.inputFlield}
                                        placeholder="e.g Waiting on identity team to deploy FF"
                                        data-testid="blocker-input-update"
                                    />
                                </div>
                                <button className={styles.submitButton}>
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default StandUp;
