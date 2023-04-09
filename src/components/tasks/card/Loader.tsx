import classNames from '@/components/tasks/card/card.module.scss';

export const Loader = () => (
    <div className={classNames.loadingBg}>
        <div className={classNames.spinner}>
            <span className={classNames.screenReaderOnly}>loading</span>
        </div>
    </div>
);
