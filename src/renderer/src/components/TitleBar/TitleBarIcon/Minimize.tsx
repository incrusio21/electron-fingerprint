import { darkModeAtom } from '@/utils';
import { useAtom } from 'jotai';
import { ComponentProps } from 'react';

import MinimizeIconD1x from '../icons/min-w-10.png';
import MinimizeIconD1_25x from '../icons/min-w-12.png';
import MinimizeIconD1_5x from '../icons/min-w-15.png';
import MinimizeIconD2x from '../icons/min-w-20.png';
import MinimizeIconD2_5x from '../icons/min-w-24.png';
import MinimizeIconD3x from '../icons/min-w-30.png';

import MinimizeIcon1x from '../icons/min-k-10.png';
import MinimizeIcon1_25x from '../icons/min-k-12.png';
import MinimizeIcon1_5x from '../icons/min-k-15.png';
import MinimizeIcon2x from '../icons/min-k-20.png';
import MinimizeIcon2_5x from '../icons/min-k-24.png';
import MinimizeIcon3x from '../icons/min-k-30.png';


export default ({ ...props }: ComponentProps<'button'>) => {
    const [isDarkMode] = useAtom(darkModeAtom);
    const handleMinimize = () => {
        window.context.minimizeWindow();
    };
    
    const MinimizeIconSrcSet = isDarkMode ? `
        ${MinimizeIconD1x} 1x,
        ${MinimizeIconD1_25x} 1.25x,
        ${MinimizeIconD1_5x} 1.5x,
        ${MinimizeIconD1_5x} 1.75x,
        ${MinimizeIconD2x} 2x,
        ${MinimizeIconD2x} 2.25x,
        ${MinimizeIconD2_5x} 2.5x,
        ${MinimizeIconD3x} 3x,
        ${MinimizeIconD3x} 3.5x
    ` : `
        ${MinimizeIcon1x} 1x,
        ${MinimizeIcon1_25x} 1.25x,
        ${MinimizeIcon1_5x} 1.5x,
        ${MinimizeIcon1_5x} 1.75x,
        ${MinimizeIcon2x} 2x,
        ${MinimizeIcon2x} 2.25x,
        ${MinimizeIcon2_5x} 2.5x,
        ${MinimizeIcon3x} 3x,
        ${MinimizeIcon3x} 3.5x
    `;

    return (
        <button onClick={handleMinimize} {...props}>
            <img className="icon m-auto"
            srcSet={MinimizeIconSrcSet}
            alt="Minimize"
            draggable="false"
            />
        </button>
    )
}