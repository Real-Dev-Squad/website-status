import React from 'react';

import getCurrentDate from '@/utils/getLatestDate';

import NavBar from '../navBar';
import ProgressHeader from './ProgressHeader';
import ProgressForm from './ProgressForm';
import styles from '@/components/ProgressForm/ProgressForm.module.scss';

function ProgressLayout() {
    return (
        <>
            <NavBar />
            <ProgressHeader />
            <section className={styles.container}>
                <h1 className={styles.formHeading}>Task Updates</h1>
                <h2 className={styles.date}>On {getCurrentDate()}</h2>
                <ProgressForm />
            </section>
        </>
    );
}

export default ProgressLayout;
