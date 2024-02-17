import { useState } from 'react';
import styles from './tooltip.module.scss';

type TooltipProps = {
    children: React.ReactNode;
    content: React.ReactNode;
    tooltipPosition?: React.CSSProperties;
};

const Tooltip = ({ children, content, tooltipPosition }: TooltipProps) => {
    const [currClass, setCurrClass] = useState('fade-out');
    const toggleClass = () => {
        if (currClass === 'fade-out') {
            setCurrClass('fade-in');
        } else {
            setCurrClass('fade-out');
        }
    };

    return (
        <span onMouseOver={toggleClass} onMouseOut={toggleClass}>
            {children}
            <span
                data-testid="tooltip"
                className={`${styles['tooltip']} ${styles[currClass]} `}
                style={{ ...tooltipPosition }}
            >
                {content}
            </span>
        </span>
    );
};

export default Tooltip;
