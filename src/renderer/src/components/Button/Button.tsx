import { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"

export type ButtonProps = ComponentProps<'button'> & {
    tipe?: string,
    icon?: Boolean,
    padding?: Boolean,
    background?: Boolean
}

export const Button = ({ className, children, tipe = "secondary", icon = false, padding = true, background = true, disabled, ...props}: ButtonProps) => {
    const buttonClass = [
        'rounded-md flex justify-center items-center text-sm',
        disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '',
        background ? 'h-8' : '',
        padding && icon ? 'px-3' : '',
        padding && !icon ? 'px-6' : '',
    ].filter(Boolean).join(' ');
    
    return (
        <button className={twMerge(buttonClass, `button-${tipe}`, className)} disabled={disabled} {...props}>
            {children}
        </button>
    )
}