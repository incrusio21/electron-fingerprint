import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'
import { PageHeader } from './PageHeader'

export const FormContainer = ({ children, className, ...props }: ComponentProps<'div'>) => {
    return (
        <div {...props} className={twMerge("flex bg-gray-25 overflow-x-auto", className)}>
            <div className="flex flex-1 flex-col">
                <PageHeader>
                    
                </PageHeader>
                {/* Common Form */}
                <div className='flex flex-col self-center h-full overflow-auto bg-white dark:bg-[#252526] dark:border-[#333333] w-form border rounded-lg shadow-lg mb-4 mx-4'>
                    {children}
                </div>
            </div>
        </div>
    )
}