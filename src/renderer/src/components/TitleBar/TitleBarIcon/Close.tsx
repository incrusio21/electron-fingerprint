import { darkModeAtom } from '@/utils';
import { useAtom } from 'jotai';
import { ComponentProps } from 'react';

import CloseIconD1x from '../icons/close-w-10.png';
import CloseIconD1_25x from '../icons/close-w-12.png';
import CloseIconD1_5x from '../icons/close-w-15.png';
import CloseIconD2x from '../icons/close-w-20.png';
import CloseIconD2_5x from '../icons/close-w-24.png';
import CloseIconD3x from '../icons/close-w-30.png';

import CloseIcon1x from '../icons/close-k-10.png';
import CloseIcon1_25x from '../icons/close-k-12.png';
import CloseIcon1_5x from '../icons/close-k-15.png';
import CloseIcon2x from '../icons/close-k-20.png';
import CloseIcon2_5x from '../icons/close-k-24.png';
import CloseIcon3x from '../icons/close-k-30.png';


export default ({ ...props }: ComponentProps<'button'>) => {
    const [isDarkMode] = useAtom(darkModeAtom);

    const handleClose = () => {
        window.context.closeWindow();
    };
    
    const CloseIconSrcSet = isDarkMode ? `
        ${CloseIconD1x} 1x,
        ${CloseIconD1_25x} 1.25x,
        ${CloseIconD1_5x} 1.5x,
        ${CloseIconD1_5x} 1.75x,
        ${CloseIconD2x} 2x,
        ${CloseIconD2x} 2.25x,
        ${CloseIconD2_5x} 2.5x,
        ${CloseIconD3x} 3x,
        ${CloseIconD3x} 3.5x
    ` : `
        ${CloseIcon1x} 1x,
        ${CloseIcon1_25x} 1.25x,
        ${CloseIcon1_5x} 1.5x,
        ${CloseIcon1_5x} 1.75x,
        ${CloseIcon2x} 2x,
        ${CloseIcon2x} 2.25x,
        ${CloseIcon2_5x} 2.5x,
        ${CloseIcon3x} 3x,
        ${CloseIcon3x} 3.5x
    `;

    return (
        <button onClick={handleClose} {...props}>
            <img className="icon m-auto"
            srcSet={CloseIconSrcSet}
            alt="Close"
            draggable="false"
            />
        </button>
    )
}