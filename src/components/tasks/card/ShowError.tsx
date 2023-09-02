import Image from 'next/image';
import classNames from '@/components/tasks/card/card.module.scss';

export const ShowError = () => (
    <div className={classNames.selfAlignEnd} data-testid="error">
        <Image
            src="/error.png"
            alt="Failed to Save Data"
            width={20}
            height={20}
        />
    </div>
);
