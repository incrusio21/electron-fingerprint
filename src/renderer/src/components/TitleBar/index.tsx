import icon from '@/assets/icon.png';
import { ComponentProps } from "react";
import { twMerge } from 'tailwind-merge';

export const TitleBar = ({ className, ...props }: ComponentProps<'div'>) => {

    return (
        <div className={twMerge("bg-[#252526] text-[#d4d4d4]", className)} { ...props }>
            <div className="w-full h-full grid place-items-center drag-region grid-flow-col-dense">
                <div className="absolute drag-button top-[4px] left-2">
                    <img className="w-6 h-6" src={icon} alt="Logo" />
                </div>
                <div className="text-base text-center text-dark-base">
                    <span className="my-auto">{import.meta.env.VITE_APPNAME}</span>
                </div>
            </div>
        </div>
    );
};