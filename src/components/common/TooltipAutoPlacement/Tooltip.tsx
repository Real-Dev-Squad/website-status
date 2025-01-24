import {
    cloneElement,
    isValidElement,
    ReactElement,
    ReactNode,
    useId,
    useRef,
} from 'react';
import styles from './tooltip.module.scss';
import {
    arrow,
    autoUpdate,
    flip,
    offset,
    shift,
    useFloating,
} from '@floating-ui/react-dom';

type TooltipProps = {
    children: ReactNode;
    content: ReactNode;
};

/**
 * TooltipAutoPlacement displays a tooltip with automatic positioning and arrow.
 * Default position is top but can flip to bottom, right, or left based on viewport.
 * Shows on hover with fade-in/out animations.
 *
 * @param content Content to display in tooltip
 * @param children Element that triggers the tooltip
 */
const TooltipAutoPlacement = ({ content, children }: TooltipProps) => {
    const arrowRef = useRef(null);
    const tooltipId = useId();
    const {
        refs,
        floatingStyles,
        placement: position,
        middlewareData: { arrow: { x: arrowX, y: arrowY } = {} },
    } = useFloating({
        placement: 'top',
        transform: false,
        middleware: [
            offset(12),
            flip({
                fallbackPlacements: ['bottom', 'right', 'left'],
            }),
            shift(),
            arrow({
                element: arrowRef,
            }),
        ],
        whileElementsMounted: autoUpdate,
    });

    const tooltip = refs.floating.current;

    const showTooltip = () => {
        if (!tooltip) return;

        tooltip.classList.remove(styles['fade-out']);
        tooltip.classList.add(styles['fade-in']);
    };

    const hideTooltip = () => {
        if (tooltip) {
            tooltip.classList.remove(styles['fade-in']);
            tooltip.classList.add(styles['fade-out']);
        }
    };

    const tooltipEventHandlers = {
        onMouseEnter: showTooltip,
        onMouseMove: showTooltip,
        onMouseLeave: hideTooltip,
    };

    const renderTriggerElement = () => {
        if (isValidElement(children)) {
            // If it's a React element, clone it and add the props
            return cloneElement(children as ReactElement<any>, {
                ref: refs.setReference,
                className: `${children.props.className || ''} ${
                    styles['tooltip-container']
                }`,
                'aria-describedby': tooltipId,
                ...tooltipEventHandlers,
            });
        }

        // If it's text or any other content, wrap it in a span
        return (
            <span
                ref={refs.setReference}
                className={styles['tooltip-container']}
                aria-describedby={tooltipId}
                {...tooltipEventHandlers}
            >
                {children}
            </span>
        );
    };

    const staticSide = {
        top: 'bottom',
        right: 'left',
        bottom: 'top',
        left: 'right',
    }[position.split('-')[0] as 'top' | 'right' | 'bottom' | 'left'];

    return (
        <>
            {renderTriggerElement()}
            <div
                ref={refs.setFloating}
                style={floatingStyles}
                className={styles.tooltip}
                data-testid="tooltip"
                role="tooltip"
                id={tooltipId}
            >
                {content}
                <div
                    ref={arrowRef}
                    className={styles.arrow}
                    style={{
                        left: arrowX != null ? `${arrowX}px` : '',
                        top: arrowY != null ? `${arrowY}px` : '',
                        [staticSide]: '-7px',
                    }}
                />
            </div>
        </>
    );
};

export default TooltipAutoPlacement;
