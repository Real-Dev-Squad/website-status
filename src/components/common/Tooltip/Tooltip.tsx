import styles from './tooltip.module.scss';

type TooltipProps = {
    textToShow: string;
};

export default function Tooltip({ textToShow }: TooltipProps) {
    return (
        <span data-testid="tooltip" className={styles['tooltip']}>
            {textToShow}
        </span>
    );
}
