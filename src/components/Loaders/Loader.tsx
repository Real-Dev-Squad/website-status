import classNames from '@/components/Loaders/Loader.module.scss';

export const Loader = () => (
    <div className={classNames.loadingBg}>
        <div className={classNames.spinner}>
            <span className={classNames.screenReaderOnly} data-testid="loader">
                loading
            </span>
        </div>
    </div>
);
