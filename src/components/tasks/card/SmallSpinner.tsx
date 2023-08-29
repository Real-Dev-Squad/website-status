import classNames from '@/components/tasks/card/card.module.scss';

export const SmallSpinner = () => (
    <div
        className={`${classNames.smallSpinner} ${classNames.selfAlignEnd}`}
        data-testid="small-spinner"
    ></div>
);
