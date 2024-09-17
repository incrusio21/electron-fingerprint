import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export const FormHeader = ({ formTitle, className, ...props }: { formTitle?: string } & ComponentProps<'div'>) => {
    return (
        <div {...props} className={twMerge(`px-4 
            text-xl
            font-semibold
            flex
            justify-between
            h-row-large
            items-center
            flex-shrink-0`, 
            className)
        }>
            {formTitle && <h1>{formTitle}</h1>}
        </div>
    )
}