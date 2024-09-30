import React from 'react';
import styles from './cardShimmer.module.scss';

const CardShimmer = () => (
    <div className={`${styles.card} ${styles.br}`} data-testid="shimmer-card">
        <div className={`${styles.title} ${styles.br} ${styles.animate}`} />
        <div className={`${styles.comment} ${styles.br} ${styles.animate}`} />
        <div className={`${styles.comment} ${styles.br} ${styles.animate}`} />
        <div className={`${styles.comment} ${styles.br} ${styles.animate}`} />
    </div>
);
export default CardShimmer;
