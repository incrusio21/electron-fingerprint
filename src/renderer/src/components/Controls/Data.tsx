import { forwardRef } from 'react';
import { Base, BaseProps, withBase } from './Base'; // Assuming Base is another component or logic

const DataInput = forwardRef<HTMLInputElement, BaseProps>(
    ({ inputType = "text", ...props }, ref) => {
        return <Base inputType={inputType} {...props} ref={ref} />;
})

export const Data = withBase(DataInput);
