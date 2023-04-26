import { FC } from 'react';
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
                                You have <span>2 missed</span> Standup updates
                                this week
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
                                    <h1 className={styles.updateHeading}>
                                        On March 11, 2023
                                    </h1>
                                    <input
                                        type="text"
                                        className={styles.inputFlield}
                                        placeholder="e.g Raised PR for adding new config"
                                    />
                                </div>
                                <div className={styles.todayUpdate}>
                                    <h1 className={styles.updateHeading}>
                                        Today
                                    </h1>
                                    <input
                                        type="text"
                                        className={styles.inputFlield}
                                        placeholder="e.g Refactor signup to support Google login"
                                    />
                                </div>
                                <div className={styles.blockerUpdate}>
                                    <h1 className={styles.updateHeading}>
                                        Blockers
                                    </h1>
                                    <input
                                        type="text"
                                        className={styles.inputFlield}
                                        placeholder="e.g Waiting on identity team to deploy FF"
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
