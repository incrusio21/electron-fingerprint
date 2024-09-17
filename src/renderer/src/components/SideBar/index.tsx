import { ComponentProps, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export const SideBar = ({ className, children,...props }: ComponentProps<'aside'>) => {
    return (
        <aside className={twMerge('w-[250px] mt-8 h-[100vh + 10px] overflow-auto', className)} { ...props }>
            {children}
        </aside>
    );
};

export const Content = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
    ({ children, className }, ref) => {
        return (
            <div ref={ref} className={twMerge('flex-1 mt-8 overflow-auto', className)}>
                {children}
            </div>
        )
})

Content.displayName = 'Content'