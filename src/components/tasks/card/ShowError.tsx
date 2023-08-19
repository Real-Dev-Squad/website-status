import Image from 'next/image';
import classNames from '@/components/tasks/card/card.module.scss';
export const ShowError = () => (
    <div className={classNames.selfAlignEnd} data-testid="checkmark">
        <Image src="/error.png" alt="data saved" width={20} height={20} />
    </div>
);
