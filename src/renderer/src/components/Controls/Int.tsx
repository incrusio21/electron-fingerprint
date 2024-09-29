import { safeParseInt } from '@utils/index';
import { forwardRef } from 'react';
import { Base, BaseProps, withBase } from './Base'; // Assuming Base is another component or logic

const IntInput = forwardRef<HTMLInputElement, BaseProps>(
    ({ ...props }, ref) => {

        const parseValue = (value: any) => {
            return safeParseInt(value); // Implement any parsing logic if necessary
        }

        return <Base {...props} parse={parseValue} inputType="number" ref={ref} />;
})

export const Int = withBase(IntInput);
