import {
    cloneElement,
    isValidElement,
    ReactElement,
    ReactNode,
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
 * TooltipAutoPlacement is a React component that displays a tooltip with automatic
 * placement and arrow positioning. It accepts content and children as props.
 * The tooltip tries to position itself at the top by default, but can automatically
 * flip to other positions like bottom, right, or left if necessary, ensuring it stays
 * within the viewport. The tooltip becomes visible when hovering over the trigger element.
 *
 * Props:
 * - content: The content to be displayed inside the tooltip.
 * - children: The element over which the tooltip should appear.
 *
 * The component utilizes the `useFloating` hook to manage tooltip positioning
 * and middleware like `offset`, `flip`, `shift`, and `arrow` for enhanced placement
 * logic. It uses CSS classes 'fade-in' and 'fade-out' for showing and hiding the tooltip.
 */
const TooltipAutoPlacement = ({ content, children }: TooltipProps) => {
    const arrowRef = useRef(null);
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
                fallbackPlacements: ['bottom', 'right', 'left'], // Prioritize top, then try these positions
            }),
            shift(),
            arrow({
                element: arrowRef,
            }),
        ],
        whileElementsMounted: autoUpdate,
    });

    const showTooltip = () => {
        if (!refs.floating.current) return;

        const tooltip = refs.floating.current;
        tooltip.classList.remove(styles['fade-out']);
        tooltip.classList.add(styles['fade-in']);
    };

    const hideTooltip = () => {
        if (refs.floating.current) {
            refs.floating.current.classList.remove(styles['fade-in']);
            refs.floating.current.classList.add(styles['fade-out']);
        }
    };

    const tooltipEventHandlers = {
        onMouseEnter: showTooltip,
        onMouseMove: showTooltip,
        onMouseLeave: hideTooltip,
    };

    // Render the trigger element with tooltip functionality
    const renderTriggerElement = () => {
        if (isValidElement(children)) {
            // If it's a React element, clone it and add the props
            return cloneElement(children as ReactElement<any>, {
                ref: refs.setReference,
                className: `${children.props.className || ''} ${
                    styles['tooltip-container']
                }`,
                ...tooltipEventHandlers,
            });
        }

        // If it's text or any other content, wrap it in a span
        return (
            <span
                ref={refs.setReference}
                className={styles['tooltip-container']}
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
