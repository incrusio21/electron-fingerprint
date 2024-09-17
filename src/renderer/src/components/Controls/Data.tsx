import { forwardRef } from 'react';
import { Base, BaseProps } from './Base'; // Assuming Base is another component or logic

export const Data = forwardRef<HTMLInputElement, BaseProps>(
    ({ inputType = "text", ...props }, ref) => {
        return <Base inputType={inputType} {...props} ref={ref} />;
})