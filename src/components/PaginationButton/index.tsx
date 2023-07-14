import React from 'react';
import classNames from '@/components/PaginationButton/paginationbutton.module.scss';

type PaginationButtonProps = {
    fetchPrev: () => void;
    fetchNext: () => void;
    hasPrev: boolean;
    hasNext: boolean;
    prevLabel?: string;
    nextLabel?: string;
    containerClassName?: string;
    buttonClassName?: string;
};

const PaginationButton: React.FC<PaginationButtonProps> = ({
    fetchPrev,
    fetchNext,
    hasPrev,
    hasNext,
    prevLabel = 'Prev',
    nextLabel = 'Next',
    containerClassName = '',
    buttonClassName = '',
}) => {
    return (
        <div
            className={`${classNames.paginationButtonContainer} ${containerClassName}`}
        >
            <button
                className={`${classNames.paginationButton} ${buttonClassName}`}
                onClick={fetchPrev}
                disabled={!hasPrev}
            >
                {prevLabel}
            </button>
            <button
                className={`${classNames.paginationButton} ${buttonClassName}`}
                onClick={fetchNext}
                disabled={!hasNext}
            >
                {nextLabel}
            </button>
        </div>
    );
};

export default PaginationButton;
