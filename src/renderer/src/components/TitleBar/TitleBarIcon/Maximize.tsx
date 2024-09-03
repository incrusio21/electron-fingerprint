import { darkModeAtom } from '@/utils';
import { useAtom } from 'jotai';
import { ComponentProps, useEffect, useState } from 'react';

import MaximizeIconD1x from '../icons/max-w-10.png';
import MaximizeIconD1_25x from '../icons/max-w-12.png';
import MaximizeIconD1_5x from '../icons/max-w-15.png';
import MaximizeIconD2x from '../icons/max-w-20.png';
import MaximizeIconD2_5x from '../icons/max-w-24.png';
import MaximizeIconD3x from '../icons/max-w-30.png';

import MaximizeIcon1x from '../icons/max-k-10.png';
import MaximizeIcon1_25x from '../icons/max-k-12.png';
import MaximizeIcon1_5x from '../icons/max-k-15.png';
import MaximizeIcon2x from '../icons/max-k-20.png';
import MaximizeIcon2_5x from '../icons/max-k-24.png';
import MaximizeIcon3x from '../icons/max-k-30.png';

import RestoreIconD1x from '../icons/restore-w-10.png';
import RestoreIconD1_25x from '../icons/restore-w-12.png';
import RestoreIconD1_5x from '../icons/restore-w-15.png';
import RestoreIconD2x from '../icons/restore-w-20.png';
import RestoreIconD2_5x from '../icons/restore-w-24.png';
import RestoreIconD3x from '../icons/restore-w-30.png';

import RestoreIcon1x from '../icons/restore-k-10.png';
import RestoreIcon1_25x from '../icons/restore-k-12.png';
import RestoreIcon1_5x from '../icons/restore-k-15.png';
import RestoreIcon2x from '../icons/restore-k-20.png';
import RestoreIcon2_5x from '../icons/restore-k-24.png';
import RestoreIcon3x from '../icons/restore-k-30.png';

export default ({ ...props }: ComponentProps<'button'>) => {
    const [isMaximized, setIsMaximized] = useState(false);
    const [isDarkMode] = useAtom(darkModeAtom);

    useEffect(() => {
        // Listen for maximize/unmaximize events
        window.context.onWindowMaximized((_event, maximized: boolean) => {
            setIsMaximized(maximized);
        });

    }, []);

    const handleMaximize = () => {
        window.context.maximizeWindow();
    };
    
    const MaximizeIconSrcSet = isDarkMode ? `
        ${MaximizeIconD1x} 1x,
        ${MaximizeIconD1_25x} 1.25x,
        ${MaximizeIconD1_5x} 1.5x,
        ${MaximizeIconD1_5x} 1.75x,
        ${MaximizeIconD2x} 2x,
        ${MaximizeIconD2x} 2.25x,
        ${MaximizeIconD2_5x} 2.5x,
        ${MaximizeIconD3x} 3x,
        ${MaximizeIconD3x} 3.5x
    ` : `
        ${MaximizeIcon1x} 1x,
        ${MaximizeIcon1_25x} 1.25x,
        ${MaximizeIcon1_5x} 1.5x,
        ${MaximizeIcon1_5x} 1.75x,
        ${MaximizeIcon2x} 2x,
        ${MaximizeIcon2x} 2.25x,
        ${MaximizeIcon2_5x} 2.5x,
        ${MaximizeIcon3x} 3x,
        ${MaximizeIcon3x} 3.5x
    `;

    const RestoreIconSrcSet = isDarkMode ? `
        ${RestoreIconD1x} 1x,
        ${RestoreIconD1_25x} 1.25x,
        ${RestoreIconD1_5x} 1.5x,
        ${RestoreIconD1_5x} 1.75x,
        ${RestoreIconD2x} 2x,
        ${RestoreIconD2x} 2.25x,
        ${RestoreIconD2_5x} 2.5x,
        ${RestoreIconD3x} 3x,
        ${RestoreIconD3x} 3.5x
    ` : `
        ${RestoreIcon1x} 1x,
        ${RestoreIcon1_25x} 1.25x,
        ${RestoreIcon1_5x} 1.5x,
        ${RestoreIcon1_5x} 1.75x,
        ${RestoreIcon2x} 2x,
        ${RestoreIcon2x} 2.25x,
        ${RestoreIcon2_5x} 2.5x,
        ${RestoreIcon3x} 3x,
        ${RestoreIcon3x} 3.5x
    `;

    return (
        <button onClick={handleMaximize} {...props}>
            <img className="icon m-auto"
                srcSet={isMaximized ? RestoreIconSrcSet : MaximizeIconSrcSet}
                alt={isMaximized ? "Restore" : "Maximaze"}
                draggable="false" />
        </button>
    )
}