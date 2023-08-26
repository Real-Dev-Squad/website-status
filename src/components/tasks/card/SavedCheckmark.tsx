import Image from 'next/image';
import classNames from '@/components/tasks/card/card.module.scss';

export const SavedCheckmark = () => (
    <div className={classNames.selfAlignEnd} data-testid="checkmark">
        <Image
            src="/check.png"
            alt="Data Successfully Saved"
            width={20}
            height={20}
        />
    </div>
);
