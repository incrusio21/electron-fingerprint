import { ComponentProps, useRef } from 'react';
import { usePopper } from 'react-popper';
import { CSSTransition } from 'react-transition-group';

type PopoverProps = {
    target: React.ReactNode,
    isOpen: boolean
} & ComponentProps<'div'>

export const Popover = ({ children, target, isOpen, ...props }: PopoverProps) => {
    
    const referenceRef = useRef<HTMLDivElement | null>(null);
    const popoverRef = useRef<HTMLDivElement | null>(null);
    const placement = 'bottom-start';
    
    // Use the usePopper hook to calculate the positioning
    const { styles, attributes } = usePopper(referenceRef.current, popoverRef.current, {
        placement,
        modifiers: [
            {
                name: 'offset',
                options: {
                    offset: [0, 8],
                },
            },
        ],
    });
    
    return (
        <div {...props} ref={referenceRef}>
            <div className="h-full">
                {target}
            </div>
            {/* Popover content */}
            <CSSTransition
                in={isOpen}
                timeout={150}
                classNames={{
                  enterActive: 'v-enter-active',
                  enterDone: 'v-enter-done',
                  exitActive: 'v-leave-active',
                  exitDone: 'v-leave-done',
                }}
                nodeRef={popoverRef}
                unmountOnExit
            >
                <div
                    ref={popoverRef}
                    style={styles.popper}
                    {...attributes.popper}
                    className="bg-white rounded-md border shadow-lg popover-container relative z-10">
                    {children}
                </div>
            </CSSTransition>
        </div>
    )
}