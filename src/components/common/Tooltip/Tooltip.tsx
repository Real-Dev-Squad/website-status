import styles from './tooltip.module.scss';

type TooltipProps = {
    isVisible: boolean;
    textToShow: string;
};

export default function Tooltip({ isVisible, textToShow }: TooltipProps) {
    return (
        <span
            data-testid="tooltip"
            className={`${styles['tooltip']}
               ${isVisible ? styles['fade-in'] : styles['fade-out']}`}
        >
            {textToShow}
        </span>
    );
}
