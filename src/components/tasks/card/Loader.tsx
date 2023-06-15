import classNames from '@/components/tasks/card/card.module.scss';
import { FC } from 'react';
import { LoaderProps } from '@/interfaces/suggestionBox.type';

export const Loader: FC<LoaderProps> = ({ showText }) => {
    if (showText)
        return (
            <div className={classNames.loading} data-testid="loading">
                Loading...
            </div>
        );

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
