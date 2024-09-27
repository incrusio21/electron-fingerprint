import { forwardRef } from 'react';
import { Base, BaseProps, withBase } from './Base'; // Assuming Base is another component or logic

const FloatInput = forwardRef<HTMLInputElement, BaseProps>(
    ({ inputType = "text", ...props }, ref) => {
        return <Base inputType={"number"} {...props} ref={ref} />;
})

export const Float = withBase(FloatInput);
