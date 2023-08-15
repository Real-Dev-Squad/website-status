import Image from 'next/image';
import classNames from '@/components/tasks/card/card.module.scss';
export const SavedCheckmark = () => (
    <div
        className={`${classNames.checkmark} ${classNames.selfAlignEnd}`}
        data-testid="checkmark"
    >
        <Image
            src="/check.png"
            alt="check icon to show text is saved"
            width={20}
            height={20}
            tabIndex={0}
        />
    </div>
);
