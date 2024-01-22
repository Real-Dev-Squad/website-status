import Image from 'next/image';
import styles from '@/components/tasks/card/card.module.scss';

export const SavedCheckmark = () => (
    <div className={styles.selfAlignEnd} data-testid="checkmark">
        <Image
            src="/check.png"
            alt="Data Successfully Saved"
            width={20}
            height={20}
        />
    </div>
);
