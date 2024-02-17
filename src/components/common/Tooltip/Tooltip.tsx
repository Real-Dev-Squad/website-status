import { useState } from 'react';
import styles from './tooltip.module.scss';

type TooltipProps = {
    children: React.ReactNode;
    content: React.ReactNode;
    tooltipPosition?: React.CSSProperties;
};

const Tooltip = ({ children, content, tooltipPosition }: TooltipProps) => {
    const [isMouseHovering, setIsMouseHovering] = useState(false);
    const toggle = () => {
        setIsMouseHovering((prev) => !prev);
    };

    return (
        <span onMouseOver={toggle} onMouseOut={toggle}>
            {children}
            <span
                data-testid="tooltip"
                className={`${styles['tooltip']}
        ${isMouseHovering ? styles['fade-in'] : styles['fade-out']}`}
                style={{ ...tooltipPosition }}
            >
                {content}
            </span>
        </span>
    );
};

export default Tooltip;
