import { ComponentProps } from "react"

export const PageHeader = ({ children, ...props }: ComponentProps<'div'>) => {
    return (
        <div {...props} className="px-4 flex justify-between items-center h-row-largest flex-shrink-0">
            {children}
        </div>
    )
}