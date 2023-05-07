import React from 'react';
import NavBar from '../navBar';
import ProgressHeader from './ProgressHeader';
import ProgressForm from './ProgressForm';
import styles from '@/components/ProgressForm/ProgressForm.module.scss';
import getCurrentDate from '@/utils/getLatestDate';

function ProgressLayout() {
    return (
        <>
            <NavBar />
            <ProgressHeader />
            <div className={styles.container}>
                <h1 className={styles.formHeading}>Task Updates</h1>
                <h2 className={styles.date}>on {getCurrentDate()}</h2>
            </div>
            <ProgressForm />
        </>
    );
}

export default ProgressLayout;
