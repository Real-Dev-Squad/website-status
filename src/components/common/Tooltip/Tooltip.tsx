import styles from './tooltip.module.scss';

type TooltipProps = {
    isVisible: boolean;
    textToShow: string;
    tooltipPosition: {
        top?: string;
        right?: string;
        bottom?: string;
        left?: string;
    };
};

export default function Tooltip({
    isVisible,
    textToShow,
    tooltipPosition,
}: TooltipProps) {
    return (
        <span
            data-testid="tooltip"
            className={`${styles['tooltip']}
               ${isVisible ? styles['fade-in'] : styles['fade-out']}`}
            style={{ ...tooltipPosition }}
        >
            {textToShow}
        </span>
    );
}
