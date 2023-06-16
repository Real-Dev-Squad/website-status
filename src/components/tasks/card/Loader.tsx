import classNames from '@/components/tasks/card/card.module.scss';

export const Loader = () => {
    return (
        <div className={classNames.loadingBg}>
            <div className={classNames.spinner}>
                <span
                    className={classNames.screenReaderOnly}
                    data-testid="loader"
                >
                    loading
                </span>
            </div>
        </div>
    );
};
